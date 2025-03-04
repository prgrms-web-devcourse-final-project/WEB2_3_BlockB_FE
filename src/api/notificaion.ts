import { axiosInstance } from "./axios";

const postToken = async (userId: number, token: string) => {
  try {
    await axiosInstance.post("/api/notifications/saveToken", {
      userId,
      token,
    });
  } catch (error) {
    throw error;
  }
};

export const notificationAPI = {
  postToken,
};
