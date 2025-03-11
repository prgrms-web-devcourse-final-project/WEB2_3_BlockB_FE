import { useEffect, useRef } from "react";
import profile from "../../../assets/icons/profile-white.svg";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";
import MessageItem from "../ongoing-debate/MessageItem";
export default function DebateChatObserverMode({isDebateTabed}: {isDebateTabed: boolean}) {

  const {messages} = useDebateWebSocket()
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, [messages]);

  return (
    <section
    className={`w-full md:border md:border-white 
      md:shadow-lg md:rounded-[10px] md:h-auto h-[calc(100vh-80px)] md:bg-white md:bg-opacity-20 overflow-y-auto 
      md:p-[20px] p-[10px] flex-grow flex-col gap-[12px] ${isDebateTabed ? "md:flex" : "hidden md:flex"}`}
  >
    {messages.map((msg, index) => (
      <MessageItem
      uniqueKey={`${index}${msg.timestamp}`}
      message={msg.message}
      nickname={msg.userName! || "공지"} 
      profile={ msg.imageUrl || profile}
      isMine={msg.position === "pro" || msg.event === "NOTIFICATION"}
      isOppenent={msg.position ==="con" }
      />
    ))}
    <div ref={messageEndRef} />
  </section>
  )
}
