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
}

export enum EIsUpdate {
  no,
  yes
}