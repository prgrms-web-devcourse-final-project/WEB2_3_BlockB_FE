import sortIcon from "../assets/icons/sort.svg";

type SortSectionProps = {
  sortOptions: string[];
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
};

const SortSection = ({
  sortOptions,
  selectedSort,
  setSelectedSort,
}: SortSectionProps) => {
  return (
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
  );
};

export default SortSection;
