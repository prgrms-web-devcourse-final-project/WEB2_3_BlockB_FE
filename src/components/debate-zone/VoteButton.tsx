import { useObservingStore } from "../../stores/observingStateStore";
import { useRoomStore } from "../../stores/roomStateStore";

export default function VoteButton({
  voteInfo,
  isObserver = false,
}: {
  voteInfo: VoteInfo;
  isObserver?: boolean;
}) {
  const { setRoomState } = useRoomStore();
  const { setObservingState } = useObservingStore();
  const goToVoteResult = () => {
    if (isObserver) setObservingState("result");
    setRoomState("result");
  };
  return (
    <button
      onClick={goToVoteResult}
      className="w-[220px] h-[70px]  flex justify-between items-center px-[20px] py-[10px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(251.18, 251.18, 251.18, 0) 0%, rgba(149.18, 149.18, 149.18, 0.30) 49%, rgba(251.18, 251.18, 251.18, 0) 100%)",
      }}
    >
      <figure className="flex items-center gap-[18px]">
        <img
          src={voteInfo.img}
          alt={`${voteInfo.label} 동의`}
          className="w-[25px] h-[25px]"
        />
        <figcaption>{voteInfo.label}</figcaption>
      </figure>
    </button>
  );
}
