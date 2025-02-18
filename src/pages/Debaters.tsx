import { useState, useEffect } from "react";
import search from "../assets/icons/search.svg";
import { DebaterType } from "../types/debateType";
import DebateList from "../components/debaters/DebateList";
import TopDebateList from "../components/debaters/TopDebateList";

export default function Debaters() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDebaters, setFilteredDebaters] = useState<DebaterType[]>([]);

  // 더미 데이터 (나중에 API 연동 시 대체)
  const debaters: DebaterType[] = [
    {
      userId: 12,
      nickname: "기도차",
      profile:
        "https://cdn.pixabay.com/photo/2021/05/09/06/07/dog-6240043_1280.jpg",
      introduction: "유저설명",
      totalFollowers: 1500,
      totalFollowees: 145,
      wins: 71,
      draws: 13,
      losses: 5,
    },
    {
      userId: 34,
      nickname: "도차기",
      profile:
        "https://cdn.pixabay.com/photo/2021/05/09/06/07/dog-6240043_1280.jpg",
      introduction: "유저설명",
      totalFollowers: 1498,
      totalFollowees: 145,
      wins: 65,
      draws: 23,
      losses: 14,
    },
    {
      userId: 56,
      nickname: "분노왕왕",
      profile:
        "https://cdn.pixabay.com/photo/2021/05/09/06/07/dog-6240043_1280.jpg",
      introduction: "유저설명",
      totalFollowers: 1400,
      totalFollowees: 140,
      wins: 60,
      draws: 20,
      losses: 10,
    },
    {
      userId: 54,
      nickname: "분노왕왕1",
      profile:
        "https://cdn.pixabay.com/photo/2021/05/09/06/07/dog-6240043_1280.jpg",
      introduction: "유저설명",
      totalFollowers: 1400,
      totalFollowees: 140,
      wins: 60,
      draws: 20,
      losses: 10,
    },
    {
      userId: 54,
      nickname: "우우우",
      profile:
        "https://cdn.pixabay.com/photo/2021/05/09/06/07/dog-6240043_1280.jpg",
      introduction: "유저설명",
      totalFollowers: 1400,
      totalFollowees: 140,
      wins: 60,
      draws: 20,
      losses: 10,
    },
  ];

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDebaters([]);
    } else {
      setFilteredDebaters(
        debaters.filter((debater) =>
          debater.nickname.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);
  // 상위 3명과 나머지 유저 분리
  const topDebaters: DebaterType[] = debaters.slice(0, 3);
  const otherDebaters: DebaterType[] = debaters.slice(3);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="relative mt-3 w-full">
        <input
          type="text"
          className="border rounded-lg px-2 py-2 w-full pl-3 pr-10"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={search}
          alt="검색 아이콘"
          className="absolute right-3 top-3 w-5 h-5"
        />
      </div>

      {searchTerm ? (
        <DebateList debaters={filteredDebaters} />
      ) : (
        <>
          <TopDebateList topDebaters={topDebaters} />
          <DebateList debaters={otherDebaters} />
        </>
      )}
    </div>
  );
}
