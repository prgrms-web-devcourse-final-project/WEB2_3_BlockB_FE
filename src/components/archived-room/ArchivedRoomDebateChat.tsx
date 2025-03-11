export default function ArchivedRoomDebateChat({isDebateTabed}: {isDebateTabed: boolean}) {
    return (
        <section
        className={`w-full md:border md:border-white 
          md:shadow-lg md:rounded-[10px] md:h-auto h-[calc(100vh-80px)] md:bg-white md:bg-opacity-20 overflow-y-auto 
          md:p-[20px] p-[10px] flex-grow flex-col gap-[12px] ${isDebateTabed ? "md:flex" : "hidden md:flex"}`}
      >
          {/* <MessageItem
            uniqueKey={`${index}${msg.timestamp}`}
          message={msg.message}
          nickname={msg.userName! || "공지"} 
          profile={ msg.imageUrl || profile}
          isMine={msg.position === "pro" || msg.event === "NOTIFICATION"}
          isOppenent={msg.position ==="con" }
          /> */}
      </section>
      )
}
    