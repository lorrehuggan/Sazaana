import { RootState } from "@/lib/Redux/store";
import { convertMsToMinutesSeconds } from "@/lib/utils";
import * as React from "react";
import { useAppSelector } from "../../lib/Redux/hooks";

export interface IHeadingProps {
  totalDuration: number;
}

export default function Heading({ totalDuration }: IHeadingProps) {
  const numOfTracks = useAppSelector(
    (state: RootState) => state.trackSettingsState.maxNumOfTracks
  );
  return (
    <div className="flex w-full items-center justify-between">
      <h3 className="mb-2 text-lg font-bold uppercase text-primary">
        Tracklist
      </h3>
      <div className="space-x-2">
        <span className="text-xs">{`${numOfTracks} tracks`}</span>
        <span className="text-xs">{`${convertMsToMinutesSeconds(
          totalDuration
        )}`}</span>
      </div>
    </div>
  );
}
