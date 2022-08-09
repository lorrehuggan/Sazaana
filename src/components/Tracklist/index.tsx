import * as React from "react";
import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { convertMsToMinutesSeconds, randomizeArray } from "@/lib/utils";
import Heading from "./Heading";
import AlbumImage from "./Image";
import Title from "./Title";
import Preview from "./Preview";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Main } from "@/lib/types/mainSearch";

export interface ITracklistProps {}

export default function Tracklist(props: ITracklistProps) {
  const [filterBy, setFilterBy] = React.useState<string | null>(null);
  const [numberOfTracks, setNumberOfTracks] = React.useState(20);
  const trackData = useAppSelector((state: RootState) => state.dataState.data)!;
  const [shuffle, setShuffle] = React.useState<Main[]>(trackData.data);
  const [tracklistDuration, setTracklistDuration] = React.useState<number>(0);
  const [sortBy, setSortBy] = React.useState({
    danceAbility: true,
    energy: true,
    tempo: true,
  });

  React.useEffect(() => {
    setShuffle(randomizeArray([...trackData.data]));
    setShuffle(shuffle.slice(0, numberOfTracks));

    const durations = shuffle
      .slice(0, numberOfTracks)
      .map((track) => track.data.duration);

    setTracklistDuration(durations.reduce((acc, curr) => acc + curr, 0));
  }, [numberOfTracks]);

  const filteredBy = (filterBy: string) => {
    switch (filterBy) {
      case "danceability":
        setFilterBy("danceability");
        setShuffle(
          shuffle.sort(
            (a, b) => b.features.danceability - a.features.danceability
          )
        );

        break;
      case "energy":
        setFilterBy("energy");
        setShuffle(
          shuffle.sort((a, b) => b.features.energy - a.features.energy)
        );

        break;
      case "tempo":
        setFilterBy("tempo");
        setShuffle(shuffle.sort((a, b) => b.features.tempo - a.features.tempo));

        break;

      default:
        break;
    }
  };

  return (
    <section className="r-width my-6">
      <Heading totalDuration={tracklistDuration} />
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm">Sort by:</p>
        <div className="flex items-center space-x-1">
          <div
            onClick={() => filteredBy("danceability")}
            className={`flex cursor-pointer items-center space-x-1 border border-white p-1 text-xs uppercase ${
              filterBy === "danceability" ? "border-primary text-primary" : null
            }`}
          >
            <span>Dance-ability</span>
          </div>
          <div
            onClick={() => filteredBy("energy")}
            className={`flex cursor-pointer items-center space-x-1 border border-white p-1 text-xs uppercase  ${
              filterBy === "energy" ? "border-primary text-primary" : null
            }`}
          >
            <span>Energy</span>
          </div>
          <div
            onClick={() => filteredBy("tempo")}
            className={`flex cursor-pointer items-center space-x-1 border border-white p-1 text-xs uppercase  ${
              filterBy === "tempo" ? "border-primary text-primary" : null
            }`}
          >
            <span>Tempo</span>
          </div>
        </div>
      </div>
      {shuffle.map((track) => {
        return (
          <div key={track.data.id} className="flex items-center space-x-4 py-2">
            <AlbumImage track={track} />

            <Title track={track} />

            <Preview track={track} />

            <span className="text-xs">
              {convertMsToMinutesSeconds(track.data.duration)}
            </span>
          </div>
        );
      })}
    </section>
  );
}
