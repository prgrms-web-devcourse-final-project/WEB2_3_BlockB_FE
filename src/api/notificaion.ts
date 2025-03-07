import { axiosInstance } from "./axios";

const postToken = async (userId: number, token: string, isAllow: string) => {
  try {
    await axiosInstance.post("/api/notifications/saveToken", {
      userId,
      token,
      isAllow,
    });
  } catch (error) {
    throw error;
  }
};

const getNotifications = async (userId: number, page: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/notifications/${userId}?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postCheckToken = async (userId: number, token?: string) => {
  try {
    const response = await axiosInstance.post(`/api/notifications/checkToken`, {
      userId,
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const putNotifications = async (notificaionId: number) => {
  try {
    await axiosInstance.put(`/api/notifications/${notificaionId}/read`);
  } catch (error) {
    throw error;
  }
};

const putAllNotifications = async (userId: number) => {
  try {
    await axiosInstance.put(`/api/notifications/${userId}/readAll`);
  } catch (error) {
    throw error;
  }
};

const deleteNotifications = async (notificationId: number) => {
  try {
    await axiosInstance.delete(`api/notifications/${notificationId}/remove`);
  } catch (error) {
    throw error;
  }
};

const deleteAllNotifications = async (userId: number) => {
  try {
    await axiosInstance.delete(`/api/notifications/${userId}/removeAll`);
  } catch (error) {
    throw error;
  }
};

export const notificationAPI = {
  postToken,
  getNotifications,
  postCheckToken,
  putNotifications,
  putAllNotifications,
  deleteNotifications,
  deleteAllNotifications,
};
