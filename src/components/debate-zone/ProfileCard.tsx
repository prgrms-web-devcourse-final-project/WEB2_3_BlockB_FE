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
      className={`flex w-[280px] justify-between h-auto px-[10px] py-[8px] bg-neutral-50/50 rounded-lg animate-flip ${
        color === "blue" &&
        "bg-sky-950/50 shadow:0px 1px 10px rgb(0 96 240 /1.00) border border-neutral-50/50 text-white "
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
      <div className="flex gap-[21px]">
        <figure className="rounded-full">
          <img src={profile} alt="" className="w-[54px] h-[54px]" />
        </figure>
        <div className="flex flex-col">
          <p>imaria0218</p>
          <div className="flex gap-[10px]">
            <figure className="flex items-center rounded-full">
              <img src={win} alt="" className="w-[22px] h-[22px] mr-2" />
              <figcaption>5</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={duse} alt="" className="w-[22px] h-[22px] mr-2" />
              <figcaption>3</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={lose} alt="" className="w-[22px] h-[22px] mr-2" />
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
              alt="신고하기 열기"
            />
          </button>
        </div>
      )}
      {isModalOpen && <ReportModal setIsModalOpen={setIsModalOpen} />}
      <div className="flex gap-[21px]">
        <figure className="rounded-full">
          <img src={profile} alt="" className="w-[54px] h-[54px]" />
        </figure>
        <div className="flex flex-col">
          <p>imaria0218</p>
          <div className="flex gap-[10px]">
            <figure className="flex items-center rounded-full">
              <img src={win} alt="" className="w-[22px] h-[22px] mr-2" />
              <figcaption>5</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={duse} alt="" className="w-[22px] h-[22px] mr-2" />
              <figcaption>3</figcaption>
            </figure>
            <figure className="flex items-center rounded-full">
              <img src={lose} alt="" className="w-[22px] h-[22px] mr-2" />
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
              alt="신고하기 열기"
            />
          </button>
        </div>
      )}
    </div>
  );
}
