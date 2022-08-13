import { Main } from "@/lib/types/mainSearch";
import * as React from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export interface ISortProps {
  sortByDance: boolean;
  filterBy: string | null;
  setFilterBy: (filterBy: string | null) => void;
  setSortByDance: (sortByDance: boolean) => void;
  setSortByEnergy: (sortByEnergy: boolean) => void;
  setSortByTempo: (sortByTempo: boolean) => void;
  setShuffle: (shuffle: Main[]) => void;
  shuffle: Main[];
  sortByEnergy: boolean;
  sortByTempo: boolean;
}

export default function Sort({
  sortByDance,
  filterBy,
  setFilterBy,
  setSortByDance,
  setSortByEnergy,
  setSortByTempo,
  setShuffle,
  shuffle,
  sortByEnergy,
  sortByTempo,
}: ISortProps) {
  const filteredBy = (filterBy: string) => {
    switch (filterBy) {
      case "danceability":
        setFilterBy("danceability");
        setSortByDance(!sortByDance);
        sortByDance
          ? setShuffle(
              shuffle.sort(
                (a, b) => b.features.danceability + a.features.danceability
              )
            )
          : setShuffle(
              shuffle.sort(
                (a, b) => b.features.danceability - a.features.danceability
              )
            );

        break;
      case "energy":
        setFilterBy("energy");
        setSortByEnergy(!sortByEnergy);
        sortByEnergy
          ? setShuffle(
              shuffle.sort((a, b) => b.features.energy + a.features.energy)
            )
          : setShuffle(
              shuffle.sort((a, b) => b.features.energy - a.features.energy)
            );

        break;
      case "tempo":
        setFilterBy("tempo");
        setSortByTempo(!sortByTempo);
        sortByTempo
          ? setShuffle(
              shuffle.sort((a, b) => b.features.tempo + a.features.tempo)
            )
          : setShuffle(
              shuffle.sort((a, b) => b.features.tempo - a.features.tempo)
            );

        break;

      default:
        break;
    }
  };
  return (
    <div className="mb-2 flex items-center justify-between">
      <p className="text-sm">Sort by:</p>
      <div className="flex items-center space-x-1">
        <div
          onClick={() => filteredBy("danceability")}
          className={`flex cursor-pointer items-center space-x-1 border border-base-content p-1 text-xs uppercase ${
            filterBy === "danceability"
              ? "border-primary bg-primary text-base-content"
              : null
          }`}
        >
          {!sortByDance && filterBy === "danceability" ? (
            <FiArrowUp />
          ) : sortByDance && filterBy === "danceability" ? (
            <FiArrowDown />
          ) : null}
          <span>Dance-ability</span>
        </div>
        <div
          onClick={() => filteredBy("energy")}
          className={`flex cursor-pointer items-center space-x-1 border border-base-content p-1 text-xs uppercase ${
            filterBy === "energy"
              ? "border-primary bg-primary text-base-content"
              : null
          }`}
        >
          {!sortByEnergy && filterBy === "energy" ? (
            <FiArrowUp />
          ) : sortByEnergy && filterBy === "energy" ? (
            <FiArrowDown />
          ) : null}
          <span>Energy</span>
        </div>
        <div
          onClick={() => filteredBy("tempo")}
          className={`flex cursor-pointer items-center space-x-1 border border-base-content p-1 text-xs uppercase ${
            filterBy === "tempo"
              ? "border-primary bg-primary text-base-content"
              : null
          }`}
        >
          {!sortByTempo && filterBy === "tempo" ? (
            <FiArrowUp />
          ) : sortByTempo && filterBy === "tempo" ? (
            <FiArrowDown />
          ) : null}
          <span>Tempo</span>
        </div>
      </div>
    </div>
  );
}
