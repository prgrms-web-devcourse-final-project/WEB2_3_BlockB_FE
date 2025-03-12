import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import Counter from "./Counter";
import ExitModal from "../../common/Modal";
import ParticipantBox from "../ParticipantBox";
import exit from "../../../assets/icons/exit.svg";
import { useNavigate } from "react-router";
import { useModalStore } from "../../../stores/useModal";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";

export default function OngoingDebate() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);

  const handleExitClick = () => {
    openModal('정말로 나가시겠습니까?', () => {
      navigate('/main');
    });
  };
  
  const {roomInfoDetails, position} = useDebateWebSocket()

  return (
    <>
      {isLoading ? (
        <section className="flex justify-center items-center md:gap-10 sm:gap-5 gap-[5px] min-h-screen">
          <ParticipantBox label="PROS" labelAlignment="center" participants={roomInfoDetails.proUsers} color={position === "pro" ? "blue" : ""}/>
          <span className="text-white font-bold md:text-[24px] sm:text-[18px] text-[14px] font-jersery">vs</span>
          <ParticipantBox label="CONS" labelAlignment="center" participants={roomInfoDetails.conUsers} color={position === "con" ? "blue" : ""}/>
        </section>
      ) : (
        <section
          className="flex justify-between md:min-h-screen h-screen items-center
        md:gap-[20px] md:px-10"
        >
          <ExitModal />
          <div className="h-[728.4px] md:pt-[120px] lg:pt-[116px]  md:block hidden">
            <ParticipantBox
              label="PROS"
              labelAlignment="start"
              hasReportBtn={true}
              participants={roomInfoDetails.proUsers}
            />
          </div>

          <ChatWindow />

          <div className="md:block hidden md:flex md:flex-col md:justify-start h-[700px]">
            <div className="flex justify-end text-white text-[14px] gap-[20px] mb-[50px]">
              <Counter label="TURN" boxNumber={2} />
              <Counter label="TIMER" boxNumber={3} />
            </div>
            <ParticipantBox
              label="CONS"
              labelAlignment="end"
              hasReportBtn={true}
              participants={roomInfoDetails.conUsers}
            />
            <div className="space-y-2">
              {/* <section className="flex flex-col font-jersey gap-[10px] text-white  mt-[50px] ml-[20px] animate-slide-up">
                <p>audience</p>
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
              </section> */}
              <div className="flex justify-end mt-10">
                <button
                  onClick={handleExitClick}
                >
                  <img src={exit} alt="토론방 나가기" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
