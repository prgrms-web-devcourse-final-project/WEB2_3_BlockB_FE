import { useEffect, useState } from "react";

export default function RoomInputCard({
  label,
  fieldKey, // key 대신 다른 이름 사용
  setCheckedStates,
}: {
  label: string;
  fieldKey: string; // key 대신 다른 이름 사용
  setCheckedStates: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    setCheckedStates((prev) => ({
      ...prev,
      [fieldKey]: text.length > 0, // text가 비어 있으면 false 처리
    }));
  }, [text, fieldKey, setCheckedStates]);

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
          onChange={(e) => setText(e.target.value)}
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
