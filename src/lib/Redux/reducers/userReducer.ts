import { Main, MainResponse } from "@/lib/types/mainSearch";
import { User } from "@/lib/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserState } = userStateSlice.actions;

export const updateUserState = (state: RootState) => state.userState.user;

export default userStateSlice.reducer;
