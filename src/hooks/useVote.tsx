import { useParams } from "react-router";
import { debateRoomApi } from "../api/debatezone";
import { useObservingStore } from "../stores/observingStateStore";
import { useRoomStore } from "../stores/roomStateStore";
import { useDebateWebSocket } from "../contexts/DebateWebSocketContext";

type DestinationStage = "replay" | "result";
type VoteSelection = "PRO" | "CON" | "NO_POSITION";

export function useVote(isObserver: boolean) {
  const { setRoomState } = useRoomStore();
  const { setObservingState } = useObservingStore();
  const {setHasVoted} = useDebateWebSocket()
  const { roomId } = useParams();

  const moveState = (stage: DestinationStage) => {
    if (isObserver) setObservingState(stage);
    else setRoomState(stage);
  };

  const voteToOnePosition = async (stance: VoteSelection) => {
    if (!roomId) return;
    await debateRoomApi.sendDebateVote(roomId, stance);
  };

  const onVoteWithStageChanged = async (selection: VoteSelection, stage: DestinationStage) => {
    await voteToOnePosition(selection);
    moveState(stage);
    setHasVoted(true)
  };

  return { moveState, onVoteWithStageChanged };
}
