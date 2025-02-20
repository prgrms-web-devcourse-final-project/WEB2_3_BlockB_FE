export default function MyPageSkeleton() {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="w-[960px] h-[790px] mt-[8px] font-pretendard">
        <div className="flex">
          <div className="mr-10 w-[200px] h-[200px] bg-gray03 rounded-[65px]" />
          <div className="w-[550px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold text-[20px]">
                <div className="h-6 bg-gray03 rounded w-24" />
                <div className="bg-gray03 w-24 h-9 rounded-[10px]" />
              </div>
              <div className="h-4 bg-gray03 rounded w-[300px] mt-2" />
            </div>
            <div className="flex w-[550px] justify-between mt-6">
              {["W", "D", "L"].map((_, index) => (
                <div
                  key={index}
                  className="w-[160px] h-[135px] border border-solid border-white02 rounded-2xl bg-white pl-6 pt-4"
                >
                  <div className="h-4 bg-gray03 rounded w-16 mb-2" />
                  <div className="flex justify-between">
                    <div className="w-16 h-12 bg-gray03 rounded" />
                    <div className="w-16 h-12 bg-gray03 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[52px] mb-4 w-[344px] flex justify-between">
          <div className="w-[92px] h-10 rounded-[10px] bg-gray03" />
          <div className="w-[92px] h-10 rounded-[10px] bg-gray03" />
          <div className="w-[92px] h-10 rounded-[10px] bg-gray03" />
        </div>
        <hr className="w-full bg-gray03 h-[2px] mb-3" />

        <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded"></div>
        <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded"></div>
        <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded"></div>
        <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded"></div>
        <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded"></div>
        <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded"></div>
      </div>
    </div>
  );
}
