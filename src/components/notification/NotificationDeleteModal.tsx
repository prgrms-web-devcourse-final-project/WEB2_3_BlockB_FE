export default function NotificationDeleteModal({
  deleteModal,
  notificationDelete,
  deleteNotificationId,
  allNotificationsDelete,
  closeDeleteModal,
}: {
  deleteModal: DeleteModalType;
  notificationDelete: (deleteNotificationId: number) => void;
  deleteNotificationId: number;
  allNotificationsDelete: () => void;
  closeDeleteModal: () => void;
}) {
  return (
    <div
      className={`absolute w-[420px] top-[50px] h-72 overflow-auto md:top-[85px] right-[15px] md:right-[30px] mx-auto p-3 sm:p-4 rounded-lg shadow-lg max-w-[90%] sm:max-w-[400px]  lg:max-w-[420px] border border-gray-200 bg-black/40 `}
    >
      <div className="flex items-center w-full h-full">
        <div className="w-full p-4 rounded-lg bg-white/80 backdrop-blur-md">
          <p className="mb-4 font-semibold text-center text-gray-800">
            정말 삭제하시겠습니까?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              onClick={() => {
                if (deleteModal === "delete") {
                  notificationDelete(deleteNotificationId);
                }
                if (deleteModal === "allDelete") {
                  allNotificationsDelete();
                }
                closeDeleteModal();
              }}
            >
              삭제
            </button>
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
