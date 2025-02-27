// import { axiosInstance } from "./axios";

import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5M2E2OGExNy1hODg3LTQwZGItOGY5MC04NzhiMWY4NjQ1MjNAc29jaWFsVXNlci5jb20iLCJhdXRob3JpdHkiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQwNjE5NDEyLCJleHAiOjE3NDA2MjMwMTJ9.CZ1a9uCVjgimiErq7ENeeRy74OXVM1NnKjBCUAQsLE2B7j4-sqGv60VSZuyaX5Xgo2ci0xUK9nPMxdnG5MZt_A", // TODO: 로그인 전 임시 - axios interceptor 통해 동적 추가되도록 변경
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
    const response = await axiosInstance.get(`/api/users/mypage/${userId}/${followeeId}/insertFollowees`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

// 팔로잉 삭제
const deleteFollowees = async (userId: number, followeeId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/mypage/${userId}/${followeeId}/deleteFollowees`)
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error)
    throw error
  }
}

export const userApi = {
  fetchMyProfile,
  fetchUserProfile,
  fetchLikedNews,
  fetchMarkedNews,
  fetchArchivedDebates,
  fetchFollowers,
  fetchFollowees,
  insertFollowees,
  deleteFollowees,
};
