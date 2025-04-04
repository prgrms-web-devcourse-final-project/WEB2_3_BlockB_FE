import { useParams } from "react-router";
import duse from "../../assets/icons/duse.svg";
import flagWhite from "../../assets/icons/flag-white.svg";
import flag from "../../assets/icons/flag.svg";
import lose from "../../assets/icons/lose.svg";
import profile from "../../assets/icons/profile-white.svg";
import win from "../../assets/icons/win.svg";
import { useReportModalStore } from "../../stores/reportModalStore";

export default function ProfileCard({
  color,
  hasReportBtn = false,
  participant,
}: {
  color?: string;
  hasReportBtn?: boolean;
  participant: Participant
}) {
    const { openModal } = useReportModalStore();
    const {roomId} = useParams()
    const handleOpenReportModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if(!roomId) return
      e.stopPropagation()
      openModal({
        targetNickname: participant.nickname,
        targetUserId: participant.id,
        targetType: "CHAT",
        roomId: roomId,
      });
    };
  return (
    <div
      className={`flex items-center lg:w-[280px] w-[145px] h-[34px] justify-between h-auto lg:px-[10px] lg:py-[8px] p-1 bg-neutral-50/50 lg:rounded-lg rounded-[5px] text-white animate-flip ${
        color === "blue" &&
        "bg-sky-950/50 shadow:0px 1px 10px rgb(0 96 240 /1.00) border border-neutral-50/50 "
      }`}
      style={
        color === "blue"
          ? {
              textShadow: "0px 1px 10px rgba(0, 96, 240, 1.00)",
              boxShadow: "0px 1px 10px rgba(0, 96, 240, 1.00)",
            }
          : {}
      }
    >
      <div className="flex lg:gap-[21px] gap-1 items-center">
        <figure className="rounded-full">
          <img src={ participant.profileUrl || profile} alt="" className="lg:w-[54px] lg:h-[54px] w-[25px] h-[25px] rounded-full" />
        </figure>
        <div className="flex flex-col gap-[2px]">
          <p className="leading-0">{participant.nickname}</p>
          <div className="flex lg:gap-[10px] gap-[2px] lg:h-[22px] h-[11px]">
            <figure className="flex items-center rounded-full">
              <img src={win} alt="승리" className="lg:w-[22px] lg:h-[22px] w-[11px] h-[11px] lg:mr-2 mr-1" />
              <figcaption>{participant.winNumber || 0}</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={duse} alt="무승부" className="lg:w-[22px] lg:h-[22px] w-[11px] h-[11px] lg:mr-2 mr-1" />
              <figcaption>{participant.drawNumber || 0}</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={lose} alt="패배" className="lg:w-[22px] lg:h-[22px] w-[11px] h-[11px] lg:mr-2 mr-1" />
              <figcaption>{participant.defeatNumber || 0}</figcaption>
            </figure>
          </div>
        </div>
      </div>
      {hasReportBtn && (
        <div className="relative">
          <button onClick={handleOpenReportModal}>
            <img
              src={color === "blue" ? flagWhite : flag}
              alt="신고하기 모달 열기"
              className="md:w-[12px] md:h-[14px] w-[10px] h-[11px]"
            />
          </button>
        </div>
      )}
    </div>
  );
}
