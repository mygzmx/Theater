import { netOperatingReport } from "../apis/Theater";

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

export enum EIsSign {
  无 = 0,
  已签到 = 1,
}

export enum ESignRecordType {
  无 = 1,
  书币 = 2,
}

export interface ISignRecordVos {
  day: number; //第几天
  type: ESignRecordType; // 奖励类型，1-无，2-书币
  num: number; // 书币数量，type=1时，该属性不下放
  isSign:EIsSign; //对应天是否签到
}

export interface INetTaskData {
  operList: any[];
  isSign: EIsSign;
  signRecordVos: ISignRecordVos[],
  continueDay: number;
  taskSetList: any[],
  signText: string;
}

export enum EOperatingReportType {
  曝光 = 1,
  点击 = 2,
}
