import refreshIcon from "../../assets/icons/refresh.svg";
import filterIcon from "../../assets/icons/filter.svg";
import categoryIcons from "../../assets/icons/category/categoryIcon";

type FilterProps = {
  label: string;
  data: string[];
  state: string; // 단일 선택
  onChange: (value: string) => void;
};

type FilterSectionProps = {
  filters: FilterProps[];
  onResetFilters: () => void; // 전체 필터 초기화 함수
};

const FilterSection = ({ filters, onResetFilters }: FilterSectionProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-2">
        <img src={filterIcon} alt="필터 아이콘" className="w-5 h-5" />
        <span className="text-gray-700 font-bold">필터</span>
        {/* 전체 리프레시 버튼 */}
        <button
          onClick={onResetFilters}
          className="ml-auto text-gray-500 hover:text-black flex items-center justify-center w-8 h-8"
        >
          <img src={refreshIcon} alt="새로고침 아이콘" className="w-6 h-6" />
        </button>
      </div>

      {/* 필터 리스트 */}
      <div className="flex flex-col gap-3">
        {filters.map((filter, idx) => {
          const { label, data, state, onChange } = filter;

          return (
            <div key={idx} className="flex items-center w-full gap-6">
              <div className="flex items-center justify-between w-[120px] flex-shrink-0">
                <span className="text-gray-700 font-semibold">{label}</span>
              </div>

              <div className="flex gap-2 overflow-x-auto md:overflow-visible scrollbar-hide">
                {data.map((item) => (
                  <button
                    key={item}
                    className={`px-3 py-1 rounded-full shadow-sm border flex items-center justify-center gap-1 whitespace-nowrap ${
                      state === item
                        ? "bg-blue03 text-white border-blue03"
                        : "bg-white border-blue03 text-gray-700"
                    }`}
                    onClick={() => onChange(state === item ? "" : item)} // 같은 걸 누르면 초기화
                  >
                    <span>{item}</span>
                    {categoryIcons[item] && (
                      <img
                        src={
                          state === item
                            ? categoryIcons[item].blue
                            : categoryIcons[item].gray
                        }
                        alt={`${item} 아이콘`}
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
