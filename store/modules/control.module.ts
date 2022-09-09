import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IControl {
  chapterListVisible: boolean; // 选集 dialog
  cancelDramaVisible: boolean; // 取消追剧 dialog
}

export const controlSlice = createSlice({
  name: 'control',
  initialState: (): IControl => ({
    chapterListVisible: false,
    cancelDramaVisible: false,
  }),
  reducers: {
    setChapterListVisible: (state: IControl, action: PayloadAction<boolean>) => {
      state.chapterListVisible = action.payload;
    },
    setCancelDramaVisible: (state: IControl, action: PayloadAction<boolean>) => {
      state.cancelDramaVisible = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(userInfoAsync.pending, (state) => {
  //       // state.status = 'loading';
  //     })
  // }
});

export const { setChapterListVisible, setCancelDramaVisible } = controlSlice.actions;

export default controlSlice.reducer;
