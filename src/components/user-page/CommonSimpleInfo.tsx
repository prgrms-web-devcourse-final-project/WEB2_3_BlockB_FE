import politics from "../../assets/icons/politics.svg";
import { categoryKR, continentKR } from "../../constants";

export default function CommonSimpleInfo({
  type,
  data,
}: {
  type: string;
  data: MyNews | ArchivedDebate;
}) {
  return (
    <div className="flex justify-between w-full mb-[30px] max-md:flex-col">
      <div className="flex text-[16px] md:items-center max-md:flex-col">
        <div className="w-[100px] h-7 mr-[18px] bg-blue01 text-white flex items-center justify-center rounded-[10px]">
          <span className="mr-1">
            {"continent" in data ? continentKR[data.continent] : categoryKR[data.category]}
          </span>
          {type === "debate" && <img src={politics} alt="정치 아이콘" />}
        </div>
        <div className="font-bold">{data.title}</div>
      </div>
      {type === "news" ? (
        <div className="text-[18px] text-gray04 font-semibold">
          {(data as MyNews).createdAt}
        </div>
      ) : (
        <div className="text-[18px] text-gray04 font-semibold flex">
          <div>{(data as ArchivedDebate).time}</div>
          <div className="mx-2">{(data as ArchivedDebate).member}</div>
          <div>{(data as ArchivedDebate).isParticipant ? "참여" : "참관"}</div>
        </div>
      )}
    </div>
  );
}
