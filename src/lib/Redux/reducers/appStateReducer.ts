import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AppState {
  message: string;
}

const initialState: AppState = {
  message: "",
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (
      state,
      action: PayloadAction<"searching" | "loading" | "">
    ) => {
      state.message = action.payload;
    },
  },
});

export const { setAppState } = appStateSlice.actions;

export const updateAppState = (state: RootState) => state.appState.message;

export default appStateSlice.reducer;
