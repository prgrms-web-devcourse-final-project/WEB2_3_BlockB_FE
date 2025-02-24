import profile from "../../../assets/icons/profile-white.svg";
import MessageItem from "../ongoing-debate/MessageItem";
export default function DebateChatObserverMode({isDebateTabed}: {isDebateTabed: boolean}) {
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
    { id: 10, message: "조금 긴 예시 텍스트 입니다", isMine: false, isOppenent: false },
    { id: 11, message: "조금 많이 긴 예시 텍스트 입니다", isMine: true, isOppenent: false },
    { id: 12, message: "예시 텍스트 입니다", isMine: true, isOppenent: false },
    { id: 13, message: "예시 텍스트 입니다", isMine: false, isOppenent: false },
  ]
  return (
    <section
    className={`w-full md:w-[55%] h-screen md:h-[630px] md:border md:border-white 
      md:shadow-lg md:rounded-[10px] md:bg-white md:bg-opacity-20 overflow-y-auto 
      md:p-[20px] p-[10px] flex flex-grow flex-col ${isDebateTabed ? "md:flex" : "hidden md:flex"}`}
  >
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
  )
}
