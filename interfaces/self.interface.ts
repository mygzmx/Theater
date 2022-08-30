export enum ESex {
  无 = 0,
  男 = 1,
  女 = 2,
}

export interface IUserInfo {
  vip: boolean;
  nickName: string;
  login: boolean;
  sex: ESex;
  userId: string;
  vipExpiryTime: string;
}
