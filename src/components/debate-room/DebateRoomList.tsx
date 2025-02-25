import { useEffect, useState } from "react";
import DebateRoomSkeleton from "../common/skeleton/debate/DebateRoomSkeleton";
import categoryIcons from "../../assets/icons/category/categoryIcon";

const mockFetchDebateRooms = () =>
  new Promise<DebateRoomType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: "인공지능이 인간의 일자리를 대체할 것인가?",
          categoryType: "정치",
          memberNumberType: i % 2 === 0 ? 3 : 1,
          speakingTimeSeconds: 300,
          speakingCount: Math.floor(Math.random() * 3) + 1,
        }))
      );
    }, 2000); // 2초 후 데이터 로드
  });

export default function DebateRoomList() {
  const [debateRooms, setDebateRooms] = useState<DebateRoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockFetchDebateRooms().then((data) => {
      setDebateRooms(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <DebateRoomSkeleton />
      ) : (
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
            {debateRooms.map((room) => (
              <tr
                key={room.id}
                className="border-b text-center whitespace-nowrap"
              >
                <td className="p-3 flex items-center justify-center gap-2">
                  <span className="px-2 py-1 bg-gray-300 text-gray01 rounded flex items-center gap-2">
                    {room.categoryType}
                    {categoryIcons[room.categoryType]?.gray && (
                      <img
                        src={categoryIcons[room.categoryType].gray}
                        alt={`${room.categoryType} 아이콘`}
                        className="w-5 h-5"
                      />
                    )}
                  </span>
                </td>
                <td className="p-3 rounded-lg shadow-inner">{room.title}</td>
                <td className="p-3 rounded-lg shadow-inner">
                  <span className="px-3 py-1 border rounded-lg shadow-inner">
                    {room.speakingCount} | {room.speakingCount}
                  </span>
                </td>
                <td className="p-3 rounded-lg shadow-inner">
                  <span className="px-3 py-1 border rounded-lg shadow-inner">
                    {room.speakingTimeSeconds / 60}분
                  </span>
                </td>
                <td className="p-3 rounded-lg shadow-inner">
                  <span className="px-3 py-1 border rounded-lg shadow-inner">
                    {room.memberNumberType} : {room.memberNumberType}
                  </span>
                </td>
                <td className="p-3 flex space-x-2 justify-center">
                  <button
                    className={`px-3 py-1 text-white rounded-md ${
                      room.speakingCount === 3
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-[#0044aa]"
                    }`}
                  >
                    찬성
                  </button>
                  <button
                    className={`px-3 py-1 text-white rounded-md ${
                      room.speakingCount === 3
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-[#0044aa]"
                    }`}
                  >
                    반대
                  </button>
                  <button className="px-3 py-1 bg-blue03 text-white rounded-md hover:bg-[#0044aa]">
                    참관
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 모바일 */}
      <div className="md:hidden flex flex-col gap-4">
        {isLoading ? (
          <DebateRoomSkeleton />
        ) : (
          debateRooms.map((room) => (
            <div key={room.id} className=" p-4 border-b-[2px]  border-gray02 ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{room.title}</span>
              </div>

              <div className="flex justify-between items-center text-center text-gray-700 mb-3">
                <span className="px-2 py-1 bg-gray-300 text-gray01 rounded flex items-center gap-2">
                  {room.categoryType}
                  {categoryIcons[room.categoryType]?.gray && (
                    <img
                      src={categoryIcons[room.categoryType].gray}
                      alt={`${room.categoryType} 아이콘`}
                      className="w-5 h-5"
                    />
                  )}
                </span>
                <span className="px-3 py-1 border rounded-lg shadow-inner">
                  {room.speakingCount} | {room.speakingCount}
                </span>
                <span className="px-3 py-1 border rounded-lg shadow-inner">
                  {room.speakingTimeSeconds / 60}분
                </span>
                <span className="px-3 py-1 border rounded-lg shadow-inner">
                  {room.memberNumberType} : {room.memberNumberType}
                </span>
              </div>

              <div className="flex space-x-2 justify-end">
                <button
                  className={`px-3 py-1 text-white rounded-md ${
                    room.speakingCount === 3
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-[#0044aa]"
                  }`}
                >
                  찬성
                </button>
                <button
                  className={`px-3 py-1 text-white rounded-md ${
                    room.speakingCount === 3
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-[#0044aa]"
                  }`}
                >
                  반대
                </button>
                <button className="px-3 py-1 bg-blue03 text-white rounded-md hover:bg-[#0044aa]">
                  참관
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
