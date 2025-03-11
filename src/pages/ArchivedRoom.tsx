import { useNavigate, useParams } from "react-router";
import ArchivedRoomMobileChatMenu from "../components/archived-room/ArchivedRoomMobileChatMenu";
import { useModalStore } from "../stores/useModal";
import { useEffect, useState } from "react";
import exit from "../assets/icons/exit.svg";
import ArchivedRoomObserverMobileTab from "../components/archived-room/ArchivedRoomObserverMobileTab";
import ArchivedRoomDebateChat from "../components/archived-room/ArchivedRoomDebateChat";
import ArchivedRoomDebaterList from "../components/archived-room/ArchivedRoomDebaterList";
import ArchivedRoomObserverChat from "../components/archived-room/ArchivedRoomObserverChat";
import { userApi } from "../api/user";
import { debatesAPI } from "../api/debates";
import { debateRoomApi } from "../api/debatezone";

export default function ArchivedRoom() {
    const [isDebateTabed, setIsDebateTabed] = useState<boolean>(true)
  
    const navigate = useNavigate();
    const openModal = useModalStore((state) => state.openModal);
  
    const handleExitClick = () => {
      openModal('정말로 나가시겠습니까?', () => {
        navigate('/main');
      });
    };

    const [archivedChatLogs, setArchivedChatLogs] = useState()
    const [archivedRoomInfoDetails, setArchivedRoomInfoDetails] = useState<DebateRoomInfo>()
    const {roomId} = useParams()

    useEffect(()=> {
        const loadArchivedDebateLogs = async () => {
            if (!roomId) return
            const {data: archivedDebateData} = await userApi.fetchArchivedDebateDetails(roomId)
            setArchivedChatLogs(archivedDebateData)
            const {data: roomInfoDetails} = await debateRoomApi.fetchOngoingRoomInfo(roomId)
            setArchivedRoomInfoDetails(roomInfoDetails)
        }
        loadArchivedDebateLogs()
    },[roomId])
  
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
              <ArchivedRoomMobileChatMenu />
              <ArchivedRoomObserverMobileTab isDebateTabed={isDebateTabed} setIsDebateTabed={setIsDebateTabed}/>
              {/* 디베이터 챗 */}
              <ArchivedRoomDebateChat isDebateTabed={isDebateTabed}/>
            </div>x
            {/* 우측 */}
            <section className="flex md:flex-4 flex-col justify-between max-h-screen text-white">
                <ArchivedRoomDebaterList /> 
                <div className="flex justify-end md:flex hidden">
                  <button onClick={handleExitClick}>
                    <img src={exit} alt="토론방 나가기" />
                  </button>
                </div>
                {/* 참관자 챗 */}
                <ArchivedRoomObserverChat isDebateTabed={isDebateTabed}/> 
              </section>
          </div>
      </div>
      </div>
      
        );
      }
      