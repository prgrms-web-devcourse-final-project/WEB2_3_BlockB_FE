import { axiosInstance } from "./axios";

const getNewsTop10 = async () => {
  try {
    const response = await axiosInstance.get(`/api/news/ranking`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newsAPI = {
  getNewsTop10,
};
