import MessageSection from "./MessageSection";
import MobileChatMenu from "./MobileChatMenu";
// import TurnProgress from "./TurnProgress";

export default function ChatWindow() {
  return (
    <section className="relative md:max-w-[520px] md:min-w-[400px] w-full md:h-[700px] h-full flex flex-col md:bg-white md:bg-opacity-5 animate-slide-up rounded-[10px]">
      {/* md 사이즈 이상만 나타남 */}
      {/* <TurnProgress /> */}
      {/* 최소 ~ sm 사이즈에서만 나타남 */}
      <MobileChatMenu />
      {/* 메시지 로그 및 입력바 */}
      <MessageSection />
    </section>
  );
}
