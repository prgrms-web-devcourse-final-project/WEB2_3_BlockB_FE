import { axiosInstance } from "./axios";
import { userApi } from "./user";

// ✅ 토론방 생성
const generateDebateRoom = async (initialRoomInfo: RoomInfoRequest) => {
    try {
        const response = await axiosInstance.post("/api/chat/create", initialRoomInfo);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 토론방 생성에 실패했습니다", error);
    }
};

// ✅ 토론방 대기실 참관자용 토론 정보 가져오기
const fetchWaitingRoomInfo = async (roomId: string) => {
    try {
        const response = await axiosInstance.get(`/api/debates/waitroom/${roomId}`);
        console.log("🍭 대기자 토론정보 가져오기")
        return response.data;
    } catch (error) {
        console.error("❌ 대기실 정보를 불러오지 못했습니다", error);
    }
};

// ✅ 토론중 토론방 정보 가져오기
const fetchOngoingRoomInfo = async (roomId: string) => {
    try {
        const response = await axiosInstance.get(`/api/debates/${roomId}`);
        return response.data;
    } catch (error) {
        console.error("❌ 진행 중인 토론방 정보를 불러오지 못했습니다", error);
    }
};

// ✅ 토론중 토론방 참관자용 정보 가져오기
const fetchObserverOngoingRoomInfo = async (roomId: string) => {
    try {
        const response = await axiosInstance.get(`/api/debates/observer/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 진행 중인 토론방(참관자용) 정보를 불러오지 못했습니다", error);
    }
};

// ✅ 토론방 채팅 신고 - 참여자용 (유저 신고와 별도)
const reportInRoomByDebater = async (roomId: string) => {
    try {
        const response = await axiosInstance.post(`/api/debates/reports/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 토론 중 채팅 신고(참여자용)에 실패했습니다", error);
    }
};

// ✅ 토론방 채팅 신고 - 참관자용 (유저 신고와 별도)
const reportInRoomByObserver = async (roomId: string) => {
    try {
        const response = await axiosInstance.post(`/api/observer/reports/${roomId}`); 
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 토론 중 채팅 신고(참관자용)에 실패했습니다", error);
    }
};

// ✅ 토론 후 투표하기
const sendDebateVote = async (roomId: string, stance: string) => {
    const userInfoResponse = await userApi.fetchMyProfile();
    const requestBody = {
        vote: stance,
        userId: userInfoResponse.data.id,
    };

    console.log("📝 요청 본문:", requestBody); // ✅ 디버깅용 로그 추가
    console.log("📡 요청 URL:", `/api/debates/vote/${roomId}`);

    try {
        const response = await axiosInstance.put(`/api/debates/vote/${roomId}`, requestBody);
        console.log("✅ 투표 성공! 응답 데이터:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 토론 투표 요청 실패", error);
    }
};


// ✅ 투표 조회
const fetchDebateVoteResult = async (roomId: string) => { 
    try {
        const response = await axiosInstance.get(`/api/debates/vote/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 투표 결과를 불러오지 못했습니다", error);
    }
};

export const debateRoomApi = {
    generateDebateRoom,
    fetchWaitingRoomInfo,
    fetchOngoingRoomInfo,
    fetchObserverOngoingRoomInfo,
    reportInRoomByDebater,
    reportInRoomByObserver,
    sendDebateVote,
    fetchDebateVoteResult,
};
