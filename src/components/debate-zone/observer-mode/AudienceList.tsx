import flag from "../../../assets/icons/flag-white.svg";
import profile from "../../../assets/icons/profile-white.svg";

export default function AudienceList() {
  return (
    <div className=" w-full h-[176px] font-jersey text-white flex flex-col justify-normal items-end gap-[5px]">
      <div className="w-[188px] flex justify-start">
        <p>audience</p>
      </div>
      {/* audience card 숫자가 정해진 높이가 넘어가면 스크롤된다. 실제 구현할 때 새로운 audience가 올 때마다 스크롤이 자동으로 최하단으로 가도록 유지하면 좋을 것 같습니다*/}
      <div className="flex flex-col gap-[5px] overflow-y-auto">
        <figure className="flex justify-between px-[5px] py-[2px] items-center  bg-white bg-opacity-40 w-[188px] h-[33px] rounded-[10px]">
          <div className="flex gap-[11px]">
            <img src={profile} className="w-[24px] h-[24px] rounded-full" />
            <figcaption>imaria0218</figcaption>
          </div>
          <button className="mr-[10px]">
            <img src={flag} alt="신고하기 버튼" />
          </button>
        </figure>
      </div>
    </div>
  );
}
