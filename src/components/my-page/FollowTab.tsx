import { useState } from "react";
import ProfileSimpleInfo from "./ProfileSimpleInfo";

export default function FollowTab({ tab }: { tab: string }) {
  const [filter, setFilter] = useState(true);
  return (
    <div className={`${tab === "follow" ? "" : "hidden"}`}>
      <div className="flex text-[20px]  mb-[30px] font-pretendard">
        <button
          onClick={() => {
            setFilter(true);
          }}
          className={`${
            filter ? "text-blue03 border-b-2 border-blue01" : "text-gray03 "
          } h-6 mr-[30px]`}
        >
          팔로워 10명
        </button>
        <button
          onClick={() => {
            setFilter(false);
          }}
          className={`${
            filter ? "text-gray03" : "text-blue03 border-b-2 border-blue01"
          } h-6`}
        >
          팔로잉 21명
        </button>
      </div>
      <div className="grid grid-rows-3 grid-cols-2 gap-[20px]">
        <ProfileSimpleInfo />
        <ProfileSimpleInfo />
        <ProfileSimpleInfo />
        <ProfileSimpleInfo />
        <ProfileSimpleInfo />
        <ProfileSimpleInfo />
      </div>
    </div>
  );
}
