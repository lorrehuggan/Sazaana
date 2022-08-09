import * as React from "react";
import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { convertMsToMinutesSeconds, randomizeArray } from "@/lib/utils";
import Heading from "./Heading";
import AlbumImage from "./Image";
import Title from "./Title";
import Preview from "./Preview";
import { Main } from "@/lib/types/mainSearch";
import Sort from "./Sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface ITracklistProps {}

export default function Tracklist(props: ITracklistProps) {
  const [filterBy, setFilterBy] = React.useState<string | null>(null);
  const [numberOfTracks, setNumberOfTracks] = React.useState(20);
  const trackData = useAppSelector((state: RootState) => state.dataState.data)!;
  const [shuffle, setShuffle] = React.useState<Main[]>(trackData.data);
  const [tracklistDuration, setTracklistDuration] = React.useState<number>(0);
  const [sortByDance, setSortByDance] = React.useState(true);
  const [sortByEnergy, setSortByEnergy] = React.useState(true);
  const [sortByTempo, setSortByTempo] = React.useState(true);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
    duration: 350,
  });

  React.useEffect(() => {
    setShuffle(randomizeArray([...trackData.data]));
    setShuffle(shuffle.slice(0, numberOfTracks));

    const durations = shuffle
      .slice(0, numberOfTracks)
      .map((track) => track.data.duration);

    setTracklistDuration(durations.reduce((acc, curr) => acc + curr, 0));
  }, [numberOfTracks]);

  return (
    <section className="r-width my-6">
      <Heading totalDuration={tracklistDuration} />
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm">Sort by:</p>
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
      </div>
      <div ref={parent}>
        {shuffle.map((track) => {
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
