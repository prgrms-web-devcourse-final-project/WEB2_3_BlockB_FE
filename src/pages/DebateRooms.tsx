import { useState } from "react";
import DebateRoomList from "../components/debate-room/DebateRoomList";
import searchIcon from "../assets/icons/search.svg";
import refreshIcon from "../assets/icons/refresh.svg";
import filterIcon from "../assets/icons/filter.svg";
import sortIcon from "../assets/icons/sort.svg";
import categoryIcons from "../assets/icons/category/categoryIcon";

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
  const [selectedActive, setSelectedActive] = useState("참여가능");
  const [selectedContinent, setSelectedContinent] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState(["1:1"]);
  const [selectedSort, setSelectedSort] = useState("임박순");

  return (
    <div className="w-full max-w-7xl font-pretendard text-[16px] mx-auto p-6">
      {/* 필터 및 정렬 섹션 */}
      <div className="mb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex gap-8">
            <div className="flex items-start gap-2">
              <img src={filterIcon} alt="필터 아이콘" className=" w-5 h-5 " />
              <span className="text-gray-700 font-bold">필터</span>
            </div>
            <div className="flex flex-col gap-4">
              {/* 활성 여부 필터 */}
              <div className="flex gap-4">
                <span className="w-24 text-gray-700 font-semibold">
                  활성 여부
                </span>
                <button
                  onClick={() => setSelectedActive("참여가능")}
                  className="text-gary01 hover:text-black"
                >
                  <img
                    src={refreshIcon}
                    alt="새로고침 아이콘"
                    className=" w-5 h-5 "
                  />
                </button>
                <div className="flex gap-2">
                  {activeFilters.map((filter) => (
                    <button
                      key={filter}
                      className={`px-3 py-1 rounded-full border flex items-center gap-1 ${
                        selectedActive === filter
                          ? "bg-[#002b60] text-white border-[#002b60]"
                          : "bg-white border-[#002b60]  text-gray-700"
                      }`}
                      onClick={() => setSelectedActive(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              {/* 대륙 필터 */}
              <div className="flex gap-4">
                <span className="w-24 text-gray-700 font-semibold">대륙</span>
                <button
                  onClick={() => setSelectedContinent([])}
                  className="text-gray-500 hover:text-black"
                >
                  <img
                    src={refreshIcon}
                    alt="새로고침 아이콘"
                    className=" w-5 h-5 "
                  />
                </button>
                <div className="flex flex-wrap gap-2">
                  {continents.map((continent) => (
                    <button
                      key={continent}
                      className={`px-3 py-1 rounded-full shadow-lg border flex items-center gap-1 ${
                        selectedContinent.includes(continent)
                          ? "bg-[#002b60] text-white border-[#002b60]"
                          : "bg-white border-[#002b60]  text-gray-700"
                      }`}
                      onClick={() =>
                        setSelectedContinent((prev) =>
                          prev.includes(continent)
                            ? prev.filter((c) => c !== continent)
                            : [...prev, continent]
                        )
                      }
                    >
                      {continent}
                    </button>
                  ))}
                </div>
              </div>
              {/* 카테고리 필터 */}
              <div className="flex gap-4">
                <span className="w-24 text-gray-700 font-semibold">
                  카테고리
                </span>
                <button
                  onClick={() => setSelectedCategory([])}
                  className="text-gray-500 hover:text-black"
                >
                  <img
                    src={refreshIcon}
                    alt="새로고침 아이콘"
                    className=" w-5 h-5 "
                  />
                </button>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isSelected = selectedCategory.includes(category);
                    return (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full border flex items-center gap-2 ${
                          isSelected
                            ? "bg-[#002b60] text-white border-[#002b60]"
                            : "bg-white border-[#002b60] text-gray-700"
                        }`}
                        onClick={() =>
                          setSelectedCategory((prev) =>
                            isSelected
                              ? prev.filter((c) => c !== category)
                              : [...prev, category]
                          )
                        }
                      >
                        <span>{category}</span>
                        {categoryIcons[category] && (
                          <img
                            src={
                              isSelected
                                ? categoryIcons[category].blue
                                : categoryIcons[category].gray
                            }
                            alt={`${category} 아이콘`}
                            className="w-5 h-5"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* 참가 인원 필터 */}
              <div className="flex gap-4">
                <span className="w-24 text-gray-700 font-semibold">
                  참가 인원
                </span>{" "}
                <button
                  onClick={() => setSelectedParticipant(["1:1"])}
                  className="text-gray-500 hover:text-black"
                >
                  <img
                    src={refreshIcon}
                    alt="새로고침 아이콘"
                    className=" w-5 h-5 "
                  />
                </button>
                <div className="flex gap-2">
                  {participantTypes.map((type) => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-full border flex items-center gap-1 ${
                        selectedParticipant.includes(type)
                          ? "bg-[#002b60] text-white border-[#002b60]"
                          : "bg-white border-[#002b60]  text-gray-700"
                      }`}
                      onClick={() => setSelectedParticipant([type])}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 정렬 섹션 */}
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <img src={sortIcon} alt="필터 아이콘" className=" w-5 h-5 " />
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
        </div>
      </div>

      {/* 검색창 */}
      <div className="relative mt-3 w-full mb-6 flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            className="border rounded-xl px-4 py-2 w-full pl-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="찾으시는 토론방 키워드를 검색하세요"
          />
          <img
            src={searchIcon}
            alt="검색 아이콘"
            className="absolute right-3 top-3 w-5 h-5 text-gray-500"
          />
        </div>

        <button className="ml-3 px-4 py-2 text-white bg-blue03 border font-extrabold  border-gray-300 rounded-xl hover:bg-[#0044aa] ">
          개설
        </button>
      </div>

      {/* 토론방 리스트 컴포넌트 */}
      <DebateRoomList />
    </div>
  );
}
