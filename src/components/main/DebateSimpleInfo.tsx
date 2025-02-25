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
    <div className="flex max-lg:justify-center">
      <div className="w-full max-lg:w-[768px] max-md:w-80  h-[77px]  flex text-black01] font-extrabold justify-between items-center rounded-[10px] hover:bg-blue04 ">
        <div className="flex h-[43px] items-center  ">
          <p className="max-md:text-[14px]">{order}</p>
          <img
            src={column}
            alt="컬럼 아이콘"
            className="mx-[19px] max-md:hidden"
          />
          <p className="font-pretendard max-md:text-[12px] max-md:mx-2">
            인공지능이 인간의 일자리를 대체할 것인가, 보완할 것인가?
          </p>
        </div>
        <div className="flex font-pretendard h-[27px] text-[18px] max-md:text-[10px] w-44 justify-between max-md:w-28">
          {["15분", "15번", "1 : 1"].map((item, index) => {
            return (
              <p
                className="flex rounded-[10px] bg-[#D9D9D9] justify-center items-center w-[52px] max-md:w-8 h-8 max-md:h-4"
                key={index}
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
