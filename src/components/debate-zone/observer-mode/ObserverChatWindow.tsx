import send from "../../../assets/icons/send.svg";
import ObserverChatSection from "./ObserverChatSection";

export default function ObserverChatWindow({ isDebateTabed }: { isDebateTabed: boolean }) {
  return (
    <section
      id="chatwindow"
      className={`md:w-full md:h-[440px] max-h-[calc(100vh-90px)] rounded-[10px] md:mt-0 mt-[10px] flex flex-col flex-grow pb-2
        ${isDebateTabed ? "hidden md:flex" : "h-screen"}`}
    >
      {/* 메시지 로그 */}
      <div className="flex-grow overflow-y-auto">
        <ObserverChatSection />
      </div>

      {/* 메시지 입력 창 (항상 하단 고정) */}
      <div className="flex justify-between items-center bg-white/30 border p-2 mx-[10px] my-[10px] rounded-md font-pretendard">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          className="w-full bg-transparent border-none outline-none text-white font-bold placeholder:text-gray-400 placeholder:font-light"
        />
        <button aria-label="메시지 전송">
          <img src={send} alt="전송" />
        </button>
      </div>
    </section>
  );
}
