export default function DebateRoomSkeleton() {
  return (
    <>
      {/* 웹 */}
      <table className="hidden md:table w-full border-collapse rounded-t-lg overflow-hidden">
        <thead className="bg-gray02 border-b rounded-t-lg">
          <tr className="text-gray-700 text-center whitespace-nowrap">
            <th className="p-3 first:rounded-tl-lg last:rounded-tr-lg">
              카테고리
            </th>
            <th className="p-3">방제</th>
            <th className="p-3">찬 | 반</th>
            <th className="p-3">시간</th>
            <th className="p-3">종류</th>
            <th className="p-3 first:rounded-tr-lg last:rounded-tr-lg">
              참여 유형
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b animate-pulse">
              <td className="p-3 text-center">
                <div className="h-6 bg-gray-300 rounded w-[70px]"></div>
              </td>
              <td className="p-3">
                <div className="h-6 bg-gray-300 rounded w-[250px]"></div>
              </td>
              <td className="p-3 text-center">
                <div className="h-6 bg-gray-300 rounded w-[50px]"></div>
              </td>
              <td className="p-3 text-center">
                <div className="h-6 bg-gray-300 rounded w-[60px]"></div>
              </td>
              <td className="p-3 text-center">
                <div className="h-6 bg-gray-300 rounded w-[80px]"></div>
              </td>
              <td className="p-3 flex justify-center space-x-2">
                <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
                <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
                <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  모바일 */}
      <div className="md:hidden flex flex-col gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-4 border-b-[2px] border-gray02 animate-pulse"
          >
            <div className="h-6 bg-gray-300 rounded w-[80%] mb-2"></div>
            <div className="flex justify-between items-center text-center text-gray-700 mb-3">
              <div className="h-6 bg-gray-300 rounded w-[50px]"></div>
              <div className="h-6 bg-gray-300 rounded w-[60px]"></div>
              <div className="h-6 bg-gray-300 rounded w-[60px]"></div>
              <div className="h-6 bg-gray-300 rounded w-[80px]"></div>
            </div>

            <div className="flex space-x-2 justify-end">
              <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
              <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
              <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
