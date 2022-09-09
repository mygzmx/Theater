import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from './modules/user.module';
import commonReducer from './modules/common.module';
import { playerSlice } from "./modules/player.module";
import { controlSlice } from "./modules/control.module";

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
    player: playerSlice.reducer,
    control: controlSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
