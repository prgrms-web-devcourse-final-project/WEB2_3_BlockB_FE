import { useEffect, useState } from "react"
import { userApi } from "../../api/user";
import ChatObserverChatBubble from "../debate-zone/observer-mode/ChatObserverChatBubble.tsx";

export default function ArchivedRoomObserverChat({ isDebateTabed, logs }: { isDebateTabed: boolean, logs: ArchivedChatLog[]}) {
  const [currentUserName, setCurrentUserName] = useState<string>("")
  useEffect(() => {
      const fetchUserNickname = async () => {
        const userResponse = await userApi.fetchMyProfile();
        setCurrentUserName(userResponse.data.nickname);
      };
  
      fetchUserNickname();
    }, []);
  return (
        <section
          id="chatwindow"
          className={`md:w-full md:h-[440px] max-h-[calc(100vh-90px)] rounded-[10px] md:mt-0 mt-[10px] flex flex-col flex-grow pb-2
            ${isDebateTabed ? "hidden md:flex" : "h-screen"}`}
        >
          {/* 메시지 로그 */}
          <div className="flex-grow overflow-y-auto">
          <div className="md:w-[378px] md:h-[376px] flex flex-col flex-grow p-[10px] font-pretendard flex flex-col gap-[12px] overflow-y-auto">

            {logs.map((msg)=>
            <ChatObserverChatBubble
                isMine={msg.nickname === currentUserName}
                username={msg.nickname}
                message={msg.content}
                profileUrl={msg.profileUrl}
            />)}

            </div>
          </div>
        </section>
  )
}
