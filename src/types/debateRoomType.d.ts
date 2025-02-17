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
  hasVote: string | null;
  time: string | null;
  turn: string | null;
  title: string | null;
  description: string | null;
}
