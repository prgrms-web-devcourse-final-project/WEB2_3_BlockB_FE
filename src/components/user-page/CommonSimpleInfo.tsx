import { useNavigate } from "react-router";
import politics from "../../assets/icons/politics.svg";
import { categoryKR, continentKR } from "../../constants";

type CommonSimpleInfoProps =
  | { type: "news"; data: MyNews }
  | { type: "debate"; data: ArchivedDebate };

export default function CommonSimpleInfo({ type, data }: CommonSimpleInfoProps) {
  const navigate = useNavigate();

  const goToLinkedPage = () => {
    type === "news" ? navigate(`/news/${data.newsId}`) : navigate(`/archived-room/${data.debateId}`); 
  };

  return (
    <div
      onClick={goToLinkedPage}
      className="flex justify-between w-full py-4 px-2 max-md:flex-col rounded-[10px] hover:bg-gray02 transform transition duration-200 hover:scale-[1.02]"
    >
      <div className="flex text-[16px] md:items-center max-md:flex-col">
        <div className="w-[100px] h-7 mr-[18px] bg-blue01 text-white flex items-center justify-center rounded-[10px]">
          <span className="mr-1">
            {"continent" in data
              ? continentKR[data.continent]
              : categoryKR[data.category]}
          </span>
          {type === "debate" && <img src={politics} alt="정치 아이콘" />}
        </div>
        <div className="font-bold">{data.title}</div>
      </div>

      {type === "news" ? (
        <div className="text-[18px] text-gray04 font-semibold">
          {new Date(data.createdAt).toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
          })}
        </div>
      ) : (
        <div className="text-[18px] text-gray04 font-semibold flex">
          <div>{data.time}</div>
          <div className="mx-2">{data.member}</div>
          <div>{data.isParticipant ? "참여" : "참관"}</div>
        </div>
      )}
    </div>
  );
}
