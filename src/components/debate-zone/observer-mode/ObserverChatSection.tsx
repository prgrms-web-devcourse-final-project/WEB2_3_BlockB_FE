import { useObserverWebSocket } from "../../../contexts/ObserverWebSocketContext.tsx";
import ChatObserverChatBubble from "./ChatObserverChatBubble.tsx";
import profile from "../../../assets/icons/profile-white.svg"
import { useEffect, useRef } from "react";

export default function ObserverChatSection({currentUserName}: {currentUserName: string}) {
  const {observerMessages} = useObserverWebSocket()
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, [observerMessages]);

  return (
    <div className="md:w-[378px] md:h-[376px] flex flex-col flex-grow p-[10px] font-pretendard flex flex-col gap-[12px] overflow-y-auto">
      {observerMessages.map((msg)=>
      <ChatObserverChatBubble
        isMine={msg.userName === currentUserName}
        username={currentUserName}
        message={msg.message}
        profileUrl={msg.imageUrl || profile}
      />)}
      <div ref={messageEndRef}></div>
    </div>
  );
}
