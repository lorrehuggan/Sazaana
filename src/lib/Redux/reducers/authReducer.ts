import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  access_token: string;
  refresh_token: string;
}

const initialState: AuthState = {
  access_token: "",
  refresh_token: "",
};

const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
  },
});

export const { setAuthState } = authStateSlice.actions;

export const updateAuthState = (state: RootState) => state.dataState.data;

export default authStateSlice.reducer;
