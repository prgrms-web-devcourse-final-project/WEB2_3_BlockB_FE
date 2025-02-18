import { useState } from "react";
import CommonSimpleInfo from "./CommonSimpleInfo";

export default function DebateTab({ tab }: { tab: string }) {
  const [filter, setFilter] = useState(true);
  return (
    <div className={`${tab === "debate" ? "" : "hidden"}`}>
      <div className="flex text-[20px] mb-[30px] font-sofiaSans">
        <button
          onClick={() => {
            setFilter(true);
          }}
          className={`${
            filter ? "text-blue03 border-b-2 border-blue01" : "text-gray03"
          } h-6 mr-[30px]`}
        >
          진행
        </button>
        <button
          onClick={() => {
            setFilter(false);
          }}
          className={`${
            filter ? "text-gray03" : "text-blue03 border-b-2 border-blue01"
          } h-6`}
        >
          종료
        </button>
      </div>
      <div>
        <CommonSimpleInfo newsOrDebate={false} />
        <CommonSimpleInfo newsOrDebate={false} />
        <CommonSimpleInfo newsOrDebate={false} />
        <CommonSimpleInfo newsOrDebate={false} />
        <CommonSimpleInfo newsOrDebate={false} />
        <CommonSimpleInfo newsOrDebate={false} />
      </div>
    </div>
  );
}
