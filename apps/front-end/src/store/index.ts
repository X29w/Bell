import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { commoditySlice } from './slice/commodity.slice';
import { spaceSlice } from './slice/space.slice';
import { userSlice } from './slice/user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    space: spaceSlice.reducer,
    commodity: commoditySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** 类型安全的 hooks */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
