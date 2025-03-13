import { useNavigate } from "react-router";
import { useDebateWebSocket } from "../../contexts/DebateWebSocketContext";
import { useEffect, useState } from "react";
import LoadingBar from "../common/LoadingBar";

export default function ExitOverFlowNull() {
    const navigate = useNavigate();
    const {roomInfoDetails} = useDebateWebSocket()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
      setTimeout(()=>{
        setIsLoading(false)
      }, 2000)
    },[])
  
  if (isLoading) return <LoadingBar isLoading={isLoading} color="white" speed={20} />
  return (
        <div className="flex flex-col justify-center items-center gap-[30px] md:mt-[60px] min-h-screen">
          <h1 className="text-white font-pretendard font-bold  md:text-[24px] text-[16px]">
            {roomInfoDetails.memberNumberType === 1 ? "한 측의 디베이터가 나갔으므로 토론이 종료됩니다" : "한 측의 디베이터가 한명만 남았으므로 토론이 종료됐습니다"}
          </h1>
          <button
            onClick={() => navigate("/main")}
            className="font-pretendard text-white border-b mt-[18px] md:mb-[60px] md:text-[16px] text-[14px]"
          >
            홈으로 돌아가기
          </button>
        </div>
  )
}
