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
          className="flex items-center justify-between border-b py-3"
          onClick={() => navigate("/my-page")}
        >
          {/* 유저 정보 */}
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

          {/* 팔로우 · 팔로잉 */}
          <div className="w-1/3 flex justify-center">
            <p className="bg-gray-100 inline-block px-4 py-1 rounded-lg font-medium">
              {debater.totalFollowers} followers · {debater.totalFollowees}{" "}
              following
            </p>
          </div>

          {/* 승 / 무 / 패 */}
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
