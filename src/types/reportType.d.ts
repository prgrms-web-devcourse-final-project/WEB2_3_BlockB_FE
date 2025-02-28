interface Report {
    id: number;
    nickname: string;
    targetNickname: string;
    reportType: string;
    reportResult: string;
    status: string;
    createdAt: string;
    reportedAt: string;
  }
  
  interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  
  interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  interface ReportResponse {
    status: string;
    message: string | null;
    data: {
      content: Report[];
      pageable: Pageable;
      totalElements: number;
      totalPages: number;
      last: boolean;
      size: number;
      number: number;
      sort: Sort;
      numberOfElements: number;
      first: boolean;
      empty: boolean;
    };
  }
  

 type AdminTab =  "미처리" | "처리 완료"

 type ReportDetails = {
  id: number;
  nickname: string;
  targetType: "CHAT" | "PROFILE"
  targetRoomId?: number; 
  targetUserId: number;
  targetNickname: string;
  content: string;
  reportType: string; 
  reportResult: string; 
  reportContent: string; 
  createdAt: string; // ISO 형식의 날짜 문자열
  reportedAt: string | null
  aslignedUserId: number | null
};

type TargetType = "CHAT" | "PROFILE"