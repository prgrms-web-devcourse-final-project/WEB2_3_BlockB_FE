import { axiosInstance } from "./axios";

/**
 * 모든 뉴스의 정보를 param에 따라 가져오는 함수
 * @param sort 정렬 - 최신순, 인기순
 * @param q 검색어 - 제목, 내용 기준
 * @param cursor 마지막 뉴스 데이터의 id
 * @returns 뉴스 데이터 12개 (cursor가 있는 경우 다음 12개)
 */

const getAllNews = async (sort?: string, q?: string, cursor?: number) => {
  try {
    const params: { sort?: string; q?: string; cursor?: number } = {};

    if (sort) params.sort = sort;
    if (q) params.q = q;
    if (cursor) params.cursor = cursor;

    const response = await axiosInstance.get("/api/news", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 인기순 정렬 10개 뉴스 데이터 반환하는 함수
 * @returns 뉴스 인기순 10개 데이터
 */
const getNewsTop10 = async () => {
  try {
    const response = await axiosInstance.get("/api/news/ranking");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 해당 뉴스의 디테일한 정보를 반환하는 함수(내가 좋아요 또는 북마크를 했는지 안 했는지 알 수 있음)
 * @param newsId 뉴스 아이디
 * @param userId 유저 아이디
 * @returns 디테일한 뉴스 정보
 */
const getNewsDetail = async (newsId: number, userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/news/${newsId}`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 뉴스 좋아요하는 함수
 * @param newsId 뉴스 아이디
 * @param userId 유저 아이디
 */
const postNewsLike = async (newsId: number, userId: number) => {
  try {
    await axiosInstance.post(`/api/news/${newsId}/like`, null, {
      params: { userId },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * 뉴스 좋아요 삭제 함수
 * @param newsId 뉴스 아이디
 * @param userId 유저 아이디
 */
const deleteNewsLike = async (newsId: number, userId: number) => {
  try {
    await axiosInstance.delete(`/api/news/${newsId}/like`, {
      params: { userId },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * 뉴스 북마크하는 함수
 * @param newsId 뉴스 아이디
 * @param userId 유저 아이디
 */
const postNewsBookmark = async (newsId: number, userId: number) => {
  try {
    await axiosInstance.post(`/api/news/${newsId}/bookmark`, null, {
      params: { userId },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * 뉴스 북마크하는 함수
 * @param newsId 뉴스 아이디
 * @param userId 유저 아이디
 */
const deleteNewsBookmark = async (newsId: number, userId: number) => {
  try {
    await axiosInstance.delete(`/api/news/${newsId}/bookmark`, {
      params: { userId },
    });
  } catch (error) {
    throw error;
  }
};

export const newsAPI = {
  getAllNews,
  getNewsTop10,
  getNewsDetail,
  postNewsLike,
  deleteNewsLike,
  postNewsBookmark,
  deleteNewsBookmark,
};
