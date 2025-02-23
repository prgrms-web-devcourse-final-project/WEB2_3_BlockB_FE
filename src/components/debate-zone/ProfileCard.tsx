import { useState } from "react";
import duse from "../../assets/icons/duse.svg";
import flagWhite from "../../assets/icons/flag-white.svg";
import flag from "../../assets/icons/flag.svg";
import lose from "../../assets/icons/lose.svg";
import profile from "../../assets/icons/profile-white.svg";
import win from "../../assets/icons/win.svg";
import ReportModal from "./ongoing-debate/ReportModal";

export default function ProfileCard({
  color,
  hasReportBtn = false,
}: {
  color?: string;
  hasReportBtn?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div
      className={`flex items-center lg:w-[280px] w-[150px] h-[34px] justify-between h-auto lg:px-[10px] lg:py-[8px] p-1 bg-neutral-50/50 lg:rounded-lg rounded-[5px] text-white animate-flip ${
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
      {isModalOpen && <ReportModal setIsModalOpen={setIsModalOpen} />}
      <div className="flex lg:gap-[21px] gap-1 items-center">
        <figure className="rounded-full">
          <img src={profile} alt="" className="lg:w-[54px] lg:h-[54px] w-[25px] h-[25px]" />
        </figure>
        <div className="flex flex-col gap-[2px]">
          <p className="leading-0">imaria0218</p>
          <div className="flex lg:gap-[10px] gap-[2px] lg:h-[22px] h-[11px]">
            <figure className="flex items-center rounded-full">
              <img src={win} alt="" className="lg:w-[22px] lg:h-[22px] w-[11px] h-[11px] lg:mr-2 mr-1" />
              <figcaption>5</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={duse} alt="" className="lg:w-[22px] lg:h-[22px] w-[11px] h-[11px] lg:mr-2 mr-1" />
              <figcaption>3</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={lose} alt="" className="lg:w-[22px] lg:h-[22px] w-[11px] h-[11px] lg:mr-2 mr-1" />
              <figcaption>0</figcaption>
            </figure>
          </div>
        </div>
      </div>
      {hasReportBtn && (
        <div className="relative">
          <button onClick={() => setIsModalOpen(true)}>
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
