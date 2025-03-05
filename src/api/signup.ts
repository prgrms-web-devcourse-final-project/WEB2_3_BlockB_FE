import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const accessToken = useAuthStore.getState().accessToken;
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const checkNickname = async (nickname: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${VITE_BACKEND_URL}/api/auth/nickname-confirm?nickname=${encodeURIComponent(
        nickname
      )}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
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
    if (!accessToken) {
      return false;
    }

    const response = await axios.post(
      `${VITE_BACKEND_URL}/api/auth/signup?nickname=${encodeURIComponent(
        nickname
      )}&introduction=${encodeURIComponent(introduction)}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
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
