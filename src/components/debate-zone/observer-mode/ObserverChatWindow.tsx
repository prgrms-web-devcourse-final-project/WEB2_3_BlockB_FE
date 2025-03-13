import { useEffect, useState } from "react";
import send from "../../../assets/icons/send.svg";
import { useObserverWebSocket } from "../../../contexts/ObserverWebSocketContext";
import ObserverChatSection from "./ObserverChatSection";
import { userApi } from "../../../api/user";

export default function ObserverChatWindow({ isDebateTabed }: { isDebateTabed: boolean }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false); // State to track IME composition
  const { sendObserverMessages } = useObserverWebSocket();
  const [userNickname, setUserNickname] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>("");

  useEffect(() => {
    const fetchUserNickname = async () => {
      const userResponse = await userApi.fetchMyProfile();
      setUserNickname(userResponse.data.nickname);
      setImageUrl(userResponse.data.profileUrl);
    };

    fetchUserNickname();
  }, []);

  const handleSendObserverMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        event: "MESSAGE",
        userName: userNickname,
        imageUrl: imageUrl,
        position: "observer",
        message: currentMessage,
        timestamp: new Date().toISOString(),
      };
      sendObserverMessages(JSON.stringify(newMessage));
      console.log("현재 채팅창에 입력되어 있는 메시지", newMessage);
      setCurrentMessage("");
    }
  };

  return (
    <section
      id="chatwindow"
      className={`md:w-full md:h-[440px] max-h-[calc(100vh-90px)] rounded-[10px] md:mt-0 mt-[10px] flex flex-col flex-grow pb-2
        ${isDebateTabed ? "hidden md:flex" : "h-screen"}`}
    >
      {/* 메시지 로그 */}
      <div className="flex-grow overflow-y-auto">
        <ObserverChatSection currentUserName={userNickname} />
      </div>

      {/* 메시지 입력 창 */}
      <div className="flex justify-between items-center bg-white/30 border p-2 mx-[10px] my-[10px] rounded-md font-pretendard">
        <input
          type="text"
          value={currentMessage}
          placeholder="메시지를 입력하세요"
          className="w-full bg-transparent border-none outline-none text-white font-bold placeholder:text-gray-400 placeholder:font-light"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing) {
              e.preventDefault();
              handleSendObserverMessage();
            }
          }}
        />
        <button aria-label="메시지 전송" onClick={handleSendObserverMessage}>
          <img src={send} alt="전송" />
        </button>
      </div>
    </section>
  );
}
