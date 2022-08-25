import { createSlice } from "@reduxjs/toolkit";
import { EIsRead } from "../../interfaces/player.interface";

export interface IPlayer {
  bookId: string;
  chapterId: string;
  chapterInfo: IChapterInfo;
  bookName: string;
  autoAdd: EIsRead;
}
interface IChapterInfo {
  chapterId: string;
  chapterName: string;
  chapterStatus: number;
  chapterUrl: string;
  content: {
    m3u8: string;
    mp4: string;
    cost: number;
  },
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: (): IPlayer => ({
    bookId: '',
    bookName: '',
    chapterId: '',
    chapterInfo: {} as IChapterInfo,
    autoAdd: EIsRead.不是
  }),
  reducers: {
    setBookId: (state: IPlayer, action) => {
      state.bookId = action.payload;
    },
    setChapterId: (state: IPlayer, action) => {
      state.chapterId = action.payload;
    },
    setChapterInfo: (state: IPlayer, action) => {
      state.chapterInfo = JSON.parse(JSON.stringify(action.payload));
    },
    setBookName: (state: IPlayer, action) => {
      state.bookName = action.payload;
    },
    setAutoAdd: (state: IPlayer, action) => {
      state.autoAdd = action.payload;
    }
  },
})


export const { setBookId, setChapterId, setChapterInfo, setBookName, setAutoAdd } = playerSlice.actions;

const playerReducer = playerSlice.reducer

export default playerReducer;
