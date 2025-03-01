import { useState } from "react";
import DebateRoomList from "../components/debate-room/DebateRoomList";
import searchIcon from "../assets/icons/search.svg";
import sortIcon from "../assets/icons/sort.svg";
import FilterSection from "../components/debate-room/FilterSection";

const activeFilters = ["참여가능", "참관가능", "종료"];
const continents = ["아프리카", "남미", "아시아", "유럽", "오세아니아"];
const categories = [
  "정치",
  "경제",
  "사회",
  "문화/생활",
  "연예",
  "스포츠",
  "IT/과학",
  "칼럼",
];
const participantTypes = ["1:1", "3:3"];
const sortOptions = ["임박순", "최신순", "인기순"];

export default function DebateRooms() {
  const [selectedActive, setSelectedActive] = useState<string>(
    activeFilters[0]
  );
  const [selectedContinent, setSelectedContinent] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<string>(
    participantTypes[0]
  );
  const [selectedSort, setSelectedSort] = useState<string>(sortOptions[0]);

  return (
    <div className="w-full max-w-7xl font-pretendard text-[16px] mx-auto p-6">
      {/* 필터 */}
      <FilterSection
        filters={[
          {
            label: "활성 여부",
            data: activeFilters,
            state: selectedActive,
            onChange: setSelectedActive,
            isSingle: true,
          },
          {
            label: "대륙",
            data: continents,
            state: selectedContinent,
            onChange: setSelectedContinent,
            isSingle: false,
          },
          {
            label: "카테고리",
            data: categories,
            state: selectedCategory,
            onChange: setSelectedCategory,
            isSingle: false,
          },
          {
            label: "참가 인원",
            data: participantTypes,
            state: selectedParticipant,
            onChange: setSelectedParticipant,
            isSingle: true,
          },
        ]}
      />

      {/* 정렬 */}
      <div className="flex gap-8 mt-4">
        <div className="flex items-center gap-2">
          <img src={sortIcon} alt="정렬 아이콘" className="w-5 h-5" />
          <span className="text-gray-700 font-semibold">정렬</span>
        </div>
        <div className="flex gap-4">
          {sortOptions.map((sort) => (
            <button
              key={sort}
              className={`font-medium ${
                selectedSort === sort
                  ? "text-blue02 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setSelectedSort(sort)}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* 검색창 */}
      <div className="relative mt-3 w-full mb-6 flex items-center">
        <input
          type="text"
          className="border rounded-xl px-4 py-2 w-full pl-3 pr-10 focus:outline-none"
          placeholder="찾으시는 토론방 키워드를 검색하세요"
        />
        <img
          src={searchIcon}
          alt="검색 아이콘"
          className="absolute right-3 top-3 w-5 h-5 text-gray-500"
        />
      </div>

      {/* 토론방 리스트 컴포넌트 */}
      <DebateRoomList />
    </div>
  );
}
