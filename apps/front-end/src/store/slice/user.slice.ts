import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, LoginParams } from '@/types/user';
import * as userService from '@/services/user';
import { removeToken } from '@/utils/config/request';

interface UserState {
  current: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: UserState = {
  current: null,
  token: null,
  loading: false,
};

/** 登录 */
export const signinAsync = createAsyncThunk('user/signin', async (params: LoginParams) => {
  const result = await userService.signin(params);
  return result.access_token;
});

/** 获取当前用户信息 */
export const fetchProfileAsync = createAsyncThunk('user/fetchProfile', async () => {
  return userService.getProfile();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.current = null;
      state.token = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinAsync.pending, (state) => { state.loading = true; })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(signinAsync.rejected, (state) => { state.loading = false; })
      .addCase(fetchProfileAsync.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
