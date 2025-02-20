import { useEffect, useState } from "react";

import NewsSimpleInfo from "./NewsSimpleInfo";
import NewsSimpleInfosSkeleton from "../common/skeleton/main/NewsSimpleInfosSkeleton";
import bookmark from "../../assets/icons/bookmark.svg";
import connection from "../../assets/icons/connection.svg";
import like from "../../assets/icons/like.svg";
import thumbnail from "../../assets/images/image 36.png";

export default function NewsSimpleInfos({
  tab,
  dates,
}: {
  tab: boolean;
  dates: number[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);
  return (
    <>
      {isLoading ? (
        <NewsSimpleInfosSkeleton isTabed={tab} dates={dates} />
      ) : (
        <div className={`${tab ? "" : "hidden"} font-pretendard`}>
          <div className="w-[1130px] h-[311px]  mb-[50px] flex ">
            <img
              src={thumbnail}
              alt="썸네일"
              className="w-[497px] h-full mr-5 rounded-[10px]"
            />

            <div className="flex flex-col justify-between">
              <div>
                <div className="text-[40px] font-extrabold">
                  {dates[0]}미국-인도 정상회담 개최 미국-인도 정상회담 개최
                </div>
                <div className="flex justify-between text-[16px]">
                  <span>연합뉴스</span>
                  <span>2025. 02. 13 12:21</span>
                </div>
              </div>

              <div className="text-[18px]">
                조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴
                D.C.에서 정상회담을 갖고 양국 간 경제 및 안보 협력 강화 방안을
                논의했습니다.
              </div>
              <div className="flex justify-end py-[12px]">
                <div className="flex w-[142px] justify-between text-[12px]">
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
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-[30px]">
            {dates
              .filter((date) => date !== 1)
              .map((date) => (
                <NewsSimpleInfo date={date} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
