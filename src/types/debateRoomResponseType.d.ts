// 토론방 정보 타입
interface Debate {
  id: number;
  uuid: string;
  title: string;
  description: string;
  member: number;
  categoryType: string;
  continentType: string;
  newsUrl: string;
  status: "DEBATE" | "CLOSED";
  time: number;
  speakCount: number;
  agreeNumber: number;
  disagreeNumber: number;
  neutralNumber: number;
  cachedTime: string; // ISO 날짜 형식
}

// 사용자 정보 타입
interface User {
  id: number;
  nickname: string;
  email: string;
  profileImage: string;
}

// 토론방 데이터 타입
interface DebateRoom {
  debate: Debate;
  currentCount: number;
  maxCount: number;
  proUsers: User[];
  conUsers: User[];
}

// 전체 API 응답 타입
interface DebateRoomsResponse {
  roomCount: number;
  roomSortedByCreatedAt: DebateRoom[];
  roomSortedByUserCount: DebateRoom[];
  observerCurrent: DebateRoom[];
  observerMax: DebateRoom[];
}
