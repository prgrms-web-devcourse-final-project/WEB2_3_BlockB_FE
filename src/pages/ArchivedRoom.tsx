import { useNavigate, useParams } from "react-router";
import ArchivedRoomMobileChatMenu from "../components/archived-room/ArchivedRoomMobileChatMenu";
import { useEffect, useState } from "react";
import exit from "../assets/icons/exit.svg";
import ArchivedRoomObserverMobileTab from "../components/archived-room/ArchivedRoomObserverMobileTab";
import ArchivedRoomDebateChat from "../components/archived-room/ArchivedRoomDebateChat";
import ArchivedRoomDebaterList from "../components/archived-room/ArchivedRoomDebaterList";
import ArchivedRoomObserverChat from "../components/archived-room/ArchivedRoomObserverChat";
import { userApi } from "../api/user";
import { debateRoomApi } from "../api/debatezone";

export default function ArchivedRoom() {
  const [isDebateTabed, setIsDebateTabed] = useState<boolean>(true);
  const navigate = useNavigate();

  const [debaterChatLogs, setDebaterChatLogs] = useState<ArchivedChatLog[]>([]);
  const [observerChatLogs, setObserverChatLogs] = useState<ArchivedChatLog[]>(
    []
  );
  const [archivedRoomInfoDetails, setArchivedRoomInfoDetails] = useState<
    DebateRoomInfo | undefined
  >();
  const { roomId } = useParams();

  useEffect(() => {
    const loadArchivedDebateLogs = async () => {
      if (!roomId) return;
      try {
        const { data: archivedDebateData } =
          await userApi.fetchArchivedDebateDetails(roomId);
        setDebaterChatLogs(
          archivedDebateData
            .filter((chat: ArchivedChatLog) => chat.position !== "NO_POSITION")
            .reverse()
        );
        setObserverChatLogs(
          archivedDebateData
            .filter((chat: ArchivedChatLog) => chat.position === "NO_POSITION")
            .reverse()
        );
        const { data: roomInfoDetails } =
          await debateRoomApi.fetchOngoingRoomInfo(roomId);
        setArchivedRoomInfoDetails(roomInfoDetails);
      } catch (error) {
        console.log("저장된 토론방 정보 가져오는 도중 애러 발생", error);
        navigate("/not-found");
      }
    };
    loadArchivedDebateLogs();
  }, [roomId]);

  useEffect(() => {
    console.log("디베이터 채팅 로그입니다", debaterChatLogs);
    console.log("옵져버 채팅 로그입니다2", observerChatLogs);
  }, [debaterChatLogs, observerChatLogs]);

  if (!archivedRoomInfoDetails) return <div></div>;

  return (
    <div className="bg-[#070707] min-h-screen overflow-hidden">
      <div className="flex md:flex-col justify-center items-center h-screen md:px-[100px] md:py-[30px]">
        {/* md 이상일 때만 나타남: 제목 및 타이머 */}
        <div className="w-full hidden md:flex justify-between items-center text-center md:text-left md:mb-[20px]">
          <h1 className="text-white font-bold font-pretendard text-[18px] md:text-[24px]">
            토론 주제 | {archivedRoomInfoDetails?.title}
          </h1>
        </div>
        <div className="w-full md:flex flex-grow overflow-hidden">
          {/* 좌측 */}
          <div className="md:flex-6 flex flex-1 flex-col">
            {/* sm 이하일 때만 나타남 */}
            <ArchivedRoomMobileChatMenu
              proUsers={archivedRoomInfoDetails?.proUsers ?? []}
              conUsers={archivedRoomInfoDetails?.conUsers ?? []}
            />
            <ArchivedRoomObserverMobileTab
              isDebateTabed={isDebateTabed}
              setIsDebateTabed={setIsDebateTabed}
              roomInfo={archivedRoomInfoDetails}
            />
            {/* 디베이터 챗 */}
            <ArchivedRoomDebateChat
              isDebateTabed={isDebateTabed}
              logs={debaterChatLogs}
            />
          </div>
          {/* 우측 */}
          <section className="flex md:flex-4 flex-col gap-[20px] justify-between max-h-screen text-white">
            <ArchivedRoomDebaterList roomInfo={archivedRoomInfoDetails} />
            <div className="flex justify-end md:flex hidden">
              <button onClick={() => navigate(-1)}>
                <img src={exit} alt="토론방 나가기" />
              </button>
            </div>
            {/* 참관자 챗 */}
            <ArchivedRoomObserverChat
              isDebateTabed={isDebateTabed}
              logs={observerChatLogs}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
