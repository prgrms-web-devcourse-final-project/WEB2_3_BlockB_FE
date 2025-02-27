import { useState, useEffect } from "react";
import search from "../assets/icons/search.svg";
import { DebaterType } from "../types/debateType";
import DebateList from "../components/debaters/DebateList";
import TopDebateList from "../components/debaters/TopDebateList";
import useDebounce from "../hooks/useDebounce";
import { debatesAPI } from "../api/debates";
import SearchResultNone from "../components/debaters/SearchResultNone";

export default function Debaters() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [debaters, setDebaters] = useState<DebaterType[]>([]);

  const fetchDebaters = async (query: string = "") => {
    try {
      const data = await debatesAPI.getTopDebaters(query);
      setDebaters(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDebaters(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="p-6 max-w-6xl mx-auto font-pretendard">
      <div className="relative mt-3 w-full">
        <input
          type="text"
          className="border rounded-lg px-2 py-2 w-full pl-3 pr-10 focus:outline-none"
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

      {debaters.length === 0 ? (
        <SearchResultNone searchTerm={searchTerm} />
      ) : searchTerm ? (
        <DebateList debaters={debaters} />
      ) : (
        <>
          <TopDebateList topDebaters={debaters.slice(0, 3)} />
          <DebateList debaters={debaters.slice(3)} />
        </>
      )}
    </div>
  );
}
