import { Main, MainResponse } from "@/lib/types/mainSearch";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface DataState {
  data: Main[] | null;
}

const initialState: DataState = {
  data: null,
};

const dataStateSlice = createSlice({
  name: "dataState",
  initialState,
  reducers: {
    setDataState: (state, action: PayloadAction<Main[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setDataState } = dataStateSlice.actions;

export const updateDataState = (state: RootState) => state.dataState.data;

export default dataStateSlice.reducer;
