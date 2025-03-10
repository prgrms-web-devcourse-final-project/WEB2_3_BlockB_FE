import { useEffect, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";
import Counter from "./Counter";
import ExitModal from "../../common/Modal";
import ParticipantBox from "../ParticipantBox";
import exit from "../../../assets/icons/exit.svg";
import { useRoomStore } from "../../../stores/roomStateStore";
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

  const { roomSettings, setRoomState } = useRoomStore();
  const [turnCount] = useState(roomSettings.speakCount!);
  const timerRef = useRef(roomSettings.time!)

  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);

  const handleExitClick = () => {
    openModal('정말로 나가시겠습니까?', () => {
      navigate('/main');
    });
  };
  
  useEffect(()=> {
    console.log("턴 카운트",turnCount, timerRef.current)
  },[]);

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
          <div className="h-[728.4px] md:pt-[160px] lg:pt-[116px]  md:block hidden">
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
              <Counter label="TURN" boxNumber={2} initialCount={turnCount} />
              <Counter label="TIMER" boxNumber={3} initialCount={timerRef.current} />
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
              <div className="flex justify-end">
                <button
                  onClick={handleExitClick}
                >
                  <img src={exit} alt="토론방 나가기" />
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setRoomState("voting");
              }}
              className="text-white"
            >
              투표로
            </button>
            <button
              onClick={() => {
                setRoomState("won-by-default");
              }}
              className="text-white"
            >
              부전승으로
            </button>
          </div>
        </section>
      )}
    </>
  );
}
