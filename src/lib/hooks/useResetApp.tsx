import * as React from "react";
import { useAppDispatch } from "../Redux/hooks";
import { setAppState } from "../Redux/reducers/appStateReducer";
import { setDataState } from "../Redux/reducers/dataReducer";
import { setPlayingState } from "../Redux/reducers/playingStateReducer";
import { setTrackSettingsState } from "../Redux/reducers/trackSettingsReducer";

export default function UseAppReset() {
  const dispatch = useAppDispatch();
  function resetApp() {
    dispatch(setDataState(null));
    dispatch(setAppState(""));
    dispatch(setPlayingState(false));
    dispatch(
      setTrackSettingsState({
        popularity: 0,
        tempo: 0,
        danceability: 0,
        energy: 0,
        valence: 0,
        acousticness: 0,
        maxNumOfTracks: 20,
      })
    );
  }
  return { resetApp };
}
