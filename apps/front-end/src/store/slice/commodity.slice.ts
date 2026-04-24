import { createSlice } from '@reduxjs/toolkit';

interface CommodityState {
  list: Commodity.Info[];
  statistics: Commodity.Statistics;
  loading: boolean;
}

const initialState: CommodityState = {
  list: [],
  statistics: { expired: 0, soon: 0, total: 0 },
  loading: false,
};

export const commoditySlice = createSlice({
  name: 'commodity',
  initialState,
  reducers: {
    setCommodities(state, action) {
      state.list = action.payload;
    },
    setStatistics(state, action) {
      state.statistics = action.payload;
    },
    setCommodityLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCommodities, setStatistics, setCommodityLoading } = commoditySlice.actions;
