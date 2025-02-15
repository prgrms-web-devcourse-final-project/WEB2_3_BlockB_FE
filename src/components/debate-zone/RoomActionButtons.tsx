export default function RoomActionButtons({
  cancelAction,
  confirmAction,
  cancelColor,
  confirmColor,
  confirmText,
}: {
  cancelAction: () => void;
  confirmAction: () => void;
  cancelColor: string;
  confirmColor: string;
  confirmText: string;
}) {
  return (
    <div className="flex space-x-4">
      {/* 취소 버튼 */}
      <button
        onClick={cancelAction}
        className={`px-4 py-2 rounded-lg text-white ${cancelColor} hover:bg-opacity-80`}
      >
        취소
      </button>
      {/* 확인 버튼 */}
      <button
        onClick={confirmAction}
        className={`px-4 py-2 rounded-lg text-white ${confirmColor} hover:bg-opacity-80`}
      >
        {confirmText}
      </button>
    </div>
  );
}
