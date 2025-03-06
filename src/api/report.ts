import { axiosInstance } from "./axios";
import { userApi } from "./user";

// ✅ 신고
const reportUser = async ( {targetUserId, targetType="CHAT", targetRoomId = null, content, reportType}: {targetUserId: number, targetType: TargetType, targetRoomId: number | null, content: string, reportType: string})  => {
  try {
    const myUserResponse = await userApi.fetchMyProfile();
    const userId = myUserResponse.data.id; // 신고자 아이디
    console.log("userId", userId)
    const requestBody = {
      userId,
      targetUserId,
      targetType,
      targetRoomId,
      content,
      reportType
    }
    console.log(requestBody)

    const response = await axiosInstance.post(
      "/api/report", 
      requestBody 
    );

    return response.data;
  } catch(error) {
    console.error(`${targetUserId} 유저 대상 신고 실패:`, error)
  }
}

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
      requestBody
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


export const reportApi = {
  reportUser,
  fetchReports,
  fetchReportDetails,
  processReport,
  undoReportAction,
};

