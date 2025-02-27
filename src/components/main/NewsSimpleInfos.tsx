import { useEffect, useState } from "react";
import NewsSimpleInfo from "./NewsSimpleInfo";
import NewsSimpleInfosSkeleton from "../common/skeleton/main/NewsSimpleInfosSkeleton";
import bookmark from "../../assets/icons/bookmark.svg";
import connection from "../../assets/icons/connection.svg";
import like from "../../assets/icons/like.svg";

export default function NewsSimpleInfos({
  tab,
  datas,
}: {
  tab: boolean;
  datas: NewsType[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <NewsSimpleInfosSkeleton isTabed={tab} datas={datas} />
      ) : (
        <div className={`${tab ? "" : "hidden"} font-pretendard`}>
          {/* 데스크탑 크기 */}
          <div className="flex justify-center max-lg:hidden ">
            <div className="w-full h-[311px]   mb-[50px] flex    ">
              <img
                src={datas[0].imgUrl}
                alt="썸네일"
                className="w-[497px] h-full mr-5 rounded-[10px]"
              />
              <div className="flex flex-col justify-between">
                <div className="flex flex-col justify-between ">
                  <div className="text-[40px] font-extrabold line-clamp-2">
                    {datas[0].title}
                  </div>
                  <div className="flex justify-between text-[16px] ">
                    <span>{datas[0].newsType}</span>
                    <span>
                      {new Date(datas[0].deliveryTime).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-[18px] line-clamp-4">
                  {datas[0].content}
                </div>
                <div className="flex justify-end py-[12px]">
                  <div className="flex w-[142px] justify-between text-[12px] ">
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <img src={like} alt="좋아요" />
                      <span>{datas[0].like}</span>
                    </div>
                    <div className="w-[37px] h-[15px] flex items-center justify-between">
                      <img src={bookmark} alt="북마크" />
                      <span>{datas[0].bookmark}</span>
                    </div>
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <img src={connection} alt="연결" />
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 테블릿 */}
          <div className="flex justify-center lg:hidden max-md:hidden ">
            <div className="w-[768px] h-[250px]  mb-[50px] flex    ">
              <img
                src={datas[0].imgUrl}
                alt="썸네일"
                className="w-[400px] h-full mr-5 rounded-[10px]"
              />
              <div className="flex flex-col justify-between">
                <div className="flex flex-col justify-between ">
                  <div className="text-[25px] font-extrabold line-clamp-2">
                    {datas[0].title}
                  </div>
                  <div className="flex justify-between text-[16px] ">
                    <span>{datas[0].newsType}</span>
                    <span>
                      {new Date(datas[0].deliveryTime).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-[18px] line-clamp-3">
                  {datas[0].content}
                </div>
                <div className="flex justify-end py-[12px]">
                  <div className="flex w-[142px] justify-between text-[12px] ">
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <img src={like} alt="좋아요" />
                      <span>{datas[0].like}</span>
                    </div>
                    <div className="w-[37px] h-[15px] flex items-center justify-between">
                      <img src={bookmark} alt="북마크" />
                      <span>{datas[0].bookmark}</span>
                    </div>
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <img src={connection} alt="연결" />
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 모바일 */}
          <div className="flex justify-center lg:hidden md:hidden mb-[15px] ">
            <div className="flex flex-col w-[320px] h-[180px]">
              <div className="flex">
                <img
                  src={datas[0].imgUrl}
                  alt="썸네일"
                  className="w-[128px] h-20 mr-5 rounded-[10px]"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col justify-between h-20">
                    <div className="text-[14px] font-extrabold line-clamp-3">
                      {datas[0].title}
                    </div>
                    <div className="flex justify-between text-[10px] ">
                      <span>{datas[0].newsType}</span>
                      <span>
                        {new Date(datas[0].deliveryTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[12px] line-clamp-3 mt-[15px]">
                  {datas[0].content}
                </div>
                <div className="flex justify-end py-2">
                  <div className="flex w-[142px] justify-between text-[10px] ">
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <img src={like} alt="좋아요" />
                      <span>{datas[0].like}</span>
                    </div>
                    <div className="w-[37px] h-[15px] flex items-center justify-between">
                      <img src={bookmark} alt="북마크" />
                      <span>{datas[0].bookmark}</span>
                    </div>
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <img src={connection} alt="연결" />
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2  max-md:grid-cols-1">
              {datas
                .filter((_, index) => index !== 0)
                .map((data, index) => (
                  <NewsSimpleInfo data={data} key={index} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
