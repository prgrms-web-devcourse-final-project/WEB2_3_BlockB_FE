import AudienceList from "./AudienceList";
import ExitModal from "../ongoing-debate/ExitModal";
import MessageItem from "../ongoing-debate/MessageItem";
import ObserverChatWindow from "./ObserverChatWindow";
import clock from "../../../assets/icons/clock.svg";
import exit from "../../../assets/icons/exit.svg";
import profile from "../../../assets/icons/profile-white.svg";
import { useObservingStore } from "../../../stores/observingStateStore";
import { useState } from "react";
import ObserverMobileChatMenu from "./ObserverMobileChatMenu";
import ObserverMobileTab from "./ObserverMobileTab";


export default function ObserverOngoingRoom() {
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const { setObservingState } = useObservingStore();
  const [isDebateTabed, setIsDebateTabed] = useState<boolean>(true)
  const messages = [
    { id: 1, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 2, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 3, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 4, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 5, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 6, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 7, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 8, message: "예시 텍스트 입니다", isMine: true, isOppenent: false },
    { id: 9, message: "예시 텍스트 입니다", isMine: true, isOppenent: false },
    { id: 10, message: "조금 긴 예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 11, message: "조금 많이 긴 예시 텍스트 입니다", isMine: true, isOppenent: false },
    { id: 12, message: "예시 텍스트 입니다", isMine: true, isOppenent: false },
    { id: 13, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
  ]
  return (
<div className="flex md:flex-col px-[10px] md:px-[100px] lg:px-[200px] md:py-[30px] justify-center items-center min-h-screen">
  {isExitModalOpen && <ExitModal setIsExitModalOpen={setIsExitModalOpen} />}
  <div className="w-full max-w-[1200px]">
    {/* md 이상일 때만 나타남: 제목 및 타이머 */}
    <div className="w-full hidden md:flex justify-between items-center text-center md:text-left">
      <h1 className="text-white font-bold font-pretendard text-[18px] md:text-[24px]">
        토론 주제 | AI는 인간의 노동을 대체하나 보조하나?
      </h1>
      <div className="flex items-center gap-[10px] mt-2 md:mt-0">
        <img src={clock} className="w-[20px] md:w-[25px] h-[20px] md:h-[25px]" />
        <p className="font-sofiaSans font-bold text-white text-[18px] md:text-[20px]">22:21</p>
      </div>
    </div>
    {/* sm 이하일 때만 나타남 */}
    <ObserverMobileChatMenu />
    <ObserverMobileTab isDebateTabed={isDebateTabed} setIsDebateTabed={setIsDebateTabed}/>
    {/* 본문 영역 */}
    <section className="text-white flex md:flex-row flex-col flex-grow justify-between gap-[20px] md:mt-[20px] ">

      {/* 채팅 메시지 영역 */}
      <section className={`${ isDebateTabed? " md:border md:border-white w-full md:w-[55%] flex flex-col flex-grow md:h-[630px] md:shadow-lg md:rounded-[10px] md:bg-white md:bg-opacity-20 overflow-y-auto md:p-[20px] p-[10px] flex flex-col" : "md:flex flex-col hidden md:border md:border-white w-full md:w-[55%] h-screen md:h-[630px] md:shadow-lg md:rounded-[10px] md:bg-white md:bg-opacity-20 overflow-y-auto md:p-[20px] p-[10px]"}`}>
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg.message}
            profile={profile}
            isMine={msg.isMine}
            isOppenent={msg.isOppenent}
          />
        ))}
      </section>

      {/* 우측 패널 */}
      <section className="flex flex-col gap-[20px] w-full md:w-[40%]">
        <AudienceList /> 
        <div className="flex justify-end md:flex hidden">
          <button onClick={() => setIsExitModalOpen(true)}>
            <img src={exit} alt="토론방 나가기" />
          </button>
        </div>
      <ObserverChatWindow isDebateTabed={isDebateTabed}/> 
      </section>

    </section>

    {/* 투표 버튼 */}
    <button
      onClick={() => setObservingState("voting")}
      className="text-white font-bold w-full md:w-auto mt-[20px] py-[10px] px-[20px] bg-blue-600 rounded-md"
    >
      투표로 이동
    </button>
  </div>
</div>

  );
}
