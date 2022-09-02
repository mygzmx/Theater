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


export enum ETaskType {
  新手任务 = 1,
  日常任务 = 2,
}
export interface ITaskSetItem {
  taskSetId: number;
  taskSetTitle: string;
  taskList: ITaskItem[];
  taskType: ETaskType
}
export enum ETaskStatus {
  去完成 = 1,
  待领取 = 2,
  已领取 = 3,
}
export enum ETaskAction {
  添加桌面 = 1,
  首次登录 = 2,
  充值回馈 = 3,
  阅读时长,
  批量订购,
  清晨分享,
  午间分享,
  晚间分享,
  签到分享,
  阅读底部分享 = 11,
  观看加桌视频 = 12,
  观看激励视频 = 13,
  签到后激励视频 = 14,
  阅读热门好书 = 29,
  分段阅读 = 36,
}
export interface ITaskItem {
  taskId: number;
  taskTitle: string;
  taskStatus: ETaskStatus;
  taskAward: number;
  taskAction: ETaskAction;
  tips: string;
  proNum?: number;
  totalNum?: number;
  goUrl: string;
  adLocationId: string;
  shareVo: any;
  bookVo: any;
  userTacticsVo: any;
  stageReadAwardList?: { award: number, duration: number }[];
}

export interface INetTaskData {
  operList: any[];
  isSign: EIsSign;
  signRecordVos: ISignRecordVos[],
  continueDay: number;
  taskSetList: ITaskSetItem[],
  signText: string;
}

export enum EOperatingReportType {
  曝光 = 1,
  点击 = 2,
}
