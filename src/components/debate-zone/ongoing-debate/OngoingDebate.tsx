import { useEffect, useState } from "react";

import profile from "../../../assets/icons/profile.svg";
import { useRoomStore } from "../../../stores/roomStateStore";
import ParticipantBox from "../ParticipantBox";
import AudienceCard from "./../AudienceCard";
import ChatWindow from "./ChatWindow";
import Counter from "./Counter";

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

  useEffect(() => {
    setInterval(() => {
      setTimerCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <section className="flex justify-center items-center gap-10 h-screen">
          <ParticipantBox label="PROS" labelAlignment="center" />
          <span className="text-white font-bold text-[24px]">vs</span>
          <ParticipantBox label="CONS" labelAlignment="center" color="blue" />
        </section>
      ) : (
        <section className="flex justify-between px-[30px] py-[20px]">
          <div className="mt-[117px]">
            <ParticipantBox label="PROS" labelAlignment="start" />
          </div>
          <ChatWindow />
          <div>
            <div className="flex justify-end text-white text-[14px] gap-[20px] mb-[50px]">
              <Counter label="TURN" boxNumber={2} count={turnCount} />
              <Counter label="TIMER" boxNumber={3} count={timerCount} />
            </div>
            <ParticipantBox label="CONS" labelAlignment="end" color="blue" />
            <section className="flex flex-col font-jersey gap-[10px] text-white font-bold mt-[50px] ml-[20px]">
              <p>audience</p>
              <AudienceCard profile={profile} nickname="imaria0219" />
              <AudienceCard profile={profile} nickname="imaria0219" />
              <AudienceCard profile={profile} nickname="imaria0219" />
              <AudienceCard profile={profile} nickname="imaria0219" />
              <AudienceCard profile={profile} nickname="imaria0219" />
            </section>
          </div>
        </section>
      )}
    </>
  );
}
