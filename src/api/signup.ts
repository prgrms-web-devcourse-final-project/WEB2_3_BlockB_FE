import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const checkNickname = async (nickname: string): Promise<boolean> => {
  try {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      return false;
    }

    const response = await axios.post(
      `${VITE_BACKEND_URL}/api/auth/nickname-confirm`,
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.status === 201;
  } catch (error: any) {
    if (error.response?.status === 400) {
      return false;
    }
    return false;
  }
};

export const signup = async (
  nickname: string,
  introduction: string
): Promise<boolean> => {
  try {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      return false;
    }

    const response = await axios.post(
      `${VITE_BACKEND_URL}/api/auth/signup`,
      { nickname, introduction },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.status === 201;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    return false;
  }
};
