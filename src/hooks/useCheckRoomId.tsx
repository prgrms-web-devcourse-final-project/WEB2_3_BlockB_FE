import { useEffect } from "react";
import { useNavigate } from "react-router";
import { debateRoomApi } from "../api/debatezone";

export const useCheckRoomId = (roomId?: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRoom = async () => {
      if (!roomId) return;

      try {
        const response = await debateRoomApi.fetchOngoingRoomInfo(roomId);
        if (!response || !response.data) {
          console.warn("잘못된 룸 아이디로 접근하셨습니다, 리디렉션 중...");
          navigate("/not-found");
        }
      } catch (error) {
        console.error("방 정보를 가져오는 중 오류 발생:", error);
        navigate("/not-found");
      }
    };

    checkRoom();
  }, [roomId, navigate]);
};
