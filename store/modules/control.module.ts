import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IControl {
  chapterListVisible: boolean;
}

export const controlSlice = createSlice({
  name: 'control',
  initialState: (): IControl => ({
    chapterListVisible: false,
  }),
  reducers: {
    setChapterListVisible: (state: IControl, action: PayloadAction<boolean>) => {
      state.chapterListVisible = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(userInfoAsync.pending, (state) => {
  //       // state.status = 'loading';
  //     })
  // }
});

export const { setChapterListVisible } = controlSlice.actions;

export default controlSlice.reducer;
