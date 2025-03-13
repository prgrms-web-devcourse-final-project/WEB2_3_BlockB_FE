import { useState } from "react";
import categoryIcons from "../../assets/icons/category/categoryIcon";
import { useNavigate } from "react-router";

const categoryMap: Record<string, string> = {
  PO: "정치",
  EC: "경제",
  SO: "사회",
  CU: "문화",
  EN: "연예",
  SP: "스포츠",
  IT: "IT",
  CO: "칼럼",
  ETC: "기타",
};

export default function DebateSimpleInfo({
  index,
  title,
  speakCountType,
  timeType,
  memberNumberType,
  categoryType,
  roomId,
}: {
  index: number;
  title: string;
  speakCountType: number;
  timeType: number;
  memberNumberType: number;
  categoryType: string;
  roomId: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const order = index === 1 ? "TOP" : `${index}th`;
  const totalSeconds = speakCountType * timeType * 2;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes > 0 ? `${minutes}분` : ""} ${
    seconds > 0 ? `${seconds}초` : ""
  }`.trim();

  const categoryName = categoryMap[categoryType] || "기타";

  const categoryIcon = isHovered
    ? categoryIcons[categoryName]?.["blue"]
    : categoryIcons[categoryName]?.["gray"];

  const navigate = useNavigate();
  return (
    <div
      className="flex max-lg:justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full max-lg:w-[768px] max-md:w-80 h-[77px] flex items-center rounded-[10px] hover:bg-gray02 transform transition duration-200 hover:scale-[1.02]"
        onClick={() => navigate(`/observing-zone/${roomId}`)}
      >
        <div className="flex items-center w-full px-2">
          <p className="text-center w-[60px] max-md:text-[14px] font-bold">
            {order}
          </p>

          <img
            src={categoryIcon}
            alt="카테고리 아이콘"
            className="mx-2 mr-5 transition duration-200 w-9 h-9 max-md:hidden"
          />

          <p className=" font-pretendard text-[18px] max-md:text-[12px] font-bold  max-md:w-32  break-words ">
            {title}
          </p>
        </div>

        <div className="flex justify-between items-center w-60 font-pretendard text-[18px] max-md:text-[10px]">
          <p className="flex justify-center items-center font-semibold rounded-[10px] bg-[#D9D9D9] w-[100px] h-8 max-md:h-4 max-md:mr-3 max-md:w-14 max-md:text-[10px]">
            {formattedTime}
          </p>

          <p className="flex justify-center items-center font-semibold rounded-[10px] bg-[#D9D9D9] w-12 h-8 max-md:h-4 ">
            {memberNumberType}:{memberNumberType}
          </p>
        </div>
      </div>
    </div>
  );
}
