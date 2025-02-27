import politics from "../../assets/icons/politics.svg";
import { continentKR } from "../../constants";

export default function CommonSimpleInfo({
  type,
  data,
}: {
  type: string;
  data: MyNews & ArchivedDebate
}) {
  // TODO: 더미 데이터 만들면 데이터 렌더링 여부 확인
  return (
    <div className="flex justify-between w-full mb-[30px] max-md:flex-col">
      <div className="flex text-[16px] md:items-center max-md:flex-col">
        <div className="w-[68px] h-7 mr-[18px] bg-blue01 text-white flex items-center justify-center rounded-[10px]">
          <span className="mr-1">{type === "news" ? continentKR[data.continent] : data.category}</span>
          {type === "debate" && <img src={politics} alt="정치 아이콘" />}
        </div>
        <div className="font-bold">
        {data.title}
        </div>
      </div>
      {type == "news" ? (
        <div className="text-[18px] text-gray04 font-semibold">{data.createdAt}</div>
      ) : (
        <div className="text-[18px] text-gray04 font-semibold flex">
          <div>{data.time}</div>
          <div className="mx-2">{data.member}</div>
          <div>{data.isParticipant? "참여": "참관"}</div>
        </div>
      )}
    </div>
  );
}
