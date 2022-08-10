import { MainResponse } from "@/lib/types/mainSearch";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface PlayingState {
  playing: boolean;
}

const initialState: PlayingState = {
  playing: false,
};

const playingStateSlice = createSlice({
  name: "playingState",
  initialState,
  reducers: {
    setPlayingState: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
  },
});

export const { setPlayingState } = playingStateSlice.actions;

export const updatePlayingState = (state: RootState) => state.playingState;

export default playingStateSlice.reducer;
