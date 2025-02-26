import { axiosInstance } from "./axios";

const fetchMyProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/users/userInfo");
    return response.data;
  } catch (error) {
    console.error("유저 프로필 불러오기 실패:", error);
    throw error;
  }
};


const fetchLikedNews = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/mypage/${userId}/likes`);
    return response.data;
  } catch (error) {
    console.error("좋아요한 뉴스 불러오기 실패:", error);
    throw error;
  }
};



export const userApi = {
  fetchMyProfile,
  fetchLikedNews
};