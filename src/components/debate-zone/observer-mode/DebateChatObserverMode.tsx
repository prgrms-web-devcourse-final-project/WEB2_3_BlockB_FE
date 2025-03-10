import profile from "../../../assets/icons/profile-white.svg";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";
import MessageItem from "../ongoing-debate/MessageItem";
export default function DebateChatObserverMode({isDebateTabed}: {isDebateTabed: boolean}) {

  const {messages} = useDebateWebSocket()
  return (
    <section
    className={`w-full md:border md:border-white 
      md:shadow-lg md:rounded-[10px] md:h-auto h-[calc(100vh-80px)] md:bg-white md:bg-opacity-20 overflow-y-auto 
      md:p-[20px] p-[10px] flex-grow flex-col ${isDebateTabed ? "md:flex" : "hidden md:flex"}`}
  >
    {messages.map((msg, index) => (
      <MessageItem
      key={`${index}${msg.timestamp}`}
      message={msg.message}
      nickname={msg.userName! || "공지"} 
      profile={ msg.imageUrl || profile}
      isMine={msg.position === "con"}
      isOppenent={msg.position ==="pro" || msg.event === "NOTIFICATION"}
      />
    ))}
  </section>
  )
}
