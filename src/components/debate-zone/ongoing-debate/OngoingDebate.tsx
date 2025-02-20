import { useEffect, useState } from "react";

import AudienceCard from "./../AudienceCard";
import ChatWindow from "./ChatWindow";
import Counter from "./Counter";
import ExitModal from "./ExitModal";
import ParticipantBox from "../ParticipantBox";
import exit from "../../../assets/icons/exit.svg";
import profile from "../../../assets/icons/profile.svg";
import { useRoomStore } from "../../../stores/roomStateStore";

export default function OngoingDebate() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  const { roomSettings } = useRoomStore();
  const [turnCount, setTurnCount] = useState(roomSettings.turn!);
  const [timerCount, setTimerCount] = useState(roomSettings.time!);
  const { setRoomState } = useRoomStore();
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCount((prev: number) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isLoading ? (
        <section className="flex justify-center items-center gap-10 min-h-screen">
          <ParticipantBox label="PROS" labelAlignment="center" />
          <span className="text-white font-bold text-[24px]">vs</span>
          <ParticipantBox label="CONS" labelAlignment="center" color="blue" />
        </section>
      ) : (
        <section
          className="flex justify-between px-[30px] py-[20px] min-h-screen items-center
        "
        >
          {isExitModalOpen && (
            <ExitModal setIsExitModalOpen={setIsExitModalOpen} />
          )}
          <div className="h-[728.4px] pt-[110px]">
            <ParticipantBox
              label="PROS"
              labelAlignment="start"
              hasReportBtn={true}
            />
          </div>

          <ChatWindow />

          <div>
            <div className="flex justify-end text-white text-[14px] gap-[20px] mb-[50px]">
              <Counter label="TURN" boxNumber={2} count={turnCount} />
              <Counter label="TIMER" boxNumber={3} count={timerCount} />
            </div>
            <ParticipantBox
              label="CONS"
              labelAlignment="end"
              color="blue"
              hasReportBtn={true}
            />
            <div className="space-y-2">
              <section className="flex flex-col font-jersey gap-[10px] text-white  mt-[50px] ml-[20px] animate-slide-up">
                <p>audience</p>
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
                <AudienceCard profile={profile} nickname="imaria0219" />
              </section>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setIsExitModalOpen(true);
                  }}
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
