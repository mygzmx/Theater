export enum ESex {
  无 = 0,
  男 = 1,
  女 = 2,
}

export enum EIsZhichi {
  关 = 0,
  开 = 1,
}


export interface IUserData {
  amount: number;
  award: number;
  expireAward: number; // 过期的书币数量
  isZhichi: EIsZhichi; // 1-开,0-关 智齿客服开关字段
  zhiChiUrl: string;
  user: IUserInfo;
}

export interface IUserInfo {
  vip: boolean;
  nickName: string;
  login: boolean;
  sex: ESex;
  userId: string;
  vipExpiryTime: string;
}
