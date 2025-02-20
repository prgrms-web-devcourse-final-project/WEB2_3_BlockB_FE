import AudienceList from "./AudienceList";
import ExitModal from "../ongoing-debate/ExitModal";
import MessageItem from "../ongoing-debate/MessageItem";
import ObserverChatWindow from "./ObserverChatWindow";
import clock from "../../../assets/icons/clock.svg";
import exit from "../../../assets/icons/exit.svg";
import profile from "../../../assets/icons/profile-white.svg";
import { useObservingStore } from "../../../stores/observingStateStore";
import { useState } from "react";

export default function ObserverOngoingRoom() {
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const { setObservingState } = useObservingStore();
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
    { id: 9, message: "예시 텍스트 입니다", isMine: true, isOppenent: false },
  ];
  return (
    <div className="flex flex-col px-[200px] py-[30px] justify-center items-center min-h-screen">
      {isExitModalOpen && <ExitModal setIsExitModalOpen={setIsExitModalOpen} />}
      {/* 제목 및 타이머 */}
      <div className="w-[1200px]">
        <div className="flex justify-between">
          <h1 className="text-white font-bold font-pretendard">
            토론 주제 | AI는 인간의 노동을 대체하나 보조하나?
          </h1>
          <div className="flex items-center gap-[10px]">
            <img src={clock} className="w-[25px] h-[25px]" />
            <p className="font-sofiaSans font-bold text-white text-[20px]">
              22:21
            </p>
          </div>
        </div>
        {/* 아래 */}

        <section className="text-white flex justify-between">
          <section>
            <div className="flex justify-between font-jersey text-[20px] mb-[10px]">
              <p>PROS</p>CONS
            </div>
            <section className="border border-white w-[587px] h-[630px] shadow-[0px_4px_20px_0px_rgba(251,251,251,1.00)] rounded-[10px] bg-white bg-opacity-20 overflow-y-auto p-[20px]">
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
          </section>

          <section className="flex flex-col gap-[20px]">
            <AudienceList />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsExitModalOpen(true);
                }}
              >
                <img src={exit} alt="토론방 나가기" />
              </button>
            </div>
            <ObserverChatWindow />
            {/* 참관자 채팅 */}
          </section>
        </section>
        {/* 임시 룸 상태 이동 버튼 */}
        <button
          onClick={() => {
            setObservingState("voting");
          }}
          className="text-white font-bold"
        >
          투표로 이동
        </button>
      </div>
    </div>
  );
}
