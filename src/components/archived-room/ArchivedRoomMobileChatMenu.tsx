import { useEffect, useRef, useState } from "react";
import hambuger from "../../assets/icons/hamburger.svg";
import exit from "../../assets/icons/exit.svg";
import ExitModal from "../common/Modal";
import { useNavigate } from "react-router";
import { useModalStore } from "../../stores/useModal";
import ParticipantBox from "../debate-zone/ParticipantBox";

export default function ArchivedRoomMobileChatMenu({proUsers, conUsers}: {proUsers: Participant[], conUsers: Participant[]}) {
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);

  const handleExitClick = () => {
    openModal("정말로 나가시겠습니까?", () => {
      navigate("/main");
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSideBarOpen(false); 
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
    <div className="md:hidden flex h-[40px] justify-between items-center relative p-2">
      <ExitModal />
      <div className="flex justify-between text-white font-jersey flex sm:gap-[60px] gap-[40px]"></div>
      <button onClick={() => setIsSideBarOpen(!isSidebarOpen)}>
        <img src={hambuger} alt="사이드 바 버튼" />
      </button>
      {/* 사이드바 */}
      {isSidebarOpen && (
        <section
          ref={sidebarRef}
          className={`absolute right-0 top-0 min-h-screen bg-black w-1/2 flex flex-col gap-4 p-6 
          ${isSidebarOpen ? "animate-slideIn" : "animate-slideOut"}`}
        >
          <div className="flex justify-end">
            <button onClick={handleExitClick}>
              <img src={exit} alt="나가기 버튼" />
            </button>
          </div>
          <ParticipantBox label="PROS" labelAlignment="left" hasReportBtn={true} participants={proUsers}/>
          <ParticipantBox label="CONS" labelAlignment="left" hasReportBtn={true} participants={conUsers}/>
          <div className="flex flex-col gap-4 text-white"></div>
        </section>
      )}
    </div>
  );
}
