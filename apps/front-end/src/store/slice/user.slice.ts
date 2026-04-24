import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  current: User.Info | null;
  token: string | null;
  loading: boolean;
}

const initialState: UserState = {
  current: null,
  token: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.current = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserLoading(state, action) {
      state.loading = action.payload;
    },
    clearUser(state) {
      state.current = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, setUserLoading, clearUser } = userSlice.actions;
