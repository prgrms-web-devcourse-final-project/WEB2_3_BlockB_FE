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
  newsType: "JOONGANG" | "HANI" | "HANKYUNG" | "HANKOOK" | "SEGYE";
  title: string;
}

interface NewsDetailType {
  like: number;
  liked: boolean;
  link: string;
  mark: number;
  marked: boolean;
}

type ActionType = "REPORT" | "CHAT" | "DEBATE" | "FOLLOW";

interface NotificationType {
  id: number;
  notificationType: ActionType;
  typeId: number;
  content: string;
  statusType: string;
  createdAt?: string;
  updatedAt?: string;
}

interface NotificationDataType {
  unreadCount: number;
  notifications: {
    content: NotificationType[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
}

type DeleteModalType = "delete" | "allDelete" | null;
