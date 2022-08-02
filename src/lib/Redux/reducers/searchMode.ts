import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SearchModeState {
  searchMode: boolean;
}

const initialState: SearchModeState = {
  searchMode: false,
};

const searchModeSlice = createSlice({
  name: "searchMode",
  initialState,
  reducers: {
    setSearchMode: (state) => {
      state.searchMode = !state.searchMode;
    },
  },
});

export const { setSearchMode } = searchModeSlice.actions;

export const selectSearchMode = (state: RootState) =>
  state.searchMode.searchMode;

export default searchModeSlice.reducer;
