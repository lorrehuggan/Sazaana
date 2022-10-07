import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SearchModeState {
  searchMode: boolean;
  loading: boolean;
}

const initialState: SearchModeState = {
  searchMode: false,
  loading: false,
};

const searchModeSlice = createSlice({
  name: "searchMode",
  initialState,
  reducers: {
    setSearchMode: (state) => {
      state.searchMode = !state.searchMode;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSearchMode, setLoadingState } = searchModeSlice.actions;

export const selectSearchMode = (state: RootState) =>
  state.searchMode.searchMode;

export default searchModeSlice.reducer;
