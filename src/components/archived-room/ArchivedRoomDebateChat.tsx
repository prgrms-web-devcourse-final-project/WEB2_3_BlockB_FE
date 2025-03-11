import MessageItem from "../debate-zone/ongoing-debate/MessageItem";

export default function ArchivedRoomDebateChat({isDebateTabed, logs}: {isDebateTabed: boolean, logs: ArchivedChatLog[]}) {
    return (
        <section
        className={`w-full md:border md:border-white 
          md:shadow-lg md:rounded-[10px] md:h-auto h-[calc(100vh-80px)] md:bg-white md:bg-opacity-20 overflow-y-auto 
          md:p-[20px] p-[10px] flex-grow flex-col gap-[12px] ${isDebateTabed ? "md:flex" : "hidden md:flex"}`}
      >
          {logs.map((msg, index) => 
          <MessageItem
          uniqueKey={`${index}${msg.createdAt}`}
          message={msg.content}
          nickname={msg.nickname!} 
          profile={ msg.profileUrl}
          isMine={msg.position === "CON"}
          isOppenent={msg.position === "PRO"}
          />)}
      </section>
      )
}
    