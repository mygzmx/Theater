import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IVideo2151,
  IVideo2150,
  IVideoSourceParams,
  IVideoInitParams,
  IChapterInfo, IVideo2152
} from "../../interfaces/player.interface";
import { netVideoInit, netVideoSource } from "../../apis/Player";

export interface IPlayer {
  videoSource: IVideo2151;
  videoInit: IVideo2150;
  bookId: string;
  chapterId: string;
}

export const videoInitAsync = createAsyncThunk(
  'player/getVideoInit',
  (params: IVideoInitParams) => {
    return netVideoInit(params);
  }
);

export const videoSourceAsync = createAsyncThunk(
  'player/getVideoSource',
  (params: IVideoSourceParams) => {
    return netVideoSource(params);
  }
);

export const playerSlice = createSlice({
  name: 'player',
  initialState: (): IPlayer => ({
    videoInit: {} as IVideo2150,
    videoSource: {
      isInBookShelf: false,
      chapterInfo: [] as IChapterInfo[]
    } as IVideo2151,
    bookId: '',
    chapterId: '',
  }),
  reducers: {
    setBookId: (state: IPlayer, action: PayloadAction<string>) => {
      state.bookId = action.payload;
    },
    setChapterId: (state: IPlayer, action: PayloadAction<string>) => {
      state.chapterId = action.payload;
    },
    setIsInBookShelf: (state: IPlayer, action: PayloadAction<boolean>) => {
      state.videoSource = { ...state.videoSource, isInBookShelf: action.payload }
    },
    setVideoSource: (state: IPlayer, action: PayloadAction<IVideo2151>) => {
      state.videoSource = { ...state.videoSource, ...action.payload }
      state.bookId = action.payload.bookId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(videoInitAsync.fulfilled, (state, action) => {
        state.videoInit = action.payload;
      })
  }
});


export const { setBookId, setChapterId, setIsInBookShelf, setVideoSource } = playerSlice.actions;

const playerReducer = playerSlice.reducer;

export default playerReducer;
