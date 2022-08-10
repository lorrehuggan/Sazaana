import { configureStore } from "@reduxjs/toolkit";
import searchModeReducer from "./reducers/searchMode";
import appStateReducer from "./reducers/appStateReducer";
import dataStateReducer from "./reducers/dataReducer";
import searchStateReducer from "./reducers/SearchReducer";
import playingStateReducer from "./reducers/playingStateReducer";
import trackSettingsReducer from "./reducers/trackSettingsReducer";

export const store = configureStore({
  reducer: {
    searchMode: searchModeReducer,
    appState: appStateReducer,
    dataState: dataStateReducer,
    playingState: playingStateReducer,
    searchState: searchStateReducer,
    trackSettingsState: trackSettingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
