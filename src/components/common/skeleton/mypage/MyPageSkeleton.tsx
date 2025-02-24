export default function MyPageSkeleton() {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="w-[960px] md:h-[790px] mt-20 max-md:mt-10 font-pretendard">
        <div className="flex max-md:flex-col max-md:items-center">
          <div className="md:mr-10 w-[200px] h-[200px] bg-gray03 rounded-[65px] max-lg:w-44 max-lg:h-44  max-md:w-32 max-md:h-32 max-md:rounded-3xl max-md:mb-7" />
          <div className="w-[550px] max-lg:w-[480px] max-md:w-80 flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold max-md:w-80">
                <div className="w-24 h-6 rounded bg-gray03" />
                <div className="bg-gray03 w-24 h-9 rounded-[10px] max-md:w-16 max-md:h-7 max-md:rounded-lg" />
              </div>
              <div className="h-4 bg-gray03 rounded w-[300px] mt-2" />
            </div>
            <div className="flex w-[550px] justify-between mt-6 max-lg:w-[480px] max-md:w-80">
              {["W", "D", "L"].map((_, index) => (
                <div
                  key={index}
                  className="w-[160px] max-lg:w-36 max-md:w-24 h-[135px] max-lg:h-28  max-md:h-20  border border-solid border-white02 rounded-2xl bg-white pl-6 pt-4 max-md:pl-3 max-md:pt-2"
                >
                  <div className="w-16 h-4 mb-2 rounded bg-gray03" />
                  <div className="flex justify-between">
                    <div className="w-16 h-12 rounded bg-gray03" />
                    <div className="w-16 h-12 rounded bg-gray03" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex max-md:justify-center">
          <div className="mt-[32px] mb-4 w-80 flex justify-between max-md:mt-7">
            <div className="w-[92px] h-10 rounded-[10px] bg-gray03" />
            <div className="w-[92px] h-10 rounded-[10px] bg-gray03" />
            <div className="w-[92px] h-10 rounded-[10px] bg-gray03" />
          </div>
        </div>

        <div className="flex justify-center">
          <hr className="w-full bg-gray03 h-[2px] mb-3 max-md:w-80" />
        </div>
        <div className="flex flex-col max-md:items-center">
          <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded max-md:w-80"></div>
          <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded max-md:w-80 max-md:h-[103px]"></div>
          <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded max-md:w-80 max-md:h-[103px]"></div>
          <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded max-md:w-80 max-md:h-[103px]"></div>
          <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded max-md:w-80 max-md:h-[103px]"></div>
          <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded max-md:w-80 max-md:h-[103px]"></div>
          <div className="w-full h-[30px] mb-[30px] bg-gray03 rounded max-md:w-80 max-md:h-[103px]"></div>
        </div>
      </div>
    </div>
  );
}
