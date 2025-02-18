import { useState } from "react";
import ParticipantBox from "../ParticipantBox";
import Counter from "./Counter";

export default function OngoingDebate() {
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);
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
          <div className="mt-[140px]">
            <ParticipantBox label="PROS" labelAlignment="start" />
          </div>
          <section className="w-[590px] h-[700px] relative bg-neutral-50/30 rounded-lg shadow-[0px_4px_20px_0px_rgba(251,251,251,1.00)] border border-neutral-50"></section>
          <div>
            <div className="flex justify-end text-white text-[14px] gap-[20px] mb-[50px]">
              <Counter label="TURN" boxNumber={2} count={10} />
              <Counter label="TIMER" boxNumber={3} count={9} />
            </div>
            <ParticipantBox label="CONS" labelAlignment="end" color="blue" />
            <div></div>
          </div>
        </section>
      )}
    </>
  );
}
