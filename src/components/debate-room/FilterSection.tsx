import refreshIcon from "../../assets/icons/refresh.svg";
import filterIcon from "../../assets/icons/filter.svg";
import categoryIcons from "../../assets/icons/category/categoryIcon";

type SingleFilterProps = {
  label: string;
  data: string[];
  state: string;
  onChange: (value: string) => void;
  isSingle: true;
};

type MultipleFilterProps = {
  label: string;
  data: string[];
  state: string[];
  onChange: (value: string[]) => void;
  isSingle: false;
};

type FilterProps = SingleFilterProps | MultipleFilterProps;

type FilterSectionProps = {
  filters: FilterProps[];
};

const FilterSection = ({ filters }: FilterSectionProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-2">
        <img src={filterIcon} alt="필터 아이콘" className="w-5 h-5" />
        <span className="text-gray-700 font-bold">필터</span>
      </div>

      {/* 필터 리스트 */}
      <div className="flex flex-col gap-3">
        {filters.map((filter, idx) => {
          const { label, data, isSingle } = filter;
          const onChangeSingle = (value: string) => {
            if (filter.isSingle) {
              filter.onChange(value);
            }
          };
          const onChangeMultiple = (value: string) => {
            if (!filter.isSingle) {
              const newState = filter.state.includes(value)
                ? filter.state.filter((c) => c !== value)
                : [...filter.state, value];
              filter.onChange(newState);
            }
          };

          return (
            <div key={idx} className="flex items-center w-full gap-6">
              <div className="flex items-center justify-between w-[120px] flex-shrink-0">
                <span className="text-gray-700 font-semibold">{label}</span>
                <button
                  onClick={() => {
                    if (isSingle) {
                      onChangeSingle(data[0]);
                    } else {
                      filter.onChange([]);
                    }
                  }}
                  className="text-gray-500 hover:text-black flex items-center justify-center w-7 h-7"
                >
                  <img
                    src={refreshIcon}
                    alt="새로고침 아이콘"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto md:overflow-visible scrollbar-hide">
                {data.map((item) => (
                  <button
                    key={item}
                    className={`px-3 py-1 rounded-full shadow-lg border flex items-center justify-center gap-1 whitespace-nowrap ${
                      (
                        isSingle
                          ? filter.state === item
                          : filter.state.includes(item)
                      )
                        ? "bg-blue03 text-white border-blue03"
                        : "bg-white border-blue03 text-gray-700"
                    }`}
                    onClick={() => {
                      if (isSingle) {
                        onChangeSingle(item);
                      } else {
                        onChangeMultiple(item);
                      }
                    }}
                  >
                    <span>{item}</span>
                    {categoryIcons[item] && (
                      <img
                        src={
                          (
                            isSingle
                              ? filter.state === item
                              : filter.state.includes(item)
                          )
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
