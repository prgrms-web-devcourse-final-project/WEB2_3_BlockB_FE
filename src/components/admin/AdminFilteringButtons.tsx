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

  const isUnprocessed = tab === "미처리";
  const filters = isUnprocessed ? unprocessedFilters : processedFilters;
  const selectedFilter = isUnprocessed ? selectedReasonFilter : selectedResultFilter;
  const setSelectedFilter = isUnprocessed ? setSelectedReasonFilter : setSelectedResultFilter;
  const containerWidth = isUnprocessed ? "w-[814px]" : "w-[375px]";
  const labelText = isUnprocessed ? "신고 사유" : "처리 옵션";

  return (
    <div className="flex items-center">
      <p className="text-[14px] md:text-[16px] h-5 text-gray01 mr-6 whitespace-nowrap">
        {labelText}
      </p>
      <div className={`${containerWidth} h-[40px] flex justify-between text-[14px] overflow-x-auto`}>
        {filters.map((filter) => (
          <FilterButton
            key={filter.value}
            label={filter.label}
            value={filter.value}
            selected={selectedFilter === filter.value}
            setFilter={setSelectedFilter}
            width={filter.width}
          />
        ))}
      </div>
    </div>
  );
}
