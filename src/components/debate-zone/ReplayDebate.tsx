import MessageItem from "./ongoing-debate/MessageItem";
import VoteButton from "./VoteButton";
import agree from "../../assets/icons/agree.svg";
import disagree from "../../assets/icons/disagree.svg";
import giveup from "../../assets/icons/giveup.svg";
import profile from "../../assets/icons/profile-white.svg";
import { useDebateWebSocket } from "../../contexts/DebateWebSocketContext";
import { useEffect, useState } from "react";
import { userApi } from "../../api/user";
import { useVote } from "../../hooks/useVote";
import { useNavigate } from "react-router";

export default function ReplayDebate({
  isObserver = false,
}: {
  isObserver?: boolean;
}) {
  const navigate = useNavigate()
  const { messages, position} = useDebateWebSocket()
  const {hasVoted} = useDebateWebSocket()
  const [userNickname, setUserNickname] = useState<string | null>(null);
  useEffect(() => {
        const fetchUserNickname = async () => {
          const userResponse = await userApi.fetchMyProfile();
          setUserNickname(userResponse.data.nickname);
  };
    
  fetchUserNickname();
  }, []);

  const voteList: VoteInfo[] = [
    { label: "찬성", img: agree, value: "PRO" },
    { label: "반대", img: disagree, value: "CON"},
    { label: "기권", img: giveup, value: "NO_POSITION"},
  ];

  const {moveState} = useVote(isObserver)

  const {websocketStatus} = useDebateWebSocket()

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-white font-pretendard font-bold md:text-[24px] text-[18px] text-center md:mb-[30px] mt-[10px] mb-5">
        찬반 투표가 진행중입니다...
      </h1>
      <div className="flex md:flex-row flex-col justify-between md:gap-[200px] gap-5 h-9/10">
        {/* 채팅창 */}
        <section className="md:max-w-[500px] md:min-w-[370px] max-w-[700px] min-w-[320px] w-full md:h-[500px] h-[300px] flex flex-grow md:bg-neutral-50/30 rounded-lg md:shadow-[0px_4px_20px_0px_rgba(251,251,251,1.00)] md:border md:border-neutral-50 animate-slide-up p-[10px] overflow-y-auto flex flex-col-reverse">
          {messages.map((msg, index) => (
            <MessageItem
              key={`${index}${msg.timestamp}`}
              message={msg.message}
              nickname={msg.userName! || "공지"} 
              profile={ msg.imageUrl || profile}
              isMine={isObserver ? (msg.position === "pro") : (msg.userName === userNickname)}
              isOppenent={isObserver? (msg.position === "con") : (position !== msg.position || false)}
            />
          ))}
        </section>
        {(!hasVoted && websocketStatus !== "CLOSED") ?  <section className="flex flex-col items-center gap-[14px] font-bold text-white">
          <p className="font-jersey text-[24px]">VOTE</p>
          <div className="flex flex-col gap-[20px]">
            {voteList.map((voteInfo, index) => (
              <VoteButton
                key={index}
                voteInfo={voteInfo}
              />
            ))}
          </div>
        </section>
        : <section className="flex flex-col justify-center">
            <p className="text-center text-game_blue01">이미 투표권을 행사하셨습니다</p>
            <div className="w-full flex md:flex-col md:gap-3 justify-between mt-[60px] md:text-[16px] text-[14px]">
              <button
                onClick={()=> moveState("result")}
                className="font-pretendard text-white border-b border-gray02"
              >
                결과 기다리기
              </button>
              <button
                onClick={() => navigate("/main")}
                className="font-pretendard text-white border-b border-gray02"
              >
                홈으로
              </button>
            </div>
          </section>}
      </div>
    </div>
  );
}
