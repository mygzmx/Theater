import { ESex } from "./self.interface";
import { netImeiAuth } from "../apis/User";

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
