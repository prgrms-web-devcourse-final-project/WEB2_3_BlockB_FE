import afterCheck from "../../assets/icons/after-check.svg";

import beforeCheck from "../../assets/icons/before-check.svg";
export default function FilterButton({
  label,
  value,
  selected,
  setFilter,
  width,
  setReason,
  type="filtering"
}: {
  label: string;
  value: string;
  selected: boolean;
  setFilter?: (value: string) => void;
  width: string;
  setReason?: (value: string) => void;
  type?: "filtering" | "selectReason"
}) {

  const onClickBtn = () => {
    if(type === "filtering") setFilter!(value)
    if(type === "selectReason") setReason!(value)
  }

  return (
    <button
      onClick={onClickBtn}
      className={
        `${
          selected
            ? "border-blue01 shadow-[0px_1px_5px_0px_theme(colors.blue02)]"
            : "border-gray03 bg-white text-gray-700"
        } border border-solid rounded-full h-[35px] px-4 mr-2 min-w-[70px] flex-shrink-0 flex items-center justify-center whitespace-nowrap ` +
        width
      }
    >
      <p className="text-sm">{label}</p>
      {selected ? (
        <img src={afterCheck} alt="체크후" className="w-5 h-5 ml-2" />
      ) : (
        <img src={beforeCheck} alt="체크전" className="w-5 h-5 ml-2" />
      )}
    </button>
  );
}
