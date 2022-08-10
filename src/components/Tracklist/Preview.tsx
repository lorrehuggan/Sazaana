import { Main } from "@/lib/types/mainSearch";
import * as React from "react";
import { Howl, Howler } from "howler";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { setPlayingState } from "@/lib/Redux/reducers/playingStateReducer";

export interface IPreviewProps {
  track: Main;
}

export default function Preview({ track }: IPreviewProps) {
  const [playPosition, setPlayPosition] = React.useState<number>(0);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const playingState = useAppSelector(
    (state: RootState) => state.playingState.playing
  );
  const dispatch = useAppDispatch();

  const start = () => {
    previewTrack.play();
  };

  const stop = () => {
    Howler.stop();
    setPlaying(false);
    dispatch(setPlayingState(false));
    previewTrack.stop();
    previewTrack.seek(0);
    setPlayPosition(0);
  };

  const previewTrack = new Howl({
    src: [track.data.preview_url!],
    html5: true,
    preload: true,
    autoplay: false,
    loop: false,
    volume: 0.5,
    onplay: () => {
      setPlaying(true);
      dispatch(setPlayingState(true));
    },
    onend: () => {
      stop();
    },
  });

  const play = () => {
    if (playingState) {
      stop();
      return;
    }
    start();
    setInterval(() => {
      setPlayPosition(
        Math.floor((previewTrack.seek() / previewTrack.duration()) * 100)
      );
      return;
    }, 1000);
  };

  return (
    <>
      {track.data.preview_url && (
        <button onClick={play} className="w-12 text-xs">
          <p>Preview</p>
          <progress
            className="progress progress-primary mt-0 h-2 w-full items-center"
            value={playPosition}
            max="100"
          ></progress>
        </button>
      )}
    </>
  );
}
