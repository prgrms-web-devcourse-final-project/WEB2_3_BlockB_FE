import { axiosInstance } from "./axios";
import { speakCountMap, timeMap } from "../constants";
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
    content: DebateRoomInfoRaw[];
  };
}

interface DebateRoomInfoRaw {
  roomId: number;
  title: string;
  description: string;
  memberNumberType: number;
  categoryType: string;
  continentType: string;
  newsUrl: string;
  status: "CLOSED";
  timeType: number;
  speakCountType: number;
  proUsers: Participant[];
  conUsers: Participant[];
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
      content: data.content.map(
        (room: DebateRoomInfoRaw): DebateRoomInfo => ({
          roomId: room.roomId.toString(),
          title: room.title,
          description: room.description,
          categoryType: room.categoryType,
          continentType: room.continentType,
          member: room.memberNumberType === 1 ? 1 : 3,
          time: timeMap[room.timeType] ?? "시간 없음",
          speakingCount: speakCountMap[room.speakCountType] ?? "0",
          proUsersCount: room.proUsers.length,
          conUsersCount: room.conUsers.length,
        })
      ),
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
