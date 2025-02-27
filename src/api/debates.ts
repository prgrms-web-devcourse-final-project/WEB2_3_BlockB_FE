import { axiosInstance } from "./axios";
import { DebaterType } from "../types/debateType";

const getTopDebaters = async (
  searchTerm: string = ""
): Promise<DebaterType[]> => {
  try {
    const response = await axiosInstance.get("/api/users/followers", {
      params: searchTerm ? { query: searchTerm } : {},
    });
    return response.data.data.map((debater: DebaterType) => ({
      ...debater,
      wins: debater.wins ?? 0,
      draws: debater.draws ?? 0,
      losses: debater.losses ?? 0,
    }));
  } catch (error) {
    throw error;
  }
};

export const debatesAPI = {
  getTopDebaters,
};
