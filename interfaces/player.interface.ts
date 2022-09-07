export enum EIsRead {
  不是 = 0,
  是 = 1,
}

export interface IVideoInitParams {
  isRead: EIsRead;
  bookId?: string;
  sourceChannelCode?: string; // 'Vdz_fhjc'
}

export interface IVideo2150 {
  bindMap: {[key: string]: any};
  brandAdSwitch: number;
  canclePrelad: number;
  changeChannelCode: number;
  checkAgree: number;
  currTime: number;
  isAddDesktop: number;
  isAp: number;
  isCloseApp: string;
  isPayLogin: number;
  isUpa: number;
  sfAutoPay: number;
  swParam: number;
  vipAutoPay: number;
}

export enum EConfirmPay {
  非确认订购扣费 = 1,
  确认订购 = 2,
}

export interface IVideoSourceParams {
  bookId?: string;
  chapterId?: string;
  confirmPay?: EConfirmPay;
  autoPay?: EAutoPay; // 是否需要自动订购
  sid?:	String;
  omap?:	String; // 书籍归因-- Json字符串
  isRead?: 1;
  scene?: EScene;
}


export enum EAutoPay {
  否 = 1,
  是 = 2,
}

export enum EScene {
  播放页 = '播放页',
  二级播放页 = '二级播放页',
  观看记录页 = '观看记录页',
  我的追剧 = '我的追剧',
}

export enum EVideo2151Status {
  扣费成功 = 1,
  免费章节 = 2,
  已付费过 = 3,
  余额不足 = 4,
  需要确认弹窗 = 5,
  书籍下架 = 6,
}

export enum EAutoAdd{
  否 = 0,
  是 = 1,
}

export interface IChapterInfo {
  videoUrl: string | undefined;
  chapterId: string;
  chapterName: string;
  chapterStatus: number;
  chapterUrl: string;
  content: {
    m3u8: string;
    mp4: string;
    cost: number;
  },
  cost?: number;
  isRecoBook?: number;
  isafd?: number;
  nextChapterId?: string;
  nextChapterName?: string;
  preChapterId?: string;
  preChapterName?: string;
}


export interface IVideo2151 {
  author: string;
  autoAdd: EAutoAdd;
  bookFinishStatus: EBookFinishStatus;
  bookId: string;
  bookName: string;
  bookStatus: string;
  chapterIndex: number;
  chapterInfo: IChapterInfo[];
  chaptersCoins: number;
  chaptersPayType: string;
  firstType: string;
  first_reading: string;
  isInBookShelf: boolean;
  isPayLogin: number;
  isVip: boolean;
  maxChapter: number;
  nextChapterId: string;
  nextChapterName: string;
  omap: string;
  payType: string;
  preChapterId: string;
  preChapterName: string;
  preloadNum: number;
  secondType: string;
  status: EVideo2151Status
  sysTime: number;
  thirdType: string;
  updateTime: string;
  videoUrl: string;
}

export interface IPreLoadParams {
  bookId: string;
  chapterId?: string;
  ignoreChapterIds?: string[]; // 忽略章节ID
  autoPay: EAutoPay; // 是否需要自动订购
  omap?:	String; // 书籍归因-- Json字符串
  scene?: EScene;
}

export interface IChapterParams {
  bookId: string;
  startIndex: number;
  endIndex: number;
}
export interface IChapterListItem { chapterId: string; chapterName: string; isCharge: EIsCharge; chapterIndex: number }
export interface IChapterResponse {
  author: string;
  bookFinishStatus: EBookFinishStatus;
  bookName: string;
  bookScore: string;
  chapterList: IChapterListItem[];
  coverWap: string;
  index: number;
  totalChapters: string;
}

export enum EIsCharge {
  免费 = 0,
  收费 = 1,
  vip免费 = 2,
  收费已购买 = 3
}

export enum EBookFinishStatus {
  更新中 = 1,
  已完结 = 2,
}

export interface IVideo2152 extends IVideo2151{
}

export interface IFinishParams {
  bookId: string;
  chapterId: string;
  omap?: string;
}
