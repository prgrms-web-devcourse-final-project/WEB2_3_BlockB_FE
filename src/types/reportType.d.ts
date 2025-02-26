type ReportInfo = {
    "status": string,
    "message": string,
    "data": {
        "totalElements": number,
        "totalPages": number,
        "size": number,
        "content": [
        {
            "id": number,
            "nickname": string,
            "targetNickname": string,
            "reportType": string,
            "reportResult": string,
            "status": string,
            "createdAt": string
        }
        ],
        "number": number,
        "sort": {
        "empty": true,
        "sorted": true,
        "unsorted": true
        },
        "numberOfElements": number,
        "pageable": {
        "offset": number,
        "sort": {
            "empty": true,
            "sorted": true,
            "unsorted": true
        },
        "paged": true,
        "pageNumber": number,
        "pageSize": number,
        "unpaged": true
        },
        "first": true,
        "last": true,
        "empty": true
    }
}


interface Report {
    id: number;
    nickname: string;
    targetNickname: string;
    reportType: string;
    reportResult: string;
    status: string;
    createdAt: string;
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
  