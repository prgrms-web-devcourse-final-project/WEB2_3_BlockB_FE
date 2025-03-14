type RoomType = {
  continent: "string";
  category: "string";
  participants: "string";
  stance: "string";
  hasVote: boolean;
  time: number;
} | null;

type ChecklistItem = {
  dbKey: string | number | boolean; 
  key: string; 
  isChecked: boolean;
};

type RoomSettings = {
  title: string | null;
  description: string | null;
  continent: Continent | null;
  category: Category | null;
  memberNumber: MemberNumber | null;
  stance: string | null;
  hasVote: boolean | null;
  time: number | null;
  speakCount: number | null;
  link?: string | null
};

type VoteSelection = "PRO" | "CON" | "NO_POSITION"

type VoteInfo = {
  label: string;
  img: string;
  value: VoteSelection
};

type DebaterType = {
  userId: number;
  nickname: string;
  profile: string;
  introduction: string;
  totalFollowers: number;
  totalFollowees: number;
  wins: number;
  draws: number;
  losses: number;
};

type NewsSource = 
  | "JOONGANG"
  | "HANI"
  | "HANKYUNG"
  | "HANKOOK"
  | "SEGYE";

const NewsTypeNames: Record<NewsSource, string> = {
  JOONGANG: "중앙일보",
  HANI: "한겨레신문",
  HANKYUNG: "한국경제",
  HANKOOK: "한국일보",
  SEGYE: "세계일보",
};

type Continent =
  | "AS"
  | "AM"
  | "EU"
  | "CN"
  | "JP"
  | "AF"
  | "KR";

const ContinentNames: Record<Continent, string> = {
  AS: "아시아/호주",
  AM: "미국 / 중남미",
  EU: "유럽",
  CN: "중국",
  JP: "일본",
  AF: "아프리카 / 중동",
  KR: "국내",
};

type Category =
  | "PO"
  | "EC"
  | "SO"
  | "CU"
  | "EN"
  | "SP"
  | "IT"
  | "CO"
  | "ETC";

const CategoryNames: Record<Category, string> = {
  PO: "정치",
  EC: "경제",
  SO: "사회",
  CU: "문화",
  EN: "연예",
  SP: "스포츠",
  IT: "IT",
  CO: "칼럼",
  ETC: "기타",
};

type Time = "T3" | "T4" | "T5" | "T6" | "T9" | "T12" | "T15"

type SpeakCount =
  | "THREE"
  | "FOUR"
  | "FIVE"
  | "SIX"
  | "SEVEN"
  | "EIGHT"
  | "NINE"
  | "TEN";

type MemberNumber = "T1" | "T2";

type RoomStatusType = "CLOSED" | "DEBATE";

type NewsLinkDetail = {
  createdAt?: string;
  updatedAt?: string;
  id?: number;
  title: string;
  content?: string;
  link: string;
  imgUrl?: string;
  newsType?: NewsSource;
  continent: Continent;
  deliveryTime?: string;
};

type RoomInfoRequest = {
  newsId?: number | null;
  newsUrl?: string | null,
  title: string;
  description: string;
  memberNumber: MemberNumber; 
  continent: Continent;
  category: Category;
  time: Time;
  speakCount: SpeakCount;
  resultEnabled: boolean;
  endTime?: string | null
};



type Participant = {
  id: number;
  nickname: string;
  winNumber: number;
  defeatNumber: number;
  drawNumber: number;
  profileUrl: string
}

type DebateRoomInfo = {
  roomId: string;
  title: string;
  description: string;
  memberNumberType: number;
  categoryType: string;
  continentType: string;
  newsUrl: string;
  status: string;
  timeType: number;
  speakCountType: number;
  resultEnabled: boolean;
  proUsers: Participant[];
  conUsers: Participant[]
}

// WebSocket Context Type
type WebSocketEvent = "JOIN" | "MESSAGE" | "EXIT" | "STATUS" | "TURN" | "NOTIFICATION" | "user_joined" | "error" | "user_left" | "WIN_BY_DEFAULT" | "EXIT_OVERFLOW_NULL"
type WebSocketStatus = "WAITING" | "DEBATE" | "VOTING" | "CLOSED"

type WebSocketCommunicationType = {
  event: WebSocketEvent,
  status?: WebSocketStatus, 
  userName?: string;
  turn: "PRO" | "CON",
  position?: "pro" | "con" | "no_position";
  message: string;
  timestamp?: string;
  kickedUserName?: string; // 인원 초과시 강퇴에 해당함
  imageUrl?: string;
  winner?: "PRO" | "CON"
};

interface DebateWebSocketProviderProps {
  userName: string | null;
  position?: string | null;
}


type VoteResult = {
  agreeNumber: number,
  disagreeNumber: number,
  neutralNumber: number
}


type ArchivedChatLog = {
  nickname: string;
  position: 'NO_POSITION' | 'CON' | "PRO";
  content: string;
  profileUrl: string;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
};