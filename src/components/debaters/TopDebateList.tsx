import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import first from "../../assets/icons/1st.svg";
import second from "../../assets/icons/2nd.svg";
import three from "../../assets/icons/3rd.svg";
import Win from "../../assets/icons/win.svg";
import Draw from "../../assets/icons/duse.svg";
import Lose from "../../assets/icons/lose.svg";
import TopDebateListSkeleton from "../common/skeleton/debate/TopDebateListSkeleton";

interface TopDebateListProps {
  topDebaters: DebaterType[];
}

export default function TopDebateList({ topDebaters }: TopDebateListProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) return <TopDebateListSkeleton />;

  return (
    <div>
      <h2 className="text-center text-xl font-bold mt-[14px] mb-4">
        Top debaters
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
      >
        {topDebaters.map((debater, index) => {
          const rankIcons = [first, second, three];
          const rankIcon = rankIcons[index] || null;

          return (
            <Link
              to={`/user-page/${debater.userId}`}
              key={debater.userId}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-xl text-center hover:bg-gray02 transform transition duration-200 hover:scale-[1.04]"
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
              <div className="flex flex-col h-10">
                <p className="font-semibold text-[14px] mt-2">
                  {debater.nickname}
                </p>
                <p className="text-gray-500 text-sm">{debater.introduction}</p>
              </div>
              <p className="bg-gray-100 inline-block px-4 py-1 rounded-lg font-medium mt-6 mb-10 h-[56px]">
                {debater.totalFollowers} followers · {debater.totalFollowees}{" "}
                following
              </p>
              <div className="flex w-full justify-between items-center mt-3">
                  <img src={Win} alt="승리 아이콘" className="w-6 h-6" />
                  <span className="text-lg font-semibold">{debater.wins}</span>
                  <img src={Draw} alt="무승부 아이콘" className="w-6 h-6" />
                  <span className="text-lg font-semibold">{debater.draws}</span>
                  <img src={Lose} alt="패배 아이콘" className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    {debater.losses}
                  </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
