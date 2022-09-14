import { ESex } from "./self.interface";

export interface IRegisterParams {
  ei: string; // imei
  uuid: string; // 拉起uuid
  utdid: string; //	客户端标识
  brand?: string;	// 品牌型号
  model?: string;	//	机型
  channelCode?: string;	//	渠道号
  appVersion?: string; // 版本号
  provider?: string; // 推送来源
  pushCid?: string; // 推送唯一ID
  bookId?: string; // 剧ID
  chapterId?: string; // 集ID
  blackList: number; // 用户黑名单版本的标识	值是1
  androidId?: string; // 安卓ID
  domain: number;
  pullMode?: string; // 拉起方式
  isUnion?: string; // 邀请相关
  sid?: string; // 章节sid，用于阅读进度
}

export interface IRegisterResult {
  ctime: string;
  sex: ESex;
  userId: string;
  channelCode?: string;
  isBlack?: number;
  utdid?: string;
}

export interface IReportStartParams {
  startMode: string;
  androidId: string;
  uuid?: string;
  sourceCid?: string;
  isRegister?: boolean;
}

export interface IImeiAuthParams {
  utdid: string; // 授权后的utdid
  utdidTmp: string; // 临时生成的utdid
  userId?: string;
  ei: string;
  blackList: number;
  androidId?: string;
  iosId?: string;
  bookId?: string;
  pullMode?: string;
  sid?: string;
}

export enum ELoginType {
  登录 = 1,
  绑定 = 2,
  恢复登录账号 = 3,
}

export enum ELoginAccountType {
  手机号 = 1,
  QQ = 2,
  微信 = 3,
  微博 = 4,
}

export interface ILoginParams {
  type: ELoginType;
  accountType: ELoginAccountType;
  bindId: string; // 登录标志	openId标志/手机号码
  validCode?: string; //	手机验证码	手机验证才有
  nickName?: string; // 昵称	(暂未使用)
  avatar?: string; // 头像	(暂未使用)
  swParam: number;	// M	加密方式	1-base64
  noCode?: number; // 一键登录不需要验证码	(暂未使用)1 不需要验证码
  confirmPop?: number;
  from?: number;
}


export enum ELoginBindPhone {
  否 = 0,
  去绑定手机收 = 1,
}

export interface ILoginResult {
  userId: string; // 用户ID的明文标识	用户每次都使用这个userId
  uName: string; //	昵称
  uPhoto: string; //	用户头像
  token: string; // 用户token
  authCode?: string; //	授权码
  beforeAward?: string; //当前用户看点数量
  beforeVipTime?: string; // 当前用户vip结束时间
  afterAward?: string; // 替换后用户看点数量
  afterVipTime?: string; // 替换后用户vip结束时间
  bindPhone?: ELoginBindPhone;
  loginTip?: string; // 切换登录文案
  defaultUserId?: string; // 默认选中用户id
  popFlag: boolean; //账号列表是否弹出
}
