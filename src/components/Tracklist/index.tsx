import * as React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { convertMsToMinutesSeconds, randomizeArray } from "@/lib/utils";
import Heading from "./Heading";
import AlbumImage from "./Image";
import Title from "./Title";
import Preview from "./Preview";
import { Main } from "@/lib/types/mainSearch";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { setTracklistState } from "@/lib/Redux/reducers/tracklistReducer";

export interface ITracklistProps {}

export default function Tracklist(props: ITracklistProps) {
  const trackData = useAppSelector((state: RootState) => state.dataState.data)!;
  const [shuffle, setShuffle] = React.useState<Main[]>(trackData);
  const tracklistState = useAppSelector(
    (state: RootState) => state.tracklistState.tracklist
  )!;
  const dispatch = useAppDispatch();

  const {
    maxNumOfTracks,
    popularity,
    energy,
    tempo,
    danceability,
    acousticness,
    valence,
  } = useAppSelector((state: RootState) => state.trackSettingsState);

  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
    duration: 350,
  });

  React.useEffect(() => {
    if (
      popularity > 0 ||
      energy > 0 ||
      tempo > 0 ||
      danceability > 0 ||
      acousticness > 0 ||
      valence > 0
    ) {
      dispatch(
        setTracklistState(
          trackData.slice(0, maxNumOfTracks).filter((track) => {
            return (
              track.data.popularity >= popularity &&
              track.features.energy >= energy &&
              track.features.tempo >= tempo &&
              track.features.danceability >= danceability &&
              track.features.acousticness >= acousticness &&
              track.features.valence >= valence
            );
          })
        )
      );
      setShuffle(
        trackData.slice(0, maxNumOfTracks).filter((track) => {
          return (
            track.data.popularity >= popularity &&
            track.features.energy >= energy &&
            track.features.tempo >= tempo &&
            track.features.danceability >= danceability &&
            track.features.acousticness >= acousticness &&
            track.features.valence >= valence
          );
        })
      );
    } else {
      dispatch(setTracklistState(trackData.slice(0, maxNumOfTracks)));
      setShuffle(trackData.slice(0, maxNumOfTracks));
    }
  }, [
    maxNumOfTracks,
    popularity,
    energy,
    tempo,
    danceability,
    acousticness,
    valence,
  ]);

  return (
    <section className="mx-auto my-6 lg:my-0 lg:w-[calc(968px/3*2)] lg:flex-1">
      <Heading />

      <div ref={parent}>
        {tracklistState.length === 0 && (
          <div className="mt-6 flex h-full w-full items-center justify-center">
            <p className="text-2xl font-extrabold text-primary">
              No Tracks Available...
            </p>
          </div>
        )}
        {tracklistState.map((track, i) => {
          return (
            <div
              key={track.data.id}
              className="relative flex items-center space-x-4 py-2"
            >
              <AlbumImage track={track} />
              <Title track={track} />

              <Preview track={track} />

              <span className="text-xs">
                {convertMsToMinutesSeconds(track.data.duration)}
              </span>
              <div className="absolute right-0 top-[80%] -z-10 h-[1px] w-full  bg-black/20" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
