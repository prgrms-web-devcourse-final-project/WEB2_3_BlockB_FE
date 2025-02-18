import { useState } from "react";
import CommonSimpleInfo from "./CommonSimpleInfo";

export default function NewsTab({ tab }: { tab: string }) {
  const [filter, setFilter] = useState(true);
  return (
    <div className={`${tab === "news" ? "" : "hidden"} `}>
      <div className="flex text-[20px] mb-[30px] font-pretendard">
        <button
          onClick={() => {
            setFilter(true);
          }}
          className={`${
            filter
              ? "text-blue03 border-b-2 border-blue01 font-bold"
              : "text-gray03"
          } h-6 mr-[30px]`}
        >
          북마크
        </button>
        <button
          onClick={() => {
            setFilter(false);
          }}
          className={`${
            filter ? "text-gray03" : "text-blue03 border-b-2 border-blue01"
          } h-6`}
        >
          좋아요
        </button>
      </div>
      <div>
        <CommonSimpleInfo newsOrDebate={true} />
        <CommonSimpleInfo newsOrDebate={true} />
        <CommonSimpleInfo newsOrDebate={true} />
        <CommonSimpleInfo newsOrDebate={true} />
        <CommonSimpleInfo newsOrDebate={true} />
        <CommonSimpleInfo newsOrDebate={true} />
      </div>
    </div>
  );
}
