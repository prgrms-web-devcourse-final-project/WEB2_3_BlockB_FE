import politics from "../../assets/icons/politics.svg";

export default function CommonSimpleInfo({
  newsOrDebate,
}: {
  newsOrDebate: boolean;
}) {
  return (
    <div className="flex justify-between w-full mb-[30px] max-md:flex-col">
      <div className="flex text-[16px] md:items-center max-md:flex-col">
        <div className="w-[68px] h-7 mr-[18px] bg-blue01 text-white flex items-center justify-center rounded-[10px]">
          <span className="mr-1">정치</span>
          <img src={politics} alt="정치 아이콘" />
        </div>
        <div className="font-bold">
          인공지능이 인간의 일자리를 대체할 것인가, 보완할 것인가?
        </div>
      </div>
      {newsOrDebate ? (
        <div className="text-[18px] text-gray04 font-semibold">2025-02-12</div>
      ) : (
        <div className="text-[18px] text-gray04 font-semibold flex">
          <div>15분</div>
          <div className="mx-2">1:1</div>
          <div>참관</div>
        </div>
      )}
    </div>
  );
}
