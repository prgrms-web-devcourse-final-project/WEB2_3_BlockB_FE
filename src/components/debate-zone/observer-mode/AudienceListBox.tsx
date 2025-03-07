import profile from "../../../assets/icons/profile-white.svg"

export default function AudienceListBox({setIsWaiting} : {setIsWaiting: (isWating: boolean) => void}) {
  return (
    <div className="md:block hidden font-jersey text-white flex flex-col justify-normal items-end gap-[5px]">
        <div className="w-[188px] flex justify-start">
            <p>audience</p>
        </div>
        <figure className="flex gap-[11px] px-[5px] py-[2px] items-center  bg-white bg-opacity-40 w-[188px] h-[33px] rounded-[10px]">
            <img src={profile} className="w-[24px] h-[24px] rounded-full" />
            <figcaption>imaria0218</figcaption>
        </figure>
        {/* 임시 룸 상태 이동 버튼 */}
        <button
            onClick={() => {
            setIsWaiting(false);
            }}
            className="text-white font-bold z-50"
        >
            대기 완료
        </button>
    </div>
  )
}
