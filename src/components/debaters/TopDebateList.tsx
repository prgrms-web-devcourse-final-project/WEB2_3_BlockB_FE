import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import first from "../../assets/icons/1st.svg";
import second from "../../assets/icons/2nd.svg";
import three from "../../assets/icons/3rd.svg";
import Win from "../../assets/icons/win.svg";
import Draw from "../../assets/icons/duse.svg";
import Lose from "../../assets/icons/lose.svg";
import { DebaterType } from "../../types/debateType";
import TopDebateListSkeleton from "../common/skeleton/debate/TopDebateListSkeleton";

interface TopDebateListProps {
  topDebaters: DebaterType[];
}

export default function TopDebateList({ topDebaters }: TopDebateListProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <TopDebateListSkeleton />;

  return (
    <div>
      <h2 className="text-center text-xl font-bold mt-[14px] mb-4">
        Top debaters
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        onClick={() => navigate("/my-page")}
      >
        {topDebaters.map((debater, index) => {
          const rankIcons = [first, second, three];
          const rankIcon = rankIcons[index] || null;

          return (
            <div
              key={debater.userId}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-xl text-center"
            >
              <div className="relative inline-block">
                <img
                  src={debater.profile}
                  alt="profile"
                  className="rounded-full w-20 h-20 mx-auto"
                />
                {rankIcon && (
                  <img
                    src={rankIcon}
                    alt={`${index + 1}등`}
                    className="absolute -bottom-2 right-0 w-6 h-6"
                  />
                )}
              </div>

              <p className="font-semibold text-[14px] mt-2">
                {debater.nickname}
              </p>
              <p className="text-gray-500 text-sm">{debater.introduction}</p>
              <p className="bg-gray-100 inline-block px-4 py-1 rounded-lg font-medium mt-6 mb-10">
                {debater.totalFollowers} followers · {debater.totalFollowees}{" "}
                following
              </p>
              <div className="flex w-full justify-between items-center mt-3">
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
                  <span className="text-lg font-semibold">
                    {debater.losses}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
