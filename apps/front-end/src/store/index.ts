import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slice/count.slice";

export const store = configureStore({
	reducer: {
		counterSlice: counterSlice.reducer,
	},
});
