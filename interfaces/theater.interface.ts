export interface IDramaItem {
  author: string;
  bookId: string;
  bookName: string;
  cname: string;
  coverImage: string;
  introduction: string;
  cindex: number;
  status: string;
  bookLand: number;
  chapterId: string;
  isTop: string;
  isUpdate: EIsUpdate;
  maxCid: string;
  maxCname: string;
  omap: string;
  totalCNum: number;
  uid: string;
  utime: number;
  isChecked?: boolean;
}

export enum EIsUpdate {
  no,
  yes
}


export interface IClassificationItem {
  labelId: string;
  labelName: string;
}

export interface IVideoListItem {
  author: string;
  bookId: string;
  bookName: string;
  chapterId: string;
  introduction: string;
  status: string;
  bookTypeThreeMap: {[key: number]: string};
  clickNum: string;
  coverWap: string;
  logId: string;
  recId: string;
  resFormat: string;
  sceneId: string;
  strategyId: string;
}
