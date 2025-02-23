import send from "../../../assets/icons/send.svg";
import ObserverChatSection from "./ObserverChatSection";

export default function ObserverChatWindow({isDebateTabed}: {isDebateTabed : boolean}) {
  return (
    <section
      className={`${isDebateTabed? "md:block hidden md:w-[378px] md:h-[440px] h-screen rounded-[10px] md:mt-0 mt-[10px]" : "md:w-[378px] md:h-[440px] h-screen rounded-[10px] md:mt-0 mt-[10px]"}`}
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
