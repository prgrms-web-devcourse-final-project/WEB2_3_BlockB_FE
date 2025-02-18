import MessageSection from "./MessageSection";
import TurnProgress from "./TurnProgress";

export default function ChatWindow() {
  return (
    <section className="w-[590px] h-[700px] relative bg-neutral-50/30 rounded-lg shadow-[0px_4px_20px_0px_rgba(251,251,251,1.00)] border border-neutral-50 animate-slide-up">
      <TurnProgress />
      <MessageSection />
    </section>
  );
}
