import { axiosInstance } from "./axios";

// ✅ 토론방 생성
const generateDebateRoom = async (initialRoomInfo: NewsData) => {
    try {
        const response = await axiosInstance.post("/api/chat/create", initialRoomInfo)
        return response.data
    } catch (error) {
        console.error("❌ 토론방 생성에 실패했습니다", error);
    }
};

export const debateRoomApi = {
    generateDebateRoom
}