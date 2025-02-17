import checked from "../../../assets/icons/checked1.svg";

export default function CheckBoxGroup({
  label,
  checklists,
  specialIcon,
  onCheck,
}: {
  label: string;
  checklists: ChecklistItem[];
  specialIcon?: boolean;
  onCheck: (key: string) => void;
}) {
  return (
    <section className="w-full flex font-bold items-center">
      <p className="text-white w-[66px] h-auto text-[16px] mr-[10px]">
        {label}
      </p>
      <div className="w-auto h-auto flex gap-[9px] text-[14px]">
        {checklists.map((item) => (
          <div
            key={item.key}
            className={`flex gap-2 items-center px-[10px] py-[5px] bg-white bg-opacity-70 rounded-[30px] border ${
              item.isChecked ? "border-blue-500" : "border-white"
            } cursor-pointer`}
            onClick={() => onCheck(item.key)} // 클릭 시 해당 key 전달
          >
            <p className="h-[18px]">{item.key}</p>
            {item.isChecked && (
              <button className="flex items-center">
                <img
                  src={specialIcon ? "" : checked}
                  alt={`${item.key} 체크됨`}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
