import DebateRoomSkeleton from "../common/skeleton/debate/DebateRoomSkeleton";
import categoryIcons from "../../assets/icons/category/categoryIcon";
import { useNavigate } from "react-router-dom";

type DebateRoomListProps = {
  debateRooms: any[]; // <= DebateRoom 타입
  isFinished: boolean;
  isLoading: boolean;
};

export type DebateRoom = {
  roomId: string;
  title: string;
  description: string;
  categoryType: string;
  continentType: string;
  member: number;
  time: string;
  speakingCount: string;
  proUsersCount: number;
  conUsersCount: number;
};
// 카테고리 변환 매핑
const categoryMapping: { [key: string]: string } = {
  PO: "정치",
  EC: "경제",
  SO: "사회",
  CU: "문화",
  EN: "연예",
  SP: "스포츠",
  IT: "IT",
  CO: "칼럼",
  ETC: "기타",
};

export default function DebateRoomList({
  debateRooms,
  isLoading,
  isFinished,
}: DebateRoomListProps & { isFinished: boolean }) {
  const navigate = useNavigate();

  if (isLoading) {
    return <DebateRoomSkeleton />;
  }
  if (!isLoading && debateRooms.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>현재 표시할 토론방이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {/* 데스크톱 */}
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
          {debateRooms.map((room) => {
            const categoryName = categoryMapping[room.categoryType] || "기타";
            return (
              <tr
                key={room.roomId}
                className="border-b text-center whitespace-nowrap"
              >
                <td className="p-3 flex items-center justify-center gap-2">
                  <span className="px-2 py-1 bg-gray-300 text-gray01 rounded flex items-center gap-2">
                    {categoryName}
                    {categoryIcons[categoryName]?.gray && (
                      <img
                        src={categoryIcons[categoryName].gray}
                        alt={`${categoryName} 아이콘`}
                        className="w-5 h-5"
                      />
                    )}
                  </span>
                </td>
                <td className="p-3 rounded-lg">{room.title}</td>
                <td className="p-3 rounded-lg">
                  <span className="px-3 py-1 border rounded-lg">
                    {room.proUsersCount} | {room.conUsersCount}
                  </span>
                </td>
                <td className="p-3 rounded-lg">
                  <span className="px-3 py-1 border rounded-lg">
                    {room.time}
                  </span>
                </td>
                <td className="p-3 rounded-lg">
                  <span className="px-3 py-1 border rounded-lg">
                    {room.member} : {room.member}
                  </span>
                </td>
                <td className="p-3 flex space-x-2 justify-center">
                  <button
                    disabled={isFinished || room.proUsersCount === room.member}
                    className={`px-3 py-1 text-white rounded-md ${
                      isFinished || room.proUsersCount === room.member
                        ? "bg-gray03 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-[#0044aa]"
                    }`}
                    onClick={() =>
                      !isFinished &&
                      navigate(`/debate-zone/${room.roomId}`, {
                        state: { stance: "pro" },
                      })
                    }
                  >
                    찬성
                  </button>
                  <button
                    disabled={isFinished || room.conUsersCount === room.member}
                    className={`px-3 py-1 text-white rounded-md ${
                      isFinished || room.conUsersCount === room.member
                        ? "bg-gray03 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-[#0044aa]"
                    }`}
                    onClick={() =>
                      !isFinished &&
                      navigate(`/debate-zone/${room.roomId}`, {
                        state: { stance: "con" },
                      })
                    }
                  >
                    반대
                  </button>
                  <button
                    className="px-3 py-1 bg-blue03 text-white rounded-md hover:bg-[#0044aa]"
                    onClick={() => navigate(`/observing-zone/${room.roomId}`)}
                  >
                    참관
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 모바일 */}
      <div className="md:hidden flex flex-col gap-4">
        {debateRooms.map((room) => {
          const categoryName = categoryMapping[room.categoryType] || "기타";
          return (
            <div key={room.roomId} className="p-4 border-b-[2px] border-gray02">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{room.title}</span>
              </div>
              <div className="flex justify-between items-center text-center text-gray-700 mb-3">
                <span className="px-2 py-1 bg-gray-300 text-gray01 rounded flex items-center gap-2">
                  {categoryName}
                  {categoryIcons[categoryName]?.gray && (
                    <img
                      src={categoryIcons[categoryName].gray}
                      alt={`${categoryName} 아이콘`}
                      className="w-5 h-5"
                    />
                  )}
                </span>
                <span className="px-3 py-1 border rounded-lg">
                  {room.proUsersCount} | {room.conUsersCount}
                </span>
                <span className="px-3 py-1 border rounded-lg">{room.time}</span>
                <span className="px-3 py-1 border rounded-lg">
                  {room.member} : {room.member}
                </span>
              </div>
              <div className="flex space-x-2 justify-end">
                <button
                  disabled={isFinished || room.proUsersCount === room.member}
                  className={`px-3 py-1 text-white rounded-md ${
                    isFinished || room.proUsersCount === room.member
                      ? "bg-gray03 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-[#0044aa]"
                  }`}
                  onClick={() =>
                    !isFinished &&
                    navigate(`/debate-zone/${room.roomId}`, {
                      state: { stance: "pro" },
                    })
                  }
                >
                  찬성
                </button>
                <button
                  disabled={isFinished || room.conUsersCount === room.member}
                  className={`px-3 py-1 text-white rounded-md ${
                    isFinished || room.conUsersCount === room.member
                      ? "bg-gray03 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-[#0044aa]"
                  }`}
                  onClick={() =>
                    !isFinished &&
                    navigate(`/debate-zone/${room.roomId}`, {
                      state: { stance: "con" },
                    })
                  }
                >
                  반대
                </button>
                <button
                  className="px-3 py-1 bg-blue03 text-white rounded-md hover:bg-[#0044aa]"
                  onClick={() => navigate(`/observing-zone/${room.roomId}`)}
                >
                  참관
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
