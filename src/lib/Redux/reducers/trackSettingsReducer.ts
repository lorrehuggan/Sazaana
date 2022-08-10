import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface TrackSettingsState {
  maxNumOfTracks: number;
  popularity: number;
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
}

const initialState: TrackSettingsState = {
  maxNumOfTracks: 20,
  popularity: 0,
  danceability: 0,
  energy: 0,
  valence: 0,
  tempo: 0,
  acousticness: 0,
};

const trackSettingsStateSlice = createSlice({
  name: "trackSettingsState",
  initialState,
  reducers: {
    setTrackSettingsState: (
      state,
      action: PayloadAction<TrackSettingsState>
    ) => {
      state.maxNumOfTracks = action.payload.maxNumOfTracks;
      state.popularity = action.payload.popularity;
      state.danceability = action.payload.danceability;
      state.energy = action.payload.energy;
      state.valence = action.payload.valence;
      state.tempo = action.payload.tempo;
      state.acousticness = action.payload.acousticness;
    },
  },
});

export const { setTrackSettingsState } = trackSettingsStateSlice.actions;

export const updatePlayingState = (state: RootState) =>
  state.trackSettingsState;

export default trackSettingsStateSlice.reducer;
