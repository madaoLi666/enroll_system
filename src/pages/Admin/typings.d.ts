declare namespace ADMIN {
  interface Athlete {
    
  }
  interface Game {
    id: string;
    name: string;
    contactPhone: string;
    contactEmail: string;
    enrollStartTime: string;
    enrollEndTime: string;
    startTime: string;
    endTime: string;
    matchAddress: string;
  }

  interface Item {
    // 这个位置需要多一个字段 表示是否报满
    id: number;
    eventId: number;
    gameId: string;
    limitedNumber: number;
    maxAge: string;
    minAge: string;
    maxNumber: number;
    minNumber: number;
    name: string;
    remark: string;
    team: boolean;
  }
}
