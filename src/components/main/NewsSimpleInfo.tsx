import bookmark from "../../assets/icons/bookmark.svg";
import connection from "../../assets/icons/connection.svg";
import like from "../../assets/icons/like.svg";
import thumbnail from "../../assets/images/image 36.png";
export default function NewsSimpleInfo({ date }: { date: number }) {
  return (
    <div className="w-[321px] h-[540px] max-lg:w-[369px] max-md:w-[320px]  max-md:h-[180px] flex flex-col justify-between font-pretendard">
      <div className="max-md:flex max-md:gap-2 ">
        <img
          src={thumbnail}
          alt="썸네일"
          className="w-full h-[237px] rounded-[10px] max-md:w-[128px] max-md:h-[80px]"
        />
        <div className="flex flex-col justify-between ">
          <div className="text-[24px] font-extrabold max-md:text-[14px] line-clamp-3 md:mt-2">
            {date}미국-인도 정상회담 개최 미국-인도 정상회담 개최미국-인도
            정상회담 개최미국-인도 정상회담 개최미국-인도 정상회담 개최미국-인도
            정상회담 개최미국-인도 정상회담 개최미국-인도 정상회담 개최미국-인도
            정상회담 개최미국-인도 정상회담 개최
          </div>
          <div className="flex justify-between text-[16px] max-md:text-[10px]">
            <span>연합뉴스</span>
            <span>2025. 02. 13 12:21</span>
          </div>
        </div>
      </div>

      <div className="text-[18px] max-md:text-[12px]">
        조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서
        정상회담을 갖고 양국 간 경제 및 안보 협력 강화 방안을 논의했습니다.
      </div>

      <div className="flex justify-end ">
        <div className="flex w-[142px] justify-between text-[12px] max-md:text-[10px]">
          <div className="w-[41px] h-[15px] flex items-center justify-between">
            <img src={like} alt="좋아요" />
            <span>12</span>
          </div>
          <div className="w-[37px] h-[15px] flex items-center justify-between">
            <img src={bookmark} alt="북마크" />
            <span>12</span>
          </div>
          <div className="w-[41px] h-[15px] flex items-center justify-between">
            <img src={connection} alt="연결" />
            <span>12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
