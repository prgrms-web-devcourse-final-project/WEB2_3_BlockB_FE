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

interface NotificationType {
  id: number;
  notificationType: ActionType;
  typeId: number;
  content: string;
  statusType: string;
  createdAt: string;
  updatedAt: string;
}

type ActionType = "REPORT" | "CHAT" | "DEBATE" | "FOLLOW";
