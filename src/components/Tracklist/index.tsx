import * as React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { convertMsToMinutesSeconds, randomizeArray } from "@/lib/utils";
import Heading from "./Heading";
import AlbumImage from "./Image";
import Title from "./Title";
import Preview from "./Preview";
import { Main } from "@/lib/types/mainSearch";
import Sort from "./Sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { setTrackSettingsState } from "@/lib/Redux/reducers/trackSettingsReducer";

export interface ITracklistProps {}

export default function Tracklist(props: ITracklistProps) {
  const [filterBy, setFilterBy] = React.useState<string | null>(null);
  const trackData = useAppSelector((state: RootState) => state.dataState.data)!;
  const [shuffle, setShuffle] = React.useState<Main[]>(trackData);
  const [tracklistDuration, setTracklistDuration] = React.useState<number>(0);
  const [sortByDance, setSortByDance] = React.useState(true);
  const [sortByEnergy, setSortByEnergy] = React.useState(true);
  const [sortByTempo, setSortByTempo] = React.useState(true);
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
    <section className="mx-auto my-6 lg:my-0 lg:flex-1">
      <Heading />
      <Sort
        setFilterBy={setFilterBy}
        sortByDance={sortByDance}
        filterBy={filterBy}
        setSortByDance={setSortByDance}
        setSortByEnergy={setSortByEnergy}
        setSortByTempo={setSortByTempo}
        setShuffle={setShuffle}
        shuffle={shuffle}
        sortByEnergy={sortByEnergy}
        sortByTempo={sortByTempo}
      />

      <div ref={parent}>
        {shuffle.length === 0 && (
          <p className="mt-2 text-sm uppercase">No tracks available</p>
        )}
        {shuffle.map((track, i) => {
          return (
            <div
              key={track.data.id}
              className="flex items-center space-x-4 py-2"
            >
              <AlbumImage track={track} />
              <Title track={track} />

              <Preview track={track} />

              <span className="text-xs">
                {convertMsToMinutesSeconds(track.data.duration)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
