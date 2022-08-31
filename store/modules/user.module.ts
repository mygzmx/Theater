import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { netImeiAuth, netUserInfo } from "../../apis/User";
import { EIsZhichi, ESex, IUserData } from "../../interfaces/self.interface";

// createAsyncThunk会提供一个thunk对象，可以使用它的dispatch方法将请求的结果转发给其他的reducer处理
export const userInfoAsync = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    return await netUserInfo();
  }
);

export const imeiAuthAsync = createAsyncThunk(
  'user/getImeiAuth',
  async () => {
    return await netImeiAuth({
      androidId: "36cecec57756f3d27",
      blackList: 1,
      bookId: "",
      ei: "3178363a2051b63d0e0f1b54bbd860f1eaa2a847e8426df03f0c8d98936fe945",
      pullMode: "",
      sid: "",
      userId: "2006902",
      utdid: "fa2f55573bdf09e4b7e0613b5139cffc",
      utdidTmp: "tmp_1661862760745o2EjgqeuT4",
      uuid: "",
    });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: (): IUserData => ({
    amount: 0,
    award: 0,
    expireAward: 0, // 过期的书币数量
    isZhichi: EIsZhichi.关, // 1-开,0-关 智齿客服开关字段
    zhiChiUrl: '',
    user: {
      vip: false,
      nickName: '游客',
      login: false,
      sex: ESex.无,
      userId: '',
      vipExpiryTime: '',
    },
  }),
  reducers: {
    setUserInfo: (state: IUserData, action) => {
      return { ...state, ...action.payload, user: { ...state.user, ...action.payload.user } }
    },
    // resetToken: (state) => {
    //   state.userToken = '';
    // },
  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    builder
      .addCase(userInfoAsync.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(userInfoAsync.fulfilled, (state, action) => {
        return { ...state, ...action.payload, user: { ...state.user, ...action.payload.user } }
      })
      .addCase(imeiAuthAsync.fulfilled, (state, action) => {
        console.log('imeiAuthAsync-------------------->', action.payload)
      })
    ;
  }
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
