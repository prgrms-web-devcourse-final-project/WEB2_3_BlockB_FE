export function DebateSimpleInfoSkeleton() {
    return (
      <div className="w-full h-[77px] flex justify-between items-center px-[19px] rounded-[10px] bg-gray-200 animate-pulse">
        <div className="flex h-[43px] items-center">
          <div className="w-[30px] h-[20px] bg-gray-300 rounded"></div>
          <div className="w-[30px] h-[30px] bg-gray-300 rounded mx-[19px]"></div>
          <div className="w-[200px] h-[20px] bg-gray-300 rounded"></div>
        </div>
        <div className="flex h-[27px] space-x-2">
          <div className="w-[52px] h-[27px] bg-gray-300 rounded"></div>
          <div className="w-[52px] h-[27px] bg-gray-300 rounded"></div>
          <div className="w-[42px] h-[27px] bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
  
  export function DebateSimpleInfosSkeleton({ count = 5 }: { count?: number }) {
    return (
      <div className="flex flex-col space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <DebateSimpleInfoSkeleton key={index} />
        ))}
      </div>
    );
  }
  