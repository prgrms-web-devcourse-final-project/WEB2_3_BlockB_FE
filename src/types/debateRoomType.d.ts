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
};

// 토론방 타입 정의
interface DebateRoomType {
  id: number;
  title: string;
  categoryType: string;
  memberNumberType: number;
  speakingTimeSeconds: number;
  speakingCount: number;
}

// 디베이터
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
}


// 토론방 생성시 타입
enum NewsType {
  JOONGANG = "JOONGANG",
  HANI = "HANI",
  HANKYUNG = "HANKYUNG",
  HANKOOK = "HANKOOK",
  SEGYE = "SEGYE",
}

const NewsTypeNames: Record<NewsType, string> = {
  [NewsType.JOONGANG]: "중앙일보",
  [NewsType.HANI]: "한겨레신문",
  [NewsType.HANKYUNG]: "한국경제",
  [NewsType.HANKOOK]: "한국일보",
  [NewsType.SEGYE]: "세계일보",
};

// const getNewsTypeName = (type: NewsType): string => NewsTypeNames[type];
// console.log(getNewsTypeName(NewsType.JOONGANG)); // "중앙일보"

enum Continent {
  AS = "AS",
  AM = "AM",
  EU = "EU",
  CN = "CN",
  JP = "JP",
  AF = "AF",
  KR = "KR",
}

const ContinentNames: Record<Continent, string> = {
  [Continent.AS]: "아시아/호주",
  [Continent.AM]: "미국 / 중남미",
  [Continent.EU]: "유럽",
  [Continent.CN]: "중국",
  [Continent.JP]: "일본",
  [Continent.AF]: "아프리카 / 중동",
  [Continent.KR]: "국내",
};

enum Category {
  PO = "PO",
  EC = "EC",
  SO = "SO",
  CU = "CU",
  EN = "EN",
  SP = "SP",
  IT = "IT",
  CO = "CO",
  ETC = "ETC",
}

const CategoryNames: Record<Category, string> = {
  [Category.PO]: "정치",
  [Category.EC]: "경제",
  [Category.SO]: "사회",
  [Category.CU]: "문화",
  [Category.EN]: "연예",
  [Category.SP]: "스포츠",
  [Category.IT]: "IT",
  [Category.CO]: "칼럼",
  [Category.ETC]: "기타",
};

enum Time {"T1", "T2", "T3"}

enum SpeakCount {
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
}

const getSpeakCountValue = (count: SpeakCount): number => count;

interface NewsLinkDetail {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  content: string;
  link: string;
  imgUrl: string;
  newsType: NewsType; 
  continent: Continent;
  deliveryTime: string;
}


interface NewsData {
  newsId: number;
  title: string;
  news: NewsLinkDetail;
  description: string;
  memberNumber: string; // "T1" | "T2" | "T3"
  continent: Continent; 
  category: Category;
  time: Time;
  speakCount: SpeakCount;
  resultEnabled: boolean;
  endTime: string;
}

enum RoomStatusType {
  "ClOSED",
  "DEBATE",
}
