import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SearchState {
  id: string;
  name: string;
}

const initialState: SearchState = {
  id: "",
  name: "",
};

const SearchStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<SearchState>) => {
      state = { id: action.payload.id, name: action.payload.name };
    },
  },
});

export const { setSearchState } = SearchStateSlice.actions;

export const SearchState = (state: RootState) => state;

export default SearchStateSlice.reducer;
