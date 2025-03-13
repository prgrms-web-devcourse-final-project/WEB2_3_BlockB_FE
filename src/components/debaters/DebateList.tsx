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
    <div className="flex flex-col gap-2">
      {debaters.map((debater) => (
        <Link
          to={`/user-page/${debater.userId}`}
          key={debater.userId}
          className="border-b py-3 md:px-4 sm:px-0 w-full rounded-[5px]  hover:bg-gray02 transform transition duration-200 hover:scale-[1.02]"
        >
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex justify-between w-full md:w-2/3">
              <div className="flex items-center">
                <img
                  src={debater.profile}
                  alt="profile"
                  className="w-12 h-12 mr-6 rounded-full"
                />
                <p className="font-semibold md:text-sm text-[12px]">
                  {debater.nickname}
                </p>
              </div>
              <div className="flex justify-between items-center md:text-[16px] text-[12px]">
                <p className="font-medium rounded-lg">
                  {debater.totalFollowers} followers · {debater.totalFollowees}{" "}
                  following
                </p>
              </div>
            </div>
            <div className="md:w-auto w-full flex justify-end md:text-[16px] text-[14px]">
              <div className="flex gap-3 sm:gap-6">
                <div className="flex items-center w-16 gap-2 sm:gap-3">
                  <img
                    src={Win}
                    alt="승리 아이콘"
                    className="w-4 h-4 md:w-6 md:h-6 "
                  />
                  <span className="font-semibold">{debater.wins}</span>
                </div>
                <div className="flex items-center w-16 gap-2 sm:gap-3">
                  <img
                    src={Draw}
                    alt="무승부 아이콘"
                    className="w-4 h-4 md:w-6 md:h-6"
                  />
                  <span className="font-semibold">{debater.draws}</span>
                </div>
                <div className="flex items-center w-16 gap-2 sm:gap-3">
                  <img
                    src={Lose}
                    alt="패배 아이콘"
                    className="w-4 h-4 md:w-6 md:h-6"
                  />
                  <span className="font-semibold">{debater.losses}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
