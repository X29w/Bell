import { createSlice } from '@reduxjs/toolkit';

interface SpaceState {
  list: Space.Info[];
  currentId: string | null;
  loading: boolean;
}

const initialState: SpaceState = {
  list: [],
  currentId: null,
  loading: false,
};

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setSpaces(state, action) {
      state.list = action.payload;
      if (!state.currentId && action.payload.length > 0) {
        state.currentId = action.payload[0].id;
      }
    },
    setCurrentSpace(state, action) {
      state.currentId = action.payload;
    },
    setSpaceLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setSpaces, setCurrentSpace, setSpaceLoading } = spaceSlice.actions;
