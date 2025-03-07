import { useNavigate } from "react-router";
import { debateRoomApi } from "../api/debatezone";

export const checkRoomIdIsExist = async (roomId: string) => {
    const navigate = useNavigate()
      const response = await debateRoomApi.fetchOngoingRoomInfo(roomId);
        if (!response || !response.data) {
          console.warn("잘못된 룸 아이디로 접근하셨습니다, 리디렉션 중...");
          navigate("/not-found");
        }
  }