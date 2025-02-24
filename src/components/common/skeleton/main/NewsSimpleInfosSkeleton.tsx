export default function NewsSimpleInfosSkeleton({
  isTabed,
  dates,
}: {
  isTabed: boolean;
  dates: number[];
}) {
  return (
    <div className={`${isTabed ? "" : "hidden"} animate-pulse`}>
      {/* 데스크탑 스켈레톤 */}
      <div className="flex justify-center max-lg:hidden">
        <div className="w-full h-[311px] mb-[50px] flex">
          <div className="w-[497px] h-full mr-5 rounded-[10px] bg-gray-300 "></div>
          <div className="flex flex-col justify-between w-full">
            <div className="h-[120px] bg-gray-300 rounded-md mb-2 "></div>
            <div className="flex justify-between text-[16px]">
              <div className="w-[55.3px] h-[15px] bg-gray-300 rounded-md "></div>
              <div className="w-[132.25px] h-[15px] bg-gray-300 rounded-md "></div>
            </div>
            <div className="h-[54px] bg-gray-300 rounded-md mt-4 "></div>
            <div className="flex justify-end py-[12px]">
              <div className="flex w-[142px] justify-between ">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[41px] h-[15px] flex items-center justify-between"
                  >
                    <div className="w-[20px] h-[20px] bg-gray-300 rounded-full "></div>
                    <span className="w-[20px] h-[15px] bg-gray-300 rounded-md "></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 태블릿 스켈레톤 */}
      <div className="flex justify-center lg:hidden max-md:hidden">
        <div className="w-[768px] h-[250px] mb-[50px] flex">
          <div className="w-[768px] h-full mr-5 rounded-[10px] bg-gray-300 "></div>
          <div className="flex flex-col justify-between w-full">
            <div className="h-[100px] bg-gray-300 rounded-md mb-2 "></div>
            <div className="flex justify-between text-[14px]">
              <div className="w-[50px] h-[12px] bg-gray-300 rounded-md "></div>
              <div className="w-[120px] h-[12px] bg-gray-300 rounded-md "></div>
            </div>
            <div className="h-[40px] bg-gray-300 rounded-md mt-4 "></div>
            <div className="flex justify-end py-[12px]">
              <div className="flex w-[120px] justify-between text-[10px]">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[35px] h-[12px] flex items-center justify-between"
                  >
                    <div className="w-[18px] h-[18px] bg-gray-300 rounded-full "></div>
                    <span className="w-[15px] h-[12px] bg-gray-300 rounded-md "></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 스켈레톤 */}
      <div className="flex justify-center lg:hidden md:hidden">
        <div className="flex flex-col w-[320px] h-[180px]">
          <div className="flex">
            <div className="w-[228px] h-20 mr-5 rounded-[10px] bg-gray-300 "></div>
            <div className="flex flex-col justify-between w-full">
              <div className="h-[60px] bg-gray-300 rounded-md mb-2 "></div>
              <div className="flex justify-between text-[10px]">
                <div className="w-[40px] h-[10px] bg-gray-300 rounded-md "></div>
                <div className="w-[80px] h-[10px] bg-gray-300 rounded-md "></div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="h-[50px] bg-gray-300 rounded-md "></div>
            <div className="flex justify-end py-2">
              <div className="flex w-[100px] justify-between text-[10px]">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[30px] h-[10px] flex items-center justify-between"
                  >
                    <div className="w-[15px] h-[15px] bg-gray-300 rounded-full "></div>
                    <span className="w-[12px] h-[10px] bg-gray-300 rounded-md "></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 뉴스 리스트 */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-[30px]  max-lg:grid-cols-2  max-md:grid-cols-1">
          {dates
            .filter((date, idx) => {
              if (idx !== 0) return date;
            })
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col w-[321px] h-[540px] max-lg:w-[369px] max-md:w-[320px]  max-md:h-[180px] rounded-lg justify-between"
              >
                {/* 상단 영역 (썸네일 + 텍스트) */}
                <div className="max-md:flex max-md:gap-2 ">
                  {/* 썸네일 */}
                  <div className="w-full h-[237px] rounded-[10px] max-md:w-[210px] max-md:h-20 bg-gray-300"></div>

                  {/* 제목 & 출처 */}
                  <div className="flex flex-col justify-between w-full ">
                    {/* 뉴스 제목 */}
                    <div className="h-24 bg-gray-300 rounded-md mb-2 max-md:h-[60px] md:mt-2"></div>

                    {/* 뉴스 출처 및 날짜 */}
                    <div className="flex justify-between text-[10px]">
                      <div className="w-[40px] h-[10px] bg-gray-300 rounded-md"></div>
                      <div className="w-[80px] h-[10px] bg-gray-300 rounded-md"></div>
                    </div>
                  </div>
                </div>

                {/* 뉴스 내용 */}
                <div className="h-[80px] bg-gray-300 rounded-md max-md:h-[40px]"></div>

                {/* 좋아요, 북마크, 공유 아이콘 */}
                <div className="flex justify-end py-2">
                  <div className="flex w-[100px] justify-between text-[10px]">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-[30px] h-[10px] flex items-center justify-between"
                      >
                        <div className="w-[15px] h-[15px] bg-gray-300 rounded-full max-md:w-[12px] max-md:h-[12px]"></div>
                        <span className="w-[12px] h-[10px] bg-gray-300 rounded-md"></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
