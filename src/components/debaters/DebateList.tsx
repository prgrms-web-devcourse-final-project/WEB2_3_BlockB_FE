import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Win from "../../assets/icons/win.svg";
import Draw from "../../assets/icons/duse.svg";
import Lose from "../../assets/icons/lose.svg";
import { DebaterType } from "../../types/debateType";
import DebateListSkeleton from "../common/skeleton/debate/DebateListSkeleton";

interface DebateListProps {
  debaters: DebaterType[];
}

export default function DebateList({ debaters }: DebateListProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <DebateListSkeleton />;

  return (
    <div>
      {debaters.map((debater) => (
        <div
          key={debater.userId}
          className="border-b py-3 md:px-4 sm:px-0 w-full md:hidden"
          onClick={() => navigate("/my-page")}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-1/3">
              <img
                src={debater.profile}
                alt="profile"
                className="rounded-full w-12 h-12"
              />
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm sm:text-base">
                    {debater.nickname}
                  </p>
                  <p className="px-3 py-1 rounded-lg font-medium text-[8px] sm:text-sm">
                    {debater.totalFollowers} followers ·{" "}
                    {debater.totalFollowees} following
                  </p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-500 text-[10px] sm:text-sm">
                    {debater.introduction}
                  </p>
                  <div className="flex gap-3 sm:gap-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={Win}
                        alt="승리 아이콘"
                        className="w-3 sm:w-6 h-3 sm:h-6"
                      />
                      <span className="text-[10px] sm:text-lg font-semibold">
                        {debater.wins}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={Draw}
                        alt="무승부 아이콘"
                        className="w-3 sm:w-6 h-3 sm:h-6"
                      />
                      <span className="text-[10px] sm:text-lg font-semibold">
                        {debater.draws}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={Lose}
                        alt="패배 아이콘"
                        className="w-3 sm:w-6 h-3 sm:h-6"
                      />
                      <span className="text-[10px] sm:text-lg font-semibold">
                        {debater.losses}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {debaters.map((debater) => (
        <div
          key={debater.userId}
          className="hidden md:flex items-center justify-between border-b py-3"
          onClick={() => navigate("/my-page")}
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
        </div>
      ))}
    </div>
  );
}
