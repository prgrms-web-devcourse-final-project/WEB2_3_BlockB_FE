type RoomType = {
  continent: "string";
  category: "string";
  participants: "string";
  stance: "string";
  hasVote: boolean;
  time: number;
} | null;

type ChecklistItem = {
  dbKey: string | number | boolean; // DB 저장용 고유 key
  key: string; // 화면에 표시될 이름
  isChecked: boolean;
};

interface RoomSettings {
  continent: string | null;
  category: string | null;
  participant: string | null;
  stance: string | null;
  hasVote: boolean | null;
  time: number | null;
  turn: number | null;
  title: string | null;
  description: string | null;
}

type VoteInfo = {
  label: string;
  img: string;
  btnColor: string;
};

// 토론방 타입 정의
export interface DebateRoomType {
  id: number;
  title: string;
  categoryType: string;
  memberNumberType: number;
  speakingTimeSeconds: number;
  speakingCount: number;
}
