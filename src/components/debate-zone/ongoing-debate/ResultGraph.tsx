export default function ResultGraph({
  isWatingResult,
  prosPercentage = 0,
  consPercentage = 0,
  noVotePercentage = 0,
}: {
  isWatingResult: boolean;
  prosPercentage?: number;
  consPercentage?: number;
  noVotePercentage?: number;
}) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-[20px] font-pretendard px-[20px]">
      {/* 찬성 막대 */}
      <div className="mb-2">
        <p className="text-white mb-1">찬성 ({prosPercentage}%)</p>
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
          <div
            className={`bg-blue-500 h-6 rounded-full text-white text-sm font-bold flex items-center justify-end pr-2`}
            style={{
              width: isWatingResult ? "0%" : `${prosPercentage}%`,
              transition: 'width 1s ease-in-out', 
            }}
          >
            {prosPercentage}%
          </div>
        </div>
      </div>

      {/* 반대 막대 */}
      <div>
        <p className="text-white mb-1">반대 ({consPercentage}%)</p>
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
          <div
            className={`bg-red-500 h-6 rounded-full text-white text-sm font-bold flex items-center justify-end pr-2`}
            style={{
              width: isWatingResult ? "0%" : `${consPercentage}%`,
              transition: 'width 1s ease-in-out', 
              transitionDelay: '0.2s', 
            }}
          >
            {consPercentage}%
          </div>
        </div>
      </div>

      {/* 기권 막대 */}
      <div>
        <p className="text-white mb-1">기권 ({noVotePercentage}%)</p>
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
          <div
            className={`bg-blue-300 h-6 rounded-full text-white text-sm font-bold flex items-center justify-end pr-2`}
            style={{
              width: isWatingResult ? "0%" : `${noVotePercentage}%`,
              transition: 'width 1s ease-in-out', 
              transitionDelay: '0.4s', 
            }}
          >
            {noVotePercentage}%
          </div>
        </div>
      </div>
    </div>
  );
}
