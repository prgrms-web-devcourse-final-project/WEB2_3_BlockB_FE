import clock from "../../../assets/icons/clock.svg";
export default function OngoingInfo() {
  return (
        <div className="w-full hidden md:flex justify-between items-center text-center md:text-left">
          <h1 className="text-white font-bold font-pretendard text-[18px] md:text-[24px]">
            토론 주제 | AI는 인간의 노동을 대체하나 보조하나?
          </h1>
          <div className="flex items-center gap-[10px] mt-2 md:mt-0">
            <img src={clock} className="w-[20px] md:w-[25px] h-[20px] md:h-[25px]" />
            <p className="font-sofiaSans font-bold text-white text-[18px] md:text-[20px]">22:21</p>
          </div>
        </div>
  )
}
