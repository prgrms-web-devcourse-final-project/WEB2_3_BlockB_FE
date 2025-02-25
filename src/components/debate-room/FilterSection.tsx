import refreshIcon from "../../assets/icons/refresh.svg";
import filterIcon from "../../assets/icons/filter.svg";
import categoryIcons from "../../assets/icons/category/categoryIcon";

type FilterProps<T> = {
  label: string;
  data: string[];
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  isSingle: boolean;
};

type FilterSectionProps = {
  filters: Array<FilterProps<string> | FilterProps<string[]>>;
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
        {filters.map(({ label, data, state, setState, isSingle }, idx) => (
          <div key={idx} className="flex items-center w-full gap-6">
            <div className="flex items-center justify-between w-[120px] flex-shrink-0">
              <span className="text-gray-700 font-semibold">{label}</span>
              <button
                onClick={() => {
                  if (isSingle) {
                    (setState as React.Dispatch<React.SetStateAction<string>>)(
                      data[0]
                    );
                  } else {
                    (
                      setState as React.Dispatch<React.SetStateAction<string[]>>
                    )([]);
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
                      Array.isArray(state)
                        ? state.includes(item)
                        : state === item
                    )
                      ? "bg-blue03 text-white border-blue03"
                      : "bg-white border-blue03 text-gray-700"
                  }`}
                  onClick={() => {
                    if (isSingle) {
                      (
                        setState as React.Dispatch<React.SetStateAction<string>>
                      )(item);
                    } else {
                      (
                        setState as React.Dispatch<
                          React.SetStateAction<string[]>
                        >
                      )((prev: string[]) =>
                        prev.includes(item)
                          ? prev.filter((c) => c !== item)
                          : [...prev, item]
                      );
                    }
                  }}
                >
                  <span>{item}</span>
                  {categoryIcons[item] && (
                    <img
                      src={
                        (
                          Array.isArray(state)
                            ? state.includes(item)
                            : state === item
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
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
