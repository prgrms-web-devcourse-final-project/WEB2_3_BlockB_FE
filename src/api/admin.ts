import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5M2E2OGExNy1hODg3LTQwZGItOGY5MC04NzhiMWY4NjQ1MjNAc29jaWFsVXNlci5jb20iLCJhdXRob3JpdHkiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQwNTgyNDQzLCJleHAiOjE3NDA1ODYwNDN9.-U12Z0NVVYhvKsg2HaTGg84VLzLU-yE3GNkwm3Ax3Jt8HBK9XGocDM_sEun6IaOoH9csdVvvmRQkMmciBYuAnA", // 토큰이 있을 때만 추가
  },
});

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
      const params = new URLSearchParams();
      if (query) params.append("q", query); // 검색
      if (type) params.append("type", type); // 신고 유형
      if (result) params.append("result", result); // 처리 결과
      params.append("p", String(page));
  
      const response = await axiosInstance.get(`/api/admin/reports?${params.toString()}`);
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
