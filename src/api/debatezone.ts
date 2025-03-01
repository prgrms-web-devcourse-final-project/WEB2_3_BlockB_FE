import { axiosInstance } from "./axios";

// ✅ 토론방 생성
const generateDebateRoom = async (initialRoomInfo: NewsData) => {
    // const { 
    //     newsId, 
    //     title, 
    //     news: { createdAt, updatedAt, id, title: newsTitle, content, link, imgUrl, newsType, continent: newsContinent, deliveryTime }, 
    //     description, 
    //     memberNumber, 
    //     continent, // 여기 중복 선언 문제 해결
    //     category, 
    //     time, 
    //     speakCount, 
    //     resultEnabled, 
    //     endTime
    // }:NewsData = initialRoomInfo;
    
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