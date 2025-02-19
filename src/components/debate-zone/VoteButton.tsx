import vote from "../../assets/icons/vote.svg";
import { useRoomStore } from "../../stores/roomStateStore";

export default function VoteButton({ voteInfo }: { voteInfo: VoteInfo }) {
  const { setRoomState } = useRoomStore();
  const goToVoteResult = () => {
    setRoomState("result");
  };
  return (
    <div
      className="w-[280px] h-[70px]  flex justify-between items-center px-[20px] py-[10px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(251.18, 251.18, 251.18, 0) 0%, rgba(149.18, 149.18, 149.18, 0.30) 49%, rgba(251.18, 251.18, 251.18, 0) 100%)",
      }}
    >
      <figure className="flex items-center gap-[18px]">
        <img src={voteInfo.img} alt={`${voteInfo.label} 동의`} />
        <figcaption>{voteInfo.label}</figcaption>
      </figure>
      <button
        onClick={goToVoteResult}
        className={`w-[60px] h-[50px] bg-${voteInfo.btnColor} px-[15px] py-auto rounded-[10px]`}
      >
        <img src={vote} alt={`${voteInfo.label} 동의 버튼`} />
      </button>
    </div>
  );
}
