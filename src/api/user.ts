import { axiosInstance } from "./axios";

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
const updateUserProfile = async (userId: number, data: Partial<ProfileUpdate>) => {
  const formData = new FormData();

  // 변경된 값만 추가
  if (data.file) formData.append("file", data.file);
  if (data.nickname) formData.append("nickname", data.nickname);
  if (data.introduction) formData.append("introduction", data.introduction);

  try {
    const response = await axiosInstance.put(
      `/api/users/mypage/${userId}`,
      formData, // Request body
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("사용자 프로필 업데이트 실패:", error);
    throw error;
  }
};

// 유저 프로필
const fetchUserProfile = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("유저 프로필 불러오기 실패", error);
  }
};

// 좋아요된 뉴스
const fetchLikedNews = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/mypage/${userId}/likes`
    );
    return response.data;
  } catch (error) {
    console.error("좋아요한 뉴스 불러오기 실패:", error);
    throw error;
  }
};

// 북마크된 뉴스
const fetchMarkedNews = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/mypage/${userId}/bookmarks`
    );
    return response.data;
  } catch (error) {
    console.error("북마크한 뉴스 불러오기 실패:", error);
    throw error;
  }
};

// 참여한 토론방 목록
const fetchArchivedDebateList = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/mypage/${userId}/debates`
    );
    return response.data;
  } catch (error) {
    console.error("참여한 토론방 목록 가져오기 실패:", error);
  }
};

// 아카이브된 토론방 상세
const fetchArchivedDebateDetails = async (debateId: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/mypage/${debateId}/debateChats`
    );
    return response.data;
  } catch (error) {
    console.error("아카이브된 토론방 불러오기 실패:", error);
    throw error;
  }
};

// 팔로워 조회
const fetchFollowers = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/mypage/${userId}/followers`
    );
    return response.data;
  } catch (error) {
    console.error("팔로워 목록 불러오기 실패:", error);
    throw error;
  }
};

// 팔로잉 조회
const fetchFollowees = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/mypage/${userId}/followees`
    );
    return response.data;
  } catch (error) {
    console.error("팔로잉 목록 불러오기 실패:", error);
    throw error;
  }
};

// 팔로잉 추가
const insertFollower = async (targetUserId: number) => {
  try {
    const userInforResponse = await fetchMyProfile()
    const response = await axiosInstance.post(
      `/api/users/mypage/${targetUserId}/${userInforResponse.data.id}/insertfollowers`
    );
    return response.data;
  } catch (error) {
    console.error("팔로우 추가 실패:", error);
    throw error;
  }
};

// 팔로잉 삭제
const deleteFollower = async (userId: number) => {
  try {
    const userInforResponse = await fetchMyProfile()
    const response = await axiosInstance.delete(
      `/api/users/mypage/${userId}/${userInforResponse.data.id}/deletefollowers`
    );
    return response.data;
  } catch (error) {
    console.error("팔로우 삭제 실패:", error);
    throw error;
  }
};



export const userApi = {
  fetchMyProfile,
  fetchUserProfile,
  updateUserProfile,
  fetchLikedNews,
  fetchMarkedNews,
  fetchArchivedDebateList,
  fetchArchivedDebateDetails,
  fetchFollowers,
  fetchFollowees,
  insertFollower,
  deleteFollower,
};
