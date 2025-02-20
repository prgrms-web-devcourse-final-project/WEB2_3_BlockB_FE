import MessageSection from "./MessageSection";
import TurnProgress from "./TurnProgress";

export default function ChatWindow() {
  return (
    <section className="w-[590px] h-[700px] bg-white bg-opacity-5 rounded-lg animate-slide-up">
      <TurnProgress />
      <MessageSection />
    </section>
  );
}
