import { useNavigate } from "react-router";
import speechBubble from "../../assets/icons/speechBubble.svg";

export type ActiveFilter = "참여가능" | "종료";

export default function ActiveFilterSection({
  selectedActive,
  setSelectedActive,
}: {
  selectedActive: ActiveFilter;
  setSelectedActive: (val: ActiveFilter) => void;
}) {
  const activeFilters: ActiveFilter[] = ["참여가능", "종료"];
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {activeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedActive(filter)}
            className={
              selectedActive === filter
                ? "bg-blue03 text-white px-3 py-1 rounded-full"
                : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            }
          >
            {filter}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate(`/debate-zone/new-debate`)}
        className="flex items-center justify-center px-2 py-2 text-white rounded-md md:w-auto bg-blue-950"
      >
        토론방 개설
        <span className="ml-2">
          <img src={speechBubble} alt="말풍선" className="w-5 h-5 mx-1" />
        </span>
      </button>
    </div>
  );
}
