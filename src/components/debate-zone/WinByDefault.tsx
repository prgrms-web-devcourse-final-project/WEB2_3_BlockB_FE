import { useNavigate } from "react-router";
import ParticipantBox from "./ParticipantBox";

export default function WinByDefault() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-[30px] mt-[60px]">
      <h1 className="text-white font-pretendard font-bold text-[24px]">
        한 측의 모든 디베이터가 나갔으므로 승패가 결정됩니다
      </h1>
      <section className="flex items-center gap-[26px]">
        <div className="flex flex-col">
          <h2
            className="text-white text-center text-3xl font-bold mb-[18px]"
            style={{ textShadow: "0px 1px 10px rgba(251, 251, 251, 1.00)" }}
          >
            부전승
          </h2>
          <ParticipantBox label="PROS" labelAlignment="center" />
        </div>
        <p className="text-white font-bold text-[24px] font-jersey">vs</p>
        <div>
          <h2
            className="text-white text-center text-3xl font-bold mb-[18px]"
            style={{ textShadow: "0px 1px 10px rgba(251, 251, 251, 1.00)" }}
          >
            부전패
          </h2>
          <ParticipantBox label="CONS" color="blue" labelAlignment="center" />
        </div>
      </section>
      <button
        onClick={() => navigate("/main")}
        className="font-pretendard text-white border-b mt-[18px] mb-[60px]"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
