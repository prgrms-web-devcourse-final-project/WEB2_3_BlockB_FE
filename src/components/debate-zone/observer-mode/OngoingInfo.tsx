import clock from "../../../assets/icons/clock.svg";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";
export default function OngoingInfo() {
    const {roomInfoDetails, leftTurnAtObserverView} = useDebateWebSocket()
  return (
        <div className="w-full hidden md:flex justify-between items-center text-center md:text-left md:mb-[20px]">
          <h1 className="text-white font-bold font-pretendard text-[18px] md:text-[24px]">
            토론 주제 | {roomInfoDetails.title}
          </h1>
          <div className="flex items-center gap-[10px] mt-2 md:mt-0">
            <img src={clock} className="w-[20px] md:w-[25px] h-[20px] md:h-[25px]" />
            <p className="font-jersey font-bold text-white text-[18px] md:text-[20px]">leftturn {leftTurnAtObserverView}</p>
          </div>
        </div>
  )
}
