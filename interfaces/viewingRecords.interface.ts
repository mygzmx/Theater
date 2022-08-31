export enum EIsAdd {
  否 = 0,
  是 = 1,
}

export interface IBookVoListItem {
  bookId: string;
  bookName: string;
  chapterId: string;
  cname: string;
  coverImage: string;
  isAdd: EIsAdd;
  omap: string;
}
