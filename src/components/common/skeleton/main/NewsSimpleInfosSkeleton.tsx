export default function NewsSimpleInfosSkeleton({
    isTabed,
    dates,
  }: {
    isTabed: boolean;
    dates: number[];
  }) {
    return (
      <div className={`${isTabed ? "" : "hidden"} animate-pulse`}>
        {/* 메인 뉴스 카드 */}
        <div className="w-[1130px] h-[311px] mb-[50px] flex">
          {/* 이미지 영역 */}
          <div className="w-[497px] h-full mr-5 rounded-[10px] bg-gray03" />
  
          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="w-[644px] h-[120px] bg-gray03 rounded-md mb-2"></div>
              <div className="flex justify-between text-[16px]">
                <div className="w-[55.3px] h-[15px] bg-gray03 rounded-md"></div>
                <div className="w-[132.25px] h-[15px] bg-gray03 rounded-md"></div>
              </div>
            </div>
  
            <div className="w-full h-[54px] bg-gray03 rounded-md mt-4"></div>
  
            {/* 좋아요, 북마크, 연결 영역 */}
            <div className="flex justify-end py-[12px]">
              <div className="flex w-[142px] justify-between text-[12px]">
                <div className="w-[41px] h-[15px] flex items-center justify-between">
                  <div className="w-[20px] h-[20px] bg-gray03 rounded-full"></div>
                  <span className="w-[20px] h-[15px] bg-gray03 rounded-md"></span>
                </div>
                <div className="w-[37px] h-[15px] flex items-center justify-between">
                  <div className="w-[20px] h-[20px] bg-gray03 rounded-full"></div>
                  <span className="w-[20px] h-[15px] bg-gray03 rounded-md"></span>
                </div>
                <div className="w-[41px] h-[15px] flex items-center justify-between">
                  <div className="w-[20px] h-[20px] bg-gray03 rounded-full"></div>
                  <span className="w-[20px] h-[15px] bg-gray03 rounded-md"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* 뉴스 리스트 */}
        <div className="grid grid-cols-3 grid-rows-3 gap-[30px]">
          {Array(...dates)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-[356px] h-[478px] flex flex-col justify-between rounded-lg"
              >
                {/* 썸네일 이미지 */}
                <div className="w-[356px] h-[237px] bg-gray03 rounded-[10px]"></div>
  
                {/* 뉴스 제목 */}
                <div className="w-[200px] h-[30px] bg-gray03 rounded-md mt-4 mb-2"></div>
  
                {/* 뉴스 출처 및 날짜 */}
                <div className="flex justify-between text-[16px]">
                  <div className="w-[80px] h-[15px] bg-gray03 rounded-md"></div>
                  <div className="w-[120px] h-[15px] bg-gray03 rounded-md"></div>
                </div>
  
                {/* 뉴스 내용 */}
                <div className="w-full h-[50px] bg-gray03 rounded-md mt-4"></div>
  
                {/* 좋아요, 북마크, 연결 영역 */}
                <div className="flex justify-end py-[12px]">
                  <div className="flex w-[142px] justify-between text-[12px]">
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <div className="w-[20px] h-[20px] bg-gray03 rounded-full"></div>
                      <span className="w-[20px] h-[15px] bg-gray03 rounded-md"></span>
                    </div>
                    <div className="w-[37px] h-[15px] flex items-center justify-between">
                      <div className="w-[20px] h-[20px] bg-gray03 rounded-full"></div>
                      <span className="w-[20px] h-[15px] bg-gray03 rounded-md"></span>
                    </div>
                    <div className="w-[41px] h-[15px] flex items-center justify-between">
                      <div className="w-[20px] h-[20px] bg-gray03 rounded-full"></div>
                      <span className="w-[20px] h-[15px] bg-gray03 rounded-md"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  