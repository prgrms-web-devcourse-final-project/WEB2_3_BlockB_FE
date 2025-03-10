import { useParams } from "react-router";
import { debateRoomApi } from "../../api/debatezone";
import { useObservingStore } from "../../stores/observingStateStore";
import { useRoomStore } from "../../stores/roomStateStore";

export default function VoteButton({
  voteInfo,
}: {
  voteInfo: VoteInfo;
}) {
  const { setRoomState } = useRoomStore();
  const { setObservingState } = useObservingStore();
  const {roomId} = useParams()
  const voteToOnePosition = async (stance: string) => {
    if (!roomId) return
    await debateRoomApi.sendDebateVote(roomId, stance)
  }

  const onVote = () => {
    if ((voteInfo.value === "PRO" || "CON") && !!voteInfo.value) {
      voteToOnePosition(voteInfo.value)
    }
    setObservingState("result");
    setRoomState("result");
  }

  return (
    <button
      onClick={onVote}
      className="md:w-[220px] w-[137px] md:h-[70px] h-[38px]  flex justify-between items-center px-[20px] py-[10px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(251.18, 251.18, 251.18, 0) 0%, rgba(149.18, 149.18, 149.18, 0.30) 49%, rgba(251.18, 251.18, 251.18, 0) 100%)",
      }}
    >
      <figure className="flex items-center gap-[18px]">
        <img
          src={voteInfo.img}
          alt={`${voteInfo.label} 동의`}
          className="md:w-[25px] md:h-[25px] w-[18px] h-[18px]"
        />
        <figcaption>{voteInfo.label}</figcaption>
      </figure>
    </button>
  );
}
