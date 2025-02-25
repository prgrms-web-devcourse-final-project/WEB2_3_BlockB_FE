import flag from "../../../assets/icons/flag-white.svg";
import profile from "../../../assets/icons/profile-white.svg";
import { useReportStore } from "../../../stores/reportModalStore";

export default function AudienceList() {
  const {setIsReportModalOpen} = useReportStore()
  return (
    <div className="hidden md:flex w-full h-[176px] font-jersey text-white flex-col justify-normal items-end gap-[5px]">
      <div className="w-[188px] flex justify-start">
        <p>audience</p>
      </div>
      <div className="flex flex-col gap-[5px] overflow-y-auto">
        <figure className="flex justify-between px-[5px] py-[2px] items-center bg-white bg-opacity-40 w-[188px] h-[33px] rounded-[10px]">
          <div className="flex gap-[11px]">
            <img src={profile} className="w-[24px] h-[24px] rounded-full" />
            <figcaption>imaria0218</figcaption>
          </div>
          <button onClick={()=>{setIsReportModalOpen(true)}} className="mr-[10px]">
            <img src={flag} alt="신고하기 버튼" />
          </button>
        </figure>
      </div>
    </div>
  );
}
