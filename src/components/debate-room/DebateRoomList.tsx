import categoryIcons from "../../assets/icons/category/categoryIcon";
import { DebateRoomType } from "../../types/debateRoomType";
// 목업 데이터
const mockDebateRooms: DebateRoomType[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i + 1,
    title: "인공지능이 인간의 일자리를 대체할 것인가?",
    categoryType: "정치",
    memberNumberType: i % 2 === 0 ? 3 : 1,
    speakingTimeSeconds: 300,
    speakingCount: Math.floor(Math.random() * 3) + 1,
  })
);

export default function DebateRoomList() {
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
        {mockDebateRooms.map((room) => (
          <tr key={room.id} className="border-b ">
            <td className="p-3 flex items-center justify-center space-x-2 text-[16px]">
              <span className="px-2 py-1 bg-gray-300 text-gray01  shadow-lg text-[16px] rounded flex items-center gap-2">
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
