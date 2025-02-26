import { axiosInstance } from "./axios";

const getAllNews = async (sort: string) => {
  try {
    const response = await axiosInstance.get("/api/news", {
      params: { sort },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getNewsTop10 = async () => {
  try {
    const response = await axiosInstance.get("/api/news/ranking");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newsAPI = {
  getAllNews,
  getNewsTop10,
};
