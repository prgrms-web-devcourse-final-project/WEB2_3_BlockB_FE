import Header from "../components/common/Header";

export default function ObservingZone() {
  return (
    <div className="bg-[#070707] min-h-screen overflow-hidden">
      <Header status={headerStatus} />
      {roomState === "waiting" && < />}
      {roomState === "ongoing" && < />}
      {roomState === "voting" && <VoteRoom />}
      {roomState === "result" && <VoteResult />}
    </div>
  );
}
