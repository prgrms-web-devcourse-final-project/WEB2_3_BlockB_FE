export default function ArchivedRoomDebaterList() {
  return (
    <div className="hidden md:flex w-full h-[176px] font-jersey text-white flex-col justify-normal items-end gap-[5px]">
    <div className="w-[188px] flex justify-start">
      <p>participants</p>
    </div>
    <div className="flex flex-col gap-[5px] overflow-y-auto">
      <p className="font-jersey">pro</p>
      {/* {roomInfoDetails.proUsers.map((user) => (
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
      ))} */}
      <p className="font-jersey">con</p>
      {/* {roomInfoDetails.conUsers.map((user) => (
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
      ))} */}
    </div>
  </div>
);
};
