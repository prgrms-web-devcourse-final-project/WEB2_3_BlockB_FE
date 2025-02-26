import { processedFilters, unprocessedFilters } from "../../constants";
import FilterButton from "./FilterButton";

export default function AdminFilteringButtons({
  tab,
  selectedReasonFilter,
  setSelectedReasonFilter,
  selectedResultFilter,
  setSelectedResultFilter,
}: {
  tab: AdminTab;
  selectedReasonFilter: string;
  setSelectedReasonFilter: (reason: string) => void;
  selectedResultFilter: string;
  setSelectedResultFilter: (result: string) => void;
}) {
  return (
    <div className="flex items-center">
      <p className="text-[14px] md:text-[16px] h-5 text-gray01 mr-6 whitespace-nowrap">
        {tab === "미처리" ? "신고 사유" : "처리 옵션"}
      </p>
      <div
        className={`${
          tab === "미처리" ? "w-[814px]" : "w-[375px]"
        } h-[40px] flex justify-between text-[14px] overflow-x-auto`}
      >
        {tab === "미처리"
          ? unprocessedFilters.map((filter) => (
              <FilterButton
                key={filter.value}
                label={filter.label}
                value={filter.value}
                selected={selectedReasonFilter === filter.value}
                setFilter={setSelectedReasonFilter}
                width={filter.width}
              />
            ))
          : processedFilters.map((filter) => (
              <FilterButton
                key={filter.value}
                label={filter.label}
                value={filter.value}
                selected={selectedResultFilter === filter.value}
                setFilter={setSelectedResultFilter}
                width={filter.width}
              />
            ))}
      </div>
    </div>
  );
}
