type HeaderStatusType =
  | "default"
  | "debate-waiting"
  | "debate-ing"
  | "admin"
  | "landing";

type FooterStatusType = "default" | "landing";

interface RepotTableBodyType {
  reporter?: string;
  name: string;
  date: string;
  option?: string;
  admin?: string;
  reason: string;
}

interface NewsType {
  bookmark: number;
  content: string;
  deliveryTime: string;
  id: number;
  imgUrl: string;
  like: number;
  newsType: string;
  title: string;
}

interface NewsDetailType {
  like: number;
  liked: boolean;
  link: string;
  mark: number;
  marked: boolean;
}

/**
 * 뉴스 대륙별 필터링 코드
 * AS = 아시아 / 호주
 * AM = 미국 / 중남미
 * EU = 유럽
 * CN = 중국
 * JP = 일본
 * AF = 아프리카 / 중동
 * KR = 국내
 */

type ContinentType = "AS" | "AM" | "EU" | "CN" | "JP" | "AP" | "KR";
