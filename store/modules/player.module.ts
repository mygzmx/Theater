import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IVideo2151,
  IVideo2150,
  IVideoSourceParams,
  IVideoInitParams, EAutoAdd, IPreLoadParams, IVideo2152, IChapterInfo
} from "../../interfaces/player.interface";
import { netVideoPreload, netVideoInit, netVideoSource } from "../../apis/Player";

export interface IPlayer {
  videoSource: IVideo2151;
  videoInit: IVideo2150;
  videoPreload: IVideo2152;
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

export const videoPreloadAsync = createAsyncThunk(
  'player/getVideoPreload',
  (params: IPreLoadParams) => {
    return netVideoPreload(params);
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
    videoPreload: {} as IVideo2152,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(videoSourceAsync.fulfilled, (state, action) => {
        state.videoSource = action.payload;
        if (!state.bookId) {
          state.bookId = action.payload.bookId;
        }
      })
      .addCase(videoInitAsync.fulfilled, (state, action) => {
        state.videoInit = action.payload;
      })
      .addCase(videoPreloadAsync.fulfilled, (state, action) => {
        state.videoPreload = action.payload;
      })
  }
});


export const { setBookId, setChapterId, setIsInBookShelf } = playerSlice.actions;

const playerReducer = playerSlice.reducer;

export default playerReducer;
