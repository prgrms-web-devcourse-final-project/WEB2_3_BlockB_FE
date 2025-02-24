import { useEffect, useRef, useState } from "react";
import { useRoomStore } from "../../../stores/roomStateStore";
import Counter from "./Counter";
import hambuger from "../../../assets/icons/hamburger.svg"
import ParticipantBox from "../ParticipantBox";
import AudienceCard from "../AudienceCard";
import profile from "../../../assets/icons/profile-white.svg"
import exit from "../../../assets/icons/exit.svg"
import ExitModal from "./ExitModal";
export default function MobileChatMenu() {
    const { roomSettings } = useRoomStore();
    const [turnCount, setTurnCount] = useState(roomSettings.turn!);
    const [timerCount, setTimerCount] = useState(roomSettings.time!);
    const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false)
    const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false)
    const sidebarRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
        setTimerCount((prev: number) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    
        return () => clearInterval(interval);
    }, [timerCount]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSideBarOpen(false); // 사이드바 외부 클릭 시 닫기
            }
        }

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

  return (
    <div className="md:hidden flex justify-between items-center relative">
        {/* 나가기 모달 */}
        {isExitModalOpen && <ExitModal setIsExitModalOpen={setIsExitModalOpen}/>}
        <div className="flex justify-between text-white font-jersey flex sm:gap-[60px] gap-[40px]">
            <Counter label="TURN" boxNumber={2} count={turnCount} />
            <Counter label="TIMER" boxNumber={3} count={timerCount} />
        </div>
        <button onClick={()=>setIsSideBarOpen(!isSidebarOpen)}>
            <img src={hambuger} alt="사이드 바 버튼" />
        </button>
        {/* 사이드바 */}
        {isSidebarOpen && <section ref={sidebarRef}   className={`absolute right-0 top-0 min-h-screen bg-black w-1/2 flex flex-col gap-4 p-6 
    ${isSidebarOpen ? "animate-slideIn" : "animate-slideOut"}`}>
            <div className="flex justify-end">
                <button onClick={()=>setIsExitModalOpen(true)}>
                    <img src={exit} alt="나가기 버튼" />
                </button>
            </div>
            <ParticipantBox label="PROS" labelAlignment = "left" hasReportBtn ={true}/>
            <ParticipantBox label="CONS" labelAlignment = "left" hasReportBtn ={true}/>
            <div className="flex flex-col gap-4 text-white">
            <p className="font-jersey text-[16px]">Audience</p>
                <div className="flex flex-col gap-1 pl-2">
                    <AudienceCard profile={profile} nickname="imaria0218"/>
                    <AudienceCard profile={profile} nickname="imaria0218"/>
                    <AudienceCard profile={profile} nickname="imaria0218"/>
                    <AudienceCard profile={profile} nickname="imaria0218"/>
                    <AudienceCard profile={profile} nickname="imaria0218"/>
                </div>
             </div>
        </section>}
    </div>
  )
}
