import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Commodity, CommodityStatistics, QueryCommodityParams } from '@/types/commodity';
import * as commodityService from '@/services/commodity';

interface CommodityState {
  list: Commodity[];
  statistics: CommodityStatistics;
  loading: boolean;
}

const initialState: CommodityState = {
  list: [],
  statistics: { expired: 0, soon: 0, total: 0 },
  loading: false,
};

/** 查询物品列表 */
export const fetchCommoditiesAsync = createAsyncThunk(
  'commodity/fetchAll',
  async (params: QueryCommodityParams) => {
    return commodityService.getCommodities(params);
  },
);

/** 获取统计数据 */
export const fetchStatisticsAsync = createAsyncThunk(
  'commodity/fetchStatistics',
  async (spaceId: string) => {
    return commodityService.getCommodityStatistics(spaceId);
  },
);

export const commoditySlice = createSlice({
  name: 'commodity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommoditiesAsync.pending, (state) => { state.loading = true; })
      .addCase(fetchCommoditiesAsync.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCommoditiesAsync.rejected, (state) => { state.loading = false; })
      .addCase(fetchStatisticsAsync.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});
