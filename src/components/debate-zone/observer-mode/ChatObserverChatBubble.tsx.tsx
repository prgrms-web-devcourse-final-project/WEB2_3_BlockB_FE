export default function ChatObserverChatBubble({
  isMine,
  username,
  message,
  profileUrl,
}: {
  isMine: boolean;
  username: string;
  message: string;
  profileUrl: string;
}) {
  return (
    <div className={`w-full flex ${isMine ? "justify-end" : "justify-start"} md:text-[16px] text-[14px]`}>
      <div
        className={`bg-white bg-opacity-10 md:max-w-[320px] sm:max-w-[500px] max-w-[330px] h-auto flex ${
          isMine
            ? "flex-row-reverse justify-end rounded-r-[20px] rounded-l-[5px] pl-[15px] pr-[10px]"
            : "justify-start rounded-l-[20px] rounded-r-[5px] pr-[15px] pl-[10px]"
        } py-[5px] gap-[8px]`}
      >
        <img
          src={profileUrl}
          alt={`${username}님의 프로필 사진`}
          className="rounded-full w-[28px] h-[28px] mt-[7px]"
        />
        <div className="md:max-w-[320px] sm:max-w-[500px] max-w-[330px] ">
          <p className={`font-bold ${isMine ? "text-right" : ""}`}>
            {username}
          </p>
          <p className="break-words whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    </div>
  );
}
