import column from "../../assets/icons/column.svg";

export default function DebateSimpleInfo({ index }: { index: number }) {
  let order;
  switch (index) {
    case 1:
      order = "TOP";
      break;
    case 2:
      order = "2nd";
      break;
    case 3:
      order = "3rd";
      break;
    case 4:
      order = "4th";
      break;
    case 5:
      order = "5th";
      break;
    case 6:
      order = "6th";
      break;
    case 7:
      order = "7th";
      break;
    case 8:
      order = "8th";
      break;
    case 9:
      order = "9th";
      break;
    case 10:
      order = "10th";
      break;
  }
  return (
    <div className="w-full h-[77px] flex text-black01] font-extrabold justify-between items-center px-[19px] rounded-[10px] hover:bg-blue04 ">
      <div className="flex h-[43px] items-center  ">
        <div>{order}</div>
        <img src={column} alt="컬럼 아이콘" className="mx-[19px]" />
        <div>인공지능이 인간의 일자리를 대체할 것인가, 보완할 것인가?</div>
      </div>
      <div className="flex font-sofiaSans h-[27px] text-[18px]">
        <div className="flex rounded-[10px] bg-gray03 justify-center items-center w-[52px] h-[27px]">
          15분
        </div>
        <div className="flex rounded-[10px] bg-gray03 justify-center items-center w-[52px] h-[27px] mx-2">
          15번
        </div>
        <div className="flex w-[42px] h-[27px] rounded-[10px] bg-gray03 justify-center items-center ">
          1:1
        </div>
      </div>
    </div>
  );
}
