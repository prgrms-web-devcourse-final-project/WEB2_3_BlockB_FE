import { useEffect, useState } from "react";

import categoryIcons from "../../assets/icons/category/categoryIcon";

// 목업 데이터 (실제 API 호출 대신 setTimeout으로 2초 후 데이터 로드| 스켈레톤 테스트)
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
    <table className="w-full border-collapse rounded-t-lg overflow-hidden">
      <thead className="bg-gray02 border-b rounded-t-lg">
        <tr className="text-gray-700 text-center">
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
        {isLoading
          ? // 스켈레톤 UI
            Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-b animate-pulse">
                <td className="p-3">
                  <div className="w-20 h-6 bg-gray03 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="w-56 h-6 bg-gray03 rounded"></div>
                </td>
                <td className="p-3 text-center">
                  <div className="w-14 h-6 bg-gray03 rounded"></div>
                </td>
                <td className="p-3 text-center">
                  <div className="w-16 h-6 bg-gray03 rounded"></div>
                </td>
                <td className="p-3 text-center">
                  <div className="w-16 h-6 bg-gray03 rounded"></div>
                </td>
                <td className="p-3 flex space-x-2 items-center justify-end">
                  <div className="w-16 h-8 bg-gray03 rounded"></div>
                  <div className="w-16 h-8 bg-gray03 rounded"></div>
                  <div className="w-16 h-8 bg-gray03 rounded"></div>
                </td>
              </tr>
            ))
          : // 실제 데이터
            debateRooms.map((room) => (
              <tr key={room.id} className="border-b">
                <td className="p-3 flex items-center justify-center space-x-2 text-[16px]">
                  <span className="px-2 py-1 bg-gray-300 text-gray01 text-[16px] rounded flex items-center gap-2">
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
                <td className="p-3 text-[16px]">{room.title}</td>
                <td className="p-3 text-center text-[16px]">
                  <div className="border rounded-lg shadow-inner">
                    {room.speakingCount} | {room.speakingCount}
                  </div>
                </td>
                <td className="p-3 text-center text-[16px]">
                  <div className="border rounded-lg shadow-inner">
                    {room.speakingTimeSeconds / 60}분
                  </div>
                </td>
                <td className="p-3 text-center text-[16px]">
                  <div className="border rounded-lg shadow-inner">
                    {room.memberNumberType} : {room.memberNumberType}
                  </div>
                </td>
                <td className="p-3 flex space-x-2 items-center justify-end">
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
  );
}
