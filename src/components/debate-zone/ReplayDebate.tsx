import MessageItem from "./ongoing-debate/MessageItem";
import VoteButton from "./VoteButton";
import agree from "../../assets/icons/agree.svg";
import disagree from "../../assets/icons/disagree.svg";
import giveup from "../../assets/icons/giveup.svg";
import profile from "../../assets/icons/profile-white.svg";

export default function ReplayDebate({
  isObserver = false,
}: {
  isObserver?: boolean;
}) {
  const messages = [
    { id: 1, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 2, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 3, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 4, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 5, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 6, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 7, message: "예시 텍스트 입니다", isMine: false, isOppenent: true },
    { id: 8, message: "예시 텍스트 입니다", isMine: true, isOppenent: false },
    { id: 9, message: "예시 텍스트 입니다", isMine: true, isOppenent: false },
  ];

  const voteList: VoteInfo[] = [
    { label: "찬성", img: agree },
    { label: "반대", img: disagree },
    { label: "기권", img: giveup },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-white font-pretendard font-bold text-[24px] text-center mb-[30px]">
        찬반 투표가 진행중입니다...
      </h1>
      <div className="flex justify-between gap-[200px]">
        {/* 채팅창 */}
        <section className="w-[500px] h-auto bg-neutral-50/30 rounded-lg shadow-[0px_4px_20px_0px_rgba(251,251,251,1.00)] border border-neutral-50 animate-slide-up p-[10px] overflow-y-auto flex flex-col-reverse">
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg.message}
              profile={profile}
              isMine={msg.isMine}
              isOppenent={msg.isOppenent}
            />
          ))}
        </section>
        <section className="flex flex-col gap-[14px] font-bold text-white">
          <p className="font-jersey text-[24px]">VOTE</p>
          <div className="flex flex-col gap-[20px]">
            {voteList.map((voteInfo, index) => (
              <VoteButton
                key={index}
                voteInfo={voteInfo}
                isObserver={isObserver}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
