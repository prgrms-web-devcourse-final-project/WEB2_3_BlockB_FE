import profile from "../../../assets/icons/profile-white.svg";

export default function ChatObserverChatBubble({
  isMine,
  username,
  message,
}: {
  isMine: boolean;
  username: string;
  message: string;
}) {
  return (
    <div className={`w-full flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`bg-white bg-opacity-10 max-w-[320px] h-auto flex ${
          isMine
            ? "flex-row-reverse justify-end rounded-r-[20px] rounded-l-[5px] pl-[15px] pr-[10px]"
            : "justify-start rounded-l-[20px] rounded-r-[5px] pr-[15px] pl-[10px]"
        } py-[5px] gap-[8px]`}
      >
        <img
          src={profile}
          alt=""
          className="rounded-full w-[28px] h-[28px] bg-white mt-[7px]"
        />
        <div className="max-w-[250px]">
          <p className={`font-bold ${isMine ? "text-right" : ""}`}>
            {username}
          </p>
          <p className="break-words whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    </div>
  );
}
