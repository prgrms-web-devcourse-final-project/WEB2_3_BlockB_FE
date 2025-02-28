
// const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import { axiosInstance } from "./axios";

// const axiosInstance = axios.create({
//   baseURL: VITE_BACKEND_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5M2E2OGExNy1hODg3LTQwZGItOGY5MC04NzhiMWY4NjQ1MjNAc29jaWFsVXNlci5jb20iLCJhdXRob3JpdHkiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQwNjQ0MjIwLCJleHAiOjE3NDA2NDc4MjB9.xkMj8O57O_WmYj2BiJZ-6fvZVsTYgvIzMwlMygiApR5z1QUZPgSJAuWxhniVaqq_yXqABSe8jCaDtMK3lN5ppA", // TODO: 로그인 전 임시 - axios interceptor 통해 동적 추가되도록 변경
//   },
// });

// ✅ 신고 리스트 조회
const fetchReports = async ({
  query = "",
  type = "",
  result = "",
  page = 1
}: {
  query?: string;
  type?: string;
  result?: string;
  page?: number;
}) => {
  try {
    const params = {
      q: query,
      type: type,
      result: result,
      p: page
    };

    const response = await axiosInstance.get("/api/admin/reports", { params });
    return response.data;
  } catch (error) {
    console.error("❌ fetchReports 실패:", error);
    throw error;
  }
};

  
// ✅ 특정 신고 상세 조회
const fetchReportDetails = async (reportId: number) => {
  try {
    const response = await axiosInstance.get(`/api/admin/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ fetchReportDetails 실패 (ID: ${reportId}):`, error);
    throw error;
  }
};

// ✅ 신고 처리
const processReport = async (
  reportId: number,
  result: string,
  reportContent: string,
  asignedUserId: number
) => {
  try {
    const requestBody = {
      result,
      reportContent,
      asignedUserId,
    };

    const response = await axiosInstance.put(
      `/api/admin/reports/${reportId}`,
      requestBody // 요청 바디 추가
    );

    return response.data;
  } catch (error) {
    console.error(`❌ processReport 실패 (ID: ${reportId}):`, error);
    throw error;
  }
};


// ✅ 신고 처리 복구
const undoReportAction = async (reportId: number) => {
  try {
    const response = await axiosInstance.put(`/api/admin/reports/${reportId}/restore`);
    return response.data;
  } catch (error) {
    console.error(`❌ undoReportAction 실패 (ID: ${reportId}):`, error);
    throw error;
  }
};


export const adminAPI = {
  fetchReports,
  fetchReportDetails,
  processReport,
  undoReportAction,
};
