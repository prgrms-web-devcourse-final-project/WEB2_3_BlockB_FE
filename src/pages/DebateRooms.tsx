import { useEffect, useState } from "react";
import DebateRoomList from "../components/debate-room/DebateRoomList";
import FilterSection from "../components/debate-room/FilterSection";
import searchIcon from "../assets/icons/search.svg";
import SortSection from "../components/debate-room/SortSection";
import { debatesAPI } from "../api/debates";
import { Client, Frame, IMessage } from "@stomp/stompjs";
import Pagination from "../components/common/Pagenation";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router";
import speechBubble from "../assets/icons/speechBubble.svg";

type ActiveFilter = "참여가능" | "종료";

function ActiveFilterSection({
  selectedActive,
  setSelectedActive,
}: {
  selectedActive: ActiveFilter;
  setSelectedActive: (val: ActiveFilter) => void;
}) {
  const activeFilters: ActiveFilter[] = ["참여가능", "종료"];
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {activeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedActive(filter)}
            className={
              selectedActive === filter
                ? "bg-blue03 text-white px-3 py-1 rounded-full"
                : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            }
          >
            {filter}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate(`/debate-zone/new-debate`)}
        className="flex items-center justify-center px-2 py-2 text-white rounded-md md:w-auto bg-blue-950"
      >
        토론방 개설
        <span className="ml-2">
          <img src={speechBubble} alt="말풍선" className="w-5 h-5 mx-1" />
        </span>
      </button>
    </div>
  );
}

const mapContinentToCode = (continent: string): string => {
  const continentMap: Record<string, string> = {
    "아프리카/중동": "AF",
    "미국/중남미": "AM",
    "아시아/호주": "AS",
    유럽: "EU",
    중국: "CN",
    일본: "JP",
    한국: "KR",
  };
  return continentMap[continent] || "";
};

const mapCategoryToCode = (category: string): string => {
  const categoryMap: Record<string, string> = {
    정치: "PO",
    경제: "EC",
    사회: "SO",
    문화: "CU",
    연예: "EN",
    스포츠: "SP",
    IT: "IT",
    칼럼: "CO",
    기타: "ETC",
  };
  return categoryMap[category] || "";
};

const mapParticipantToCode = (participant: string): string => {
  const participantMap: Record<string, string> = {
    "1:1": "T1",
    "3:3": "T2",
  };
  return participantMap[participant] || "";
};

const continents = [
  "아프리카/중동",
  "미국/중남미",
  "아시아/호주",
  "유럽",
  "한국",
  "중국",
  "일본",
];
const categories = [
  "정치",
  "경제",
  "사회",
  "문화",
  "연예",
  "스포츠",
  "IT",
  "칼럼",
  "기타",
];
const participantTypes = ["1:1", "3:3"];
const sortOptions = ["최신순", "임박순", "인기순"];

export default function DebateRooms() {
  const [selectedActive, setSelectedActive] =
    useState<ActiveFilter>("참여가능");

  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("최신순");

  const [debateRooms, setDebateRooms] = useState<DebateRoomInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const availableSortOptions =
    selectedActive === "종료" ? ["최신순", "인기순"] : sortOptions;

  const apiSortValue = selectedSort === "인기순" ? "popular" : "recent";

  // 필터 리셋
  const resetFilters = () => {
    setSelectedContinent("");
    setSelectedCategory("");
    setSelectedParticipant("");
  };
  useEffect(() => {
    resetFilters();
  }, [selectedActive]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const continentCode = mapContinentToCode(selectedContinent);
      const categoryCode = mapCategoryToCode(selectedCategory);
      const participantCode = mapParticipantToCode(selectedParticipant);

      if (selectedActive === "종료") {
        try {
          const response = await debatesAPI.getFinishedDebates(
            debouncedSearchTerm,
            continentCode,
            categoryCode,
            participantCode,
            currentPage,
            apiSortValue
          );

          setDebateRooms(response.content);
          setTotalPages(response.totalPages);
        } catch (error) {
          console.error("종료된 토론방 데이터 가져오기 실패:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("STOMP 웹소켓 활성화 시도...");
        const WS_URL = import.meta.env.VITE_WS_URL;
        const client = new Client({
          brokerURL: `${WS_URL}/room-list/filtered?continent=${encodeURIComponent(
            continentCode
          )}&category=${encodeURIComponent(
            categoryCode
          )}&member=${encodeURIComponent(participantCode)}`,
          connectHeaders: {},
          debug: (msg) => console.log("[STOMP DEBUG]:", msg),
          reconnectDelay: 5000,
        });

        client.onConnect = (frame: Frame) => {
          console.log("STOMP 웹소켓 연결 성공:", frame);

          client.subscribe("/topic/filteredStatus", (message: IMessage) => {
            try {
              const parsedData = JSON.parse(message.body);
              console.log("웹소켓 메시지 수신:", parsedData);

              let debateRoomsData = [];

              if (selectedSort === "최신순") {
                debateRoomsData = parsedData.roomSortedByCreatedAt || [];
              } else if (selectedSort === "임박순") {
                debateRoomsData = parsedData.roomSortedByUserCount || [];
              } else if (selectedSort === "인기순") {
                debateRoomsData = parsedData.observerCurrent || [];
              }

              if (!debateRoomsData.length) {
                console.warn("웹소켓 메시지에 유효한 토론방 데이터가 없음");
                setDebateRooms([]);
                return;
              }

              // 📌 웹소켓 데이터 로그 출력
              console.log("웹소켓에서 받은 debateRoomsData:", debateRoomsData);

              const transformedData: DebateRoomInfo[] = debateRoomsData
                .map((room: any) => {
                  if (!room.debateRoomResponse) {
                    console.warn("유효한 debateRoomResponse 없음", room);
                    return null;
                  }

                  const meta = room.debateRoomResponse;

                  // 📌 timeType과 speakCountType 값 확인
                  console.log(
                    `웹소켓 데이터 확인 - timeType: ${meta.timeType}, speakCountType: ${meta.speakCountType}`
                  );

                  // 🔹 발언 시간 변환 로직
                  const totalTime =
                    (meta.timeType ?? 0) * (meta.speakCountType ?? 0);
                  const minutes = Math.floor(totalTime / 60);
                  const seconds = totalTime % 60;
                  const formattedTime = `${minutes > 0 ? `${minutes}분` : ""} ${
                    seconds > 0 ? `${seconds}초` : ""
                  }`.trim();

                  return {
                    roomId: meta.uuid || "알 수 없음",
                    title: meta.title || "제목 없음",
                    description: meta.description || "설명 없음",
                    categoryType: meta.categoryType || "ETC",
                    continentType: meta.continentType || "",
                    member: meta.memberNumberType ?? 1,
                    time: formattedTime, // 변환된 시간 적용
                    speakingCount: meta.speakCountType ?? 0,
                    proUsersCount: meta.proUsers?.length ?? 0,
                    conUsersCount: meta.conUsers?.length ?? 0,
                  };
                })
                .filter(Boolean);

              console.log("최종 변환된 debateRooms 데이터:", transformedData);

              setDebateRooms(transformedData);
              setIsLoading(false);
            } catch (error) {
              console.error("웹소켓 데이터 변환 오류:", error);
            }
          });

          setTimeout(() => {
            if (client.connected) {
              client.publish({
                destination: "/app/filteredUpdate",
                body: JSON.stringify({ message: "테스트 메시지 전송" }),
              });
              console.log("메시지 전송 완료");
            } else {
              console.warn("STOMP 웹소켓이 아직 연결되지 않음");
            }
          }, 500);
        };

        client.activate();

        return () => {
          console.log("STOMP 웹소켓 연결 종료");
          client.deactivate();
        };
      }
    };

    fetchData();
  }, [
    selectedActive,
    selectedContinent,
    selectedCategory,
    selectedParticipant,
    selectedSort,
    currentPage,
    debouncedSearchTerm,
  ]);

  return (
    <div className="w-full max-w-7xl font-pretendard text-[16px] mx-auto p-6">
      <ActiveFilterSection
        selectedActive={selectedActive}
        setSelectedActive={setSelectedActive}
      />
      <FilterSection
        filters={[
          {
            label: "대륙",
            data: continents,
            state: selectedContinent,
            onChange: setSelectedContinent,
          },
          {
            label: "카테고리",
            data: categories,
            state: selectedCategory,
            onChange: setSelectedCategory,
          },
          {
            label: "참가 인원",
            data: participantTypes,
            state: selectedParticipant,
            onChange: setSelectedParticipant,
          },
        ]}
        onResetFilters={resetFilters}
      />
      <SortSection
        sortOptions={availableSortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      {/* 검색창 */}
      {selectedActive === "종료" && (
        <div className="relative mt-3 w-full mb-6 flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full pl-3 pr-10 focus:outline-none"
            placeholder="찾으시는 토론방 키워드를 검색하세요"
          />
          <img
            src={searchIcon}
            alt="검색 아이콘"
            className="absolute right-3 top-3 w-5 h-5 text-gray-500"
          />
        </div>
      )}
      <DebateRoomList
        debateRooms={debateRooms}
        isLoading={isLoading}
        isFinished={selectedActive === "종료"}
      />
      {selectedActive === "종료" && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
