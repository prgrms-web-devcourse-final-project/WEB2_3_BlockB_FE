import { useObserverWebSocket } from "../../../contexts/ObserverWebSocketContext.tsx";
import ChatObserverChatBubble from "./ChatObserverChatBubble.tsx";
import profile from "../../../assets/icons/profile-white.svg"

export default function ObserverChatSection({currentUserName}: {currentUserName: string}) {
  const {observerMessages} = useObserverWebSocket()
  return (
    <div className="md:w-[378px] md:h-[376px] flex flex-col flex-grow p-[10px] font-pretendard flex flex-col gap-[10px] overflow-y-auto">
      {/* 상대방 메시지 */}
      {observerMessages.map((msg)=>
      <ChatObserverChatBubble
        isMine={msg.userName === currentUserName}
        username={currentUserName}
        message={msg.message}
        profileUrl={msg.imageUrl || profile}
      />)}
    </div>
  );
}
