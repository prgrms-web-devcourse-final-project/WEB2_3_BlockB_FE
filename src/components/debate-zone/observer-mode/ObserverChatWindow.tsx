import send from "../../../assets/icons/send.svg";
import ObserverChatSection from "./ObserverChatSection";

export default function ObserverChatWindow() {
  return (
    <section
      className="w-[378px] h-[440px] rounded-[10px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(115, 115, 115, 0.30) 0%, rgba(217, 217, 217, 0) 100%)",
      }}
    >
      {/* 메시지 로그 */}
      <ObserverChatSection />
      {/* 메시지 입력 창 */}
      <div className="flex justify-between bg-white bg-opacity-30 border p-2 mx-[10px] my-[10px] rounded-md font-pretendard">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          className="appearance-none border-none outline-none focus:ring-0 bg-transparent  w-full placeholder:text-gray02 placeholder:font-light text-white font-bold "
        />
        <button>
          <img src={send} />
        </button>
      </div>
    </section>
  );
}
