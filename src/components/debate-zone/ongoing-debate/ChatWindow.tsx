import MessageSection from "./MessageSection";
import MobileChatMenu from "./MobileChatMenu";
import TurnProgress from "./TurnProgress";

export default function ChatWindow() {
  return (
    <section className="md:w-[590px] md:h-[700px] w-full md:h-full h-screen md:bg-white md:bg-opacity-5 rounded-lg animate-slide-up md:px-[0px] p-2">
      {/* md 사이즈 이상만 나타남 */}
      <TurnProgress />
      {/* 최소 ~ sm 사이즈에서만 나타남 */}
      <MobileChatMenu />
      {/* 메시지 로그 및 입력바 */}
      <MessageSection />
    </section>
  );
}
