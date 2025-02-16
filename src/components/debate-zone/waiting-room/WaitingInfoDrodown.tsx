import { useState } from "react";
import arrowdown from "../../../assets/icons/arrow-down.svg";
import arrowup from "../../../assets/icons/arrow-up.svg";
import link from "../../../assets/icons/link.svg";

export default function WaitingInfoDrodown({
  isWaiting,
  prosNum,
  consNum,
}: {
  isWaiting: boolean;
  prosNum: number;
  consNum: number;
}) {
  const [dropdown, setDropDown] = useState<boolean>(false);
  return (
    <div>
      {/* 드롭다운전 */}
      <div className="text-white w-72 h-10 px-4 py-2 bg-neutral-50/50 rounded-lg border border-white01  flex justify-between font-bold">
        <div className="flex gap-[10px]">
          <p className="w-[56px]">{isWaiting ? "대기중" : "대기완료"}</p>
          <p className="w-[56px]">
            <span>찬성</span> <span>{prosNum}</span>
          </p>
          <p className="w-[56px]">
            <span>반대</span> <span>{consNum}</span>
          </p>
        </div>
        <button onClick={() => setDropDown(!dropdown)}>
          <img
            src={dropdown ? arrowdown : arrowup}
            alt="토론방 상세 정보 여닫기"
          />
        </button>
      </div>
      {dropdown && (
        <div className="w-[612px] h-auto py-[20px] px-[36px] bg-neutral-50/50 rounded-lg border border-white01  flex flex-col justify-between gap-[20px] shadow-[0px_1px_5px_0px_rgba(251,251,251,1.00)] ">
          {/* 주제 및 설명 */}
          <div className="text-white font-bold">
            <h1 className="inline-flex justify-start">
              <span className="w-[71px] mr-[10px]">토론주제</span>
              <span>AI는 인간의 노동을 대체하나 보조하나</span>
            </h1>
            <h2 className="inline-flex justify-start">
              <span className="w-[71px] mr-[10px]">방 설명</span>
              <span>
                욕설, 비속어 없는 건전한 토론을 지향합니다. 인신공격, 비방은
                경고없이 신고 들어갑니다.
              </span>
            </h2>
          </div>
          {/* 토론방 정보 */}
          <div className="flex justify-start gap-[10px] text-black01 font-bold">
            <div className="h-7 px-2.5 py-1 bg-neutral-50/70 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>아프리카</p>
            </div>
            <div className="h-7 px-2.5 py-1 bg-neutral-50/70 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>정치</p>
            </div>
            <div className="h-7 px-2.5 py-1 bg-neutral-50/70 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>10분</p>
            </div>
            <div className="h-7 px-2.5 py-1 bg-neutral-50/70 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>반대</p>
            </div>
            <div className="h-7 px-2.5 py-1 bg-neutral-50/70 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>3:3</p>
            </div>
            <div className="h-7 px-2.5 py-1 bg-neutral-50/70 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>승패 결정</p>
            </div>
            <div className="h-7 px-2.5 py-1 bg-neutral-50/70 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>25분</p>
            </div>
          </div>
          {/* 링크 */}
          <div>
            <figure className="w-full flex items-center gap-2">
              <img src={link} alt="연관된 뉴스 링크" />
              <figcaption className="text-gray02 text-[10px] leading-0">
                https://www.yna.co.kr/view/AKR20250213094800004?section=politics/all&site=topnews01
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </div>
  );
}
