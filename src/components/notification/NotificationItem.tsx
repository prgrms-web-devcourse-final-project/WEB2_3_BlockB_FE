export default function NotificationItem({
  isNew = false,
  message,
  actionText,
  isDisabled = false,
}: {
  isNew: boolean;
  message: string;
  actionText?: string;
  isDisabled?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center  py-2 rounded-md transition duration-200 
        ${isDisabled ? "opacity-50" : "text-gray-700 hover:bg-gray-200"}
      `}
    >
      <div className="flex items-center space-x-2">
        <div
          className={`w-2 h-2 m-1 rounded-full flex-shrink-0 ${
            isNew ? "bg-game_blue01" : "bg-gray-400"
          }`}
        ></div>

        <p
          className={`text-xs sm:text-sm transition duration-200 ${
            isNew ? "text-gray-700" : "text-gray-400"
          }`}
        >
          {message}
        </p>
      </div>
      {actionText && (
        <button
          className={`text-xs sm:text-sm mr-1 transition duration-200 whitespace-nowrap ${
            isNew
              ? "text-game_blue01 hover:underline hover:text-blue-700"
              : "text-gray-400"
          }`}
          disabled={isDisabled}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
