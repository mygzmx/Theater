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
  播放页 = 1,
  二级播放页 = 2,
  观看记录页 = 3,
  我的追剧 = 4,
}


export interface IPreLoadParams {
  bookId: string;
  chapterId?: string;
  ignoreChapterIds?: string[]; // 忽略章节ID
  autoPay: EAutoPay; // 是否需要自动订购
  omap?:	String; // 书籍归因-- Json字符串
  scene?: EScene;
}