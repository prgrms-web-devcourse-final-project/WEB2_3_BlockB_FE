import { useEffect, useState } from "react";
import DebateRoomList from "../components/debate-room/DebateRoomList";
import searchIcon from "../assets/icons/search.svg";
import FilterSection from "../components/debate-room/FilterSection";
import { Client, Frame, IMessage } from "@stomp/stompjs";
import SortSection from "../components/debate-room/SortSection";
import { DebateRoomInfo } from "../components/debate-room/DebateRoomList";

const mapContinentToCode = (continent: string) => {
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

const mapCategoryToCode = (category: string) => {
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

const mapParticipantToCode = (participant: string) => {
  const participantMap: Record<string, string> = {
    "1:1": "T1",
    "3:3": "T2",
  };
  return participantMap[participant] || "";
};

const activeFilters = ["참여가능", "종료"];
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
const sortOptions = ["임박순", "최신순", "인기순"];

export default function DebateRooms() {
  const [selectedActive, setSelectedActive] = useState<string>(
    activeFilters[0]
  );
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>(sortOptions[0]);
  const [debateRooms, setDebateRooms] = useState<DebateRoomInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 필터 초기화 함수
  const resetFilters = () => {
    setSelectedActive(activeFilters[0]);
    setSelectedContinent("");
    setSelectedCategory("");
    setSelectedParticipant("");
  };

  useEffect(() => {
    console.log("STOMP 웹소켓 활성화 시도...");
    const continentCode = mapContinentToCode(selectedContinent);
    const categoryCode = mapCategoryToCode(selectedCategory);
    const participantCode = mapParticipantToCode(selectedParticipant);
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
          console.log("메시지 수신:", parsedData);
          const transformedData: DebateRoomInfo[] =
            parsedData.roomSortedByCreatedAt.map((room: any) => {
              const meta = room.debateMetaDataRoomResponse;

              return {
                roomId: meta.uuid,
                title: meta.title,
                description: meta.description,
                categoryType: meta.category,
                continentType: meta.continent,
                member: meta.memberNumber === "T1" ? 1 : 3,
                time: meta.time,
                speakingCount: meta.speakCount,
                proUsersCount: room.proUsers.length,
                conUsersCount: room.conUsers.length,
              };
            });

          setDebateRooms(transformedData);
          setIsLoading(false);
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
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
          console.warn(" STOMP 웹소켓이 아직 연결되지 않음");
        }
      }, 500);
    };

    client.activate();

    return () => {
      console.log("STOMP 웹소켓 연결 종료");
      client.deactivate();
    };
  }, [selectedContinent, selectedCategory, selectedParticipant]);

  return (
    <div className="w-full max-w-7xl font-pretendard text-[16px] mx-auto p-6">
      {/* 필터 */}
      <FilterSection
        filters={[
          {
            label: "활성 여부",
            data: activeFilters,
            state: selectedActive,
            onChange: setSelectedActive,
          },
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

      {/* 정렬 */}
      <SortSection
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      {/* 검색창 */}
      <div className="relative mt-3 w-full mb-6 flex items-center">
        <input
          type="text"
          className="border rounded-xl px-4 py-2 w-full pl-3 pr-10 focus:outline-none"
          placeholder="찾으시는 토론방 키워드를 검색하세요"
        />
        <img
          src={searchIcon}
          alt="검색 아이콘"
          className="absolute right-3 top-3 w-5 h-5 text-gray-500"
        />
      </div>

      {/* 토론방 리스트 */}
      <DebateRoomList debateRooms={debateRooms} isLoading={isLoading} />
    </div>
  );
}
