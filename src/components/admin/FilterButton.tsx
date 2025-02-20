import afterCheck from "../../assets/icons/after-check.svg";

import beforeCheck from "../../assets/icons/before-check.svg";
export default function FilterButton({
  label,
  value,
  selected,
  onClick,
  width,
}: {
  label: string;
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
  width: string;
}) {
  return (
    <button
      onClick={() => {
        onClick(value);
      }}
      className={
        `${
          selected
            ? "border-blue01 shadow-[0px_1px_5px_0px_theme(colors.blue02)]"
            : "border-gray03"
        } border border-solid rounded-[30px] h-[30px] bg-white ` + width
      }
    >
      <div className="flex justify-center">
        <p>{label}</p>
        {selected ? (
          <img src={afterCheck} alt="체크후" className="w-5 h-5 ml-2" />
        ) : (
          <img src={beforeCheck} alt="체크전" className="w-5 h-5 ml-2" />
        )}
      </div>
    </button>
  );
}
