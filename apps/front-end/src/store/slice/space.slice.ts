import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Space } from '@/types/space';
import * as spaceService from '@/services/space';

interface SpaceState {
  list: Space[];
  currentId: string | null;
  loading: boolean;
}

const initialState: SpaceState = {
  list: [],
  currentId: null,
  loading: false,
};

/** 获取我的空间列表 */
export const fetchSpacesAsync = createAsyncThunk('space/fetchAll', async () => {
  return spaceService.getMySpaces();
});

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setCurrentSpace(state, action) {
      state.currentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpacesAsync.pending, (state) => { state.loading = true; })
      .addCase(fetchSpacesAsync.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
        // 如果没有选中空间，默认选第一个
        if (!state.currentId && action.payload.length > 0) {
          state.currentId = action.payload[0].id;
        }
      })
      .addCase(fetchSpacesAsync.rejected, (state) => { state.loading = false; });
  },
});

export const { setCurrentSpace } = spaceSlice.actions;
