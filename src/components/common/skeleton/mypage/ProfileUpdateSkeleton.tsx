export default function ProfileUpdateSkeleton() {
  return (
    <div className="flex justify-center mt-[122px] max-md:mt-14  font-pretendard animate-pulse">
      <div className="w-[500px] h-[500px] flex flex-col justify-between">
        <div className="flex justify-center">
          <div className="w-[200px] h-[200px] max-md:w-36 max-md:h-36 bg-gray03 rounded-full"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-[148px] h-10 bg-gray03 rounded-[10px]"></div>
        </div>
        {[1, 2].map((_, index) => {
          return (
            <div
              className="flex items-center justify-between max-md:flex-col"
              key={index}
            >
              <div className="w-[120px] h-6 bg-gray03 rounded mb-1"></div>
              <div className="w-[366px] h-12 bg-gray03 rounded-lg"></div>
            </div>
          );
        })}

        <div className="flex justify-end h-[60px]">
          <div className="w-[84px] h-11 bg-gray03 rounded-[10px]"></div>
        </div>
      </div>
    </div>
  );
}
