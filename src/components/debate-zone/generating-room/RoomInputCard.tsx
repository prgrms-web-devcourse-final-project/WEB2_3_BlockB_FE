import { useState } from "react";

export default function RoomInputCard({
  label,
  key,
  setCheckedStates,
}: {
  label: string;
  key: string;
  setCheckedStates: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  const [text, setText] = useState("");

  // 텍스트가 비지 않으면 상태를 업데이트
  const updateProgress = () => {
    if (text.length > 0) {
      setCheckedStates((prev) => ({
        ...prev,
        [key]: true,
      }));
    }
  };

  return (
    <div className="text-white w-full">
      <div className="flex">
        <label className="w-[90px] h-[22px] font-bold text-[16px]">
          {label}
        </label>
        <input
          type="text"
          className="appearance-none border-none bg-transparent outline-none focus:ring-0 w-full text-[14px]"
          maxLength={30}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // 텍스트 길이가 0보다 크면 progress 업데이트
            if (e.target.value.length > 0) {
              updateProgress();
            }
          }}
        />
      </div>
      <hr className="border border-white mt-[10px] rounded-md" />
      <div className="flex justify-end text-[10px] mt-[2px]">
        <p>
          <span>{text.length}</span>
          <span>/30</span>
        </p>
      </div>
    </div>
  );
}
