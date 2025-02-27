// import { axiosInstance } from "./axios";

import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5M2E2OGExNy1hODg3LTQwZGItOGY5MC04NzhiMWY4NjQ1MjNAc29jaWFsVXNlci5jb20iLCJhdXRob3JpdHkiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQwNjMyNTc1LCJleHAiOjE3NDA2MzYxNzV9.GcsTOytnF2WtCmXibPbdzs-ZyKHY_xY7R3ibzREk6_w8kU75mH5C_5S9KWsejkYgeoLsul8dYZL0k0Vf_3FIqA"
  },
});

// 마이프로필
const fetchMyProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/users/userInfo");
    return response.data;
  } catch (error) {
    console.error("마이 프로필 불러오기 실패:", error);
    throw error;
  }
};

// 프로필 수정
const updateUserProfile = async (userId: number, data: ProfileUpdate) => {
  try {
    const response = await axiosInstance.put(`/api/users/mypage/${userId}`, null, { params: data });
    return response.data;
  } catch (error) {
    console.error("사용자 프로필 업데이트 실패:", error);
    throw error;
  }
};


// 유저 프로필
const fetchUserProfile = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`)
    return response.data;
  } catch (error) {
    console.error("유저 프로필 불러오기 실패", error)
  }
}

// 좋아요된 뉴스
const fetchLikedNews = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/mypage/${userId}/likes`);
    return response.data;
  } catch (error) {
    console.error("좋아요한 뉴스 불러오기 실패:", error);
    throw error;
  }
};

// 북마크된 뉴스
const fetchMarkedNews = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/mypage/${userId}/bookmarks`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

// 아카이브된 토론방
const fetchArchivedDebates = async (debateId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/mypage/${debateId}/debateChats`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

// 팔로워 조회
const fetchFollowers = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/mypage/${userId}/followers`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

// 팔로잉 조회
const fetchFollowees = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/mypage/${userId}/followees`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

// 팔로잉 추가
const insertFollowees = async (userId: number, followeeId: number) => {
  try {
    const response = await axiosInstance.post(`/api/users/mypage/${userId}/${followeeId}/insertFollowees`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

// 팔로잉 삭제
const deleteFollowees = async (userId: number, followeeId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/users/mypage/${userId}/${followeeId}/deleteFollowees`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

export const userApi = {
  fetchMyProfile,
  fetchUserProfile,
  updateUserProfile,
  fetchLikedNews,
  fetchMarkedNews,
  fetchArchivedDebates,
  fetchFollowers,
  fetchFollowees,
  insertFollowees,
  deleteFollowees,
};
