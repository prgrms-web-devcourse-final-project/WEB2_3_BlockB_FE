import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Win from "../../assets/icons/win.svg";
import Draw from "../../assets/icons/duse.svg";
import Lose from "../../assets/icons/lose.svg";
import DebateListSkeleton from "../common/skeleton/debate/DebateListSkeleton";

interface DebateListProps {
  debaters: DebaterType[];
}

export default function DebateList({ debaters }: DebateListProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) return <DebateListSkeleton />;

  return (
    <div>
      {debaters.map((debater) => (
        <Link to={`/user-page/${debater.userId}`}
          key={debater.userId}
          className="border-b py-3 md:px-4 sm:px-0 w-full"
        > 
          <div className="flex md:flex-row flex-col justify-between">
            <div className="flex justify-between md:w-2/3 w-full">
              <div className="flex items-center">
                <img
                  src={debater.profile}
                  alt="profile"
                  className="rounded-full w-12 h-12 mr-6"
                />
                <div className="flex flex-col  md:max-w-100 sm:max-w-80 max-w-60">
                  <p className="font-semibold md:text-sm text-[12px]">
                      {debater.nickname}
                  </p>
                  {debater.introduction && <p className="text-gray-500 text-[14px] sm:text-sm w-10 break-word white-space">
                      {debater.introduction}
                  </p>}
                </div>
              </div>
              <div className="flex justify-between items-center md:text-[16px] text-[14px]">
                <p className="rounded-lg font-medium">
                  {debater.totalFollowers} followers ·{" "}
                  {debater.totalFollowees} following
                </p>
              </div>
            </div>
            <div className="md:w-auto w-full flex justify-end md:text-[16px] text-[14px]">
              <div className="flex gap-3 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={Win}
                    alt="승리 아이콘"
                    className="md:w-6 md:h-6 w-4 h-4 "
                  />
                  <span className="font-semibold">
                    {debater.wins}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={Draw}
                    alt="무승부 아이콘"
                    className="md:w-6 md:h-6 w-4 h-4"
                  />
                  <span className="font-semibold">
                    {debater.draws}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={Lose}
                    alt="패배 아이콘"
                    className="md:w-6 md:h-6 w-4 h-4"
                  />
                  <span className="font-semibold">
                    {debater.losses}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {/* {debaters.map((debater) => (
        <Link
          to={`/user-page/${debater.userId}`}
          key={debater.userId}
          className="hidden md:flex items-center justify-between border-b py-3"
        >
          <div className="flex items-center gap-4 w-1/3">
            <img
              src={debater.profile}
              alt="profile"
              className="rounded-full w-12 h-12"
            />
            <div>
              <p className="font-semibold">{debater.nickname}</p>
              <p className="text-gray-500 text-sm">{debater.introduction}</p>
            </div>
          </div>
          <div className="w-1/3 flex justify-center">
            <p className=" inline-block px-4 py-1 rounded-lg  font-medium">
              {debater.totalFollowers} followers · {debater.totalFollowees}{" "}
              following
            </p>
          </div>
          <div className="w-1/3 flex justify-end gap-6">
            <div className="flex items-center gap-x-[22px]">
              <img src={Win} alt="승리 아이콘" className="w-6 h-6" />
              <span className="text-lg font-semibold">{debater.wins}</span>
            </div>
            <div className="flex items-center gap-x-[22px]">
              <img src={Draw} alt="무승부 아이콘" className="w-6 h-6" />
              <span className="text-lg font-semibold">{debater.draws}</span>
            </div>
            <div className="flex items-center gap-x-[22px]">
              <img src={Lose} alt="패배 아이콘" className="w-6 h-6" />
              <span className="text-lg font-semibold">{debater.losses}</span>
            </div>
          </div>
        </Link>
      ))} */}
    </div>
  );
}
