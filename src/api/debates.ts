import { axiosInstance } from "./axios";
const getTopDebaters = async (
  searchTerm: string = ""
): Promise<DebaterType[]> => {
  try {
    const response = await axiosInstance.get("/api/users/followers", {
      params: searchTerm ? { query: searchTerm } : {},
    });
    return response.data.data.map((debater: DebaterType) => ({
      ...debater,
      wins: debater.wins ?? 0,
      draws: debater.draws ?? 0,
      losses: debater.losses ?? 0,
    }));
  } catch (error) {
    throw error;
  }
};

interface FinishedDebatesResponse {
  status: string;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: DebateRoomInfoRaw[]; // API 응답 데이터 구조
  };
}

interface DebateRoomInfoRaw {
  uuid: string; // 기존 `roomId` -> `uuid` 변경
  title: string;
  description: string;
  categoryType: string;
  continentType: string;
  memberNumberType: number; // 기존 `member` → `memberNumberType`
  timeType: number; // 기존 `time` → `timeType`
  speakCountType: number; // 기존 `speakingCount` → `speakCountType`
  proUsers: Participant[];
  conUsers: Participant[];
  status: "CLOSED";
}

interface DebateRoomInfo {
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
}
interface Participant {
  id: number;
  email: string;
  nickname: string;
  introduction: string;
  profileUrl: string;
  winNumber: number;
  drawNumber: number;
  defeatNumber: number;
  position: "PRO" | "CON";
}

const getFinishedDebates = async (
  searchTerm: string = "",
  continent: string = "",
  category: string = "",
  member: string = "",
  page: number = 1,
  sort: string = "recent"
): Promise<{ content: DebateRoomInfo[]; totalPages: number }> => {
  try {
    const response = await axiosInstance.get<FinishedDebatesResponse>(
      "/api/debates/debateRoom/finished",
      {
        params: {
          q: searchTerm,
          continent,
          category,
          member,
          p: page,
          sort,
        },
      }
    );

    console.log("API 응답:", response.data);

    const data = response.data.data;

    return {
      content: data.content.map((room: DebateRoomInfoRaw): DebateRoomInfo => {
        // 🔹 초 단위 계산 (웹소켓과 동일)
        const totalSeconds = room.timeType * room.speakCountType;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedTime = `${minutes > 0 ? `${minutes}분` : ""} ${
          seconds > 0 ? `${seconds}초` : ""
        }`.trim();

        return {
          roomId: room.uuid,
          title: room.title,
          description: room.description,
          categoryType: room.categoryType,
          continentType: room.continentType,
          member: room.memberNumberType,
          time: formattedTime, // ✅ 변환된 시간 적용 (웹소켓과 동일)
          speakingCount: room.speakCountType.toString(), // ✅ 숫자를 문자열로 변환
          proUsersCount: room.proUsers.length,
          conUsersCount: room.conUsers.length,
        };
      }),
      totalPages: data.totalPages || 1,
    };
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};
export const debatesAPI = {
  getTopDebaters,
  getFinishedDebates,
};
