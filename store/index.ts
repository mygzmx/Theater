import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user.module';
import commonReducer from './modules/common.module';
import playerReducer from "./modules/player.module";

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
    player: playerReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
