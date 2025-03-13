
import flag from "../../../assets/icons/flag-white.svg";
import profile from "../../../assets/icons/profile-white.svg";
import { useObserverRoomStore } from "../../../stores/observerRoomInfoStore";
import { useReportModalStore } from "../../../stores/reportModalStore";
import { useCallback } from "react";
import { memo } from "react";

const AudienceList = () => {
  const { openModal } = useReportModalStore();
  
  const observerRoomInfoDetails = useObserverRoomStore((state) => state.observerRoomInfoDetails);

  const handleOpenReportModal = useCallback(
    (userNickname: string, userId: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      openModal({
        targetNickname: userNickname,
        targetUserId: userId,
        targetType: "CHAT",
        roomId: null,
      });
    },
    [openModal]
  );

  return (
    <div className="hidden md:flex w-full h-[176px] font-jersey text-white flex-col justify-normal items-end gap-[5px]">
      <div className="w-[188px] flex justify-start">
        <p>participants</p>
      </div>
      <div className="flex flex-col gap-[5px] overflow-y-auto">
        <p className="font-jersey">pro</p>
        {observerRoomInfoDetails.proUsers.map((user) => (
          <figure
            key={user.id}
            className="flex justify-between px-[5px] py-[2px] items-center bg-white bg-opacity-40 w-[188px] h-[33px] rounded-[10px]"
          >
            <div className="flex gap-[11px]">
              <img src={user.profileUrl || profile} className="w-[24px] h-[24px] rounded-full" />
              <figcaption>{user.nickname}</figcaption>
            </div>
            <button onClick={handleOpenReportModal(user.nickname, user.id)} className="mr-[10px]">
              <img src={flag} alt="신고하기 버튼" />
            </button>
          </figure>
        ))}
        <p className="font-jersey">con</p>
        {observerRoomInfoDetails.conUsers.map((user) => (
          <figure
            key={user.id}
            className="flex justify-between px-[5px] py-[2px] items-center bg-white bg-opacity-40 w-[188px] h-[33px] rounded-[10px]"
          >
            <div className="flex gap-[11px]">
              <img src={user.profileUrl || profile} className="w-[24px] h-[24px] rounded-full" />
              <figcaption>{user.nickname}</figcaption>
            </div>
            <button onClick={handleOpenReportModal(user.nickname, user.id)} className="mr-[10px]">
              <img src={flag} alt="신고하기 버튼" />
            </button>
          </figure>
        ))}
      </div>
    </div>
  );
};


export default memo(AudienceList);
