import { createSlice } from "@reduxjs/toolkit";

export interface IPlayer {
  bookId: string;
  chapterId: string;
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: (): IPlayer => ({
    bookId: '',
    chapterId: '',
  }),
  reducers: {
    setBookId: (state: IPlayer, action) => {
      state.bookId = action.payload;
    },
    setChapterId: (state: IPlayer, action) => {
      state.chapterId = action.payload;
    }
  },
})


export const { setBookId, setChapterId } = playerSlice.actions;

const playerReducer = playerSlice.reducer

export default playerReducer;
