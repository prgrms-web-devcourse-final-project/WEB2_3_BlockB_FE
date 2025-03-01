import { axiosInstance } from "./axios";

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
const fetchWaitingRoomInfo = async (roomId: number) => {
    try {
        const response = await axiosInstance.get(`/api/debates/observer/waitroom/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 대기실 정보를 불러오지 못했습니다", error);
    }
};

// ✅ 토론중 토론방 정보 가져오기
const fetchOngoingRoomInfo = async (roomId: number) => {
    try {
        const response = await axiosInstance.get(`/api/debates/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 진행 중인 토론방 정보를 불러오지 못했습니다", error);
    }
};

// ✅ 토론중 토론방 참관자용 정보 가져오기
const fetchObserverOngoingRoomInfo = async (roomId: number) => {
    try {
        const response = await axiosInstance.get(`/api/debates/observer/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 진행 중인 토론방(참관자용) 정보를 불러오지 못했습니다", error);
    }
};

// ✅ 토론방 채팅 신고 - 참여자용 (유저 신고와 별도)
const reportInRoomByDebater = async (roomId: number) => {
    try {
        const response = await axiosInstance.post(`/api/debates/reports/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 토론 중 채팅 신고(참여자용)에 실패했습니다", error);
    }
};

// ✅ 토론방 채팅 신고 - 참관자용 (유저 신고와 별도)
const reportInRoomByObserver = async (roomId: number) => {
    try {
        const response = await axiosInstance.post(`/api/observer/reports/${roomId}`); 
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 토론 중 채팅 신고(참관자용)에 실패했습니다", error);
    }
};

// ✅ 토론 후 투표하기
const sendDebateVote = async (roomId: number) => {
    try {
        const response = await axiosInstance.put(`/api/debates/vote/${roomId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 토론 투표에 실패했습니다", error);
    }
};

// ✅ 투표 조회
const fetchDebateVoteResult = async (roomId: number) => { 
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
