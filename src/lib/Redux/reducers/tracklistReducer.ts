import { Main } from "@/lib/types/mainSearch";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface DataState {
  tracklist: Main[] | null;
}

const initialState: DataState = {
  tracklist: null,
};

const tracklistStateSlice = createSlice({
  name: "tracklistState",
  initialState,
  reducers: {
    setTracklistState: (state, action: PayloadAction<Main[] | null>) => {
      state.tracklist = action.payload;
    },
  },
});

export const { setTracklistState } = tracklistStateSlice.actions;

export const updateTracklistState = (state: RootState) =>
  state.tracklistState.tracklist;

export default tracklistStateSlice.reducer;
