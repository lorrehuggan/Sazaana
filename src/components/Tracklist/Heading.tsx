import { RootState } from "@/lib/Redux/store";
import { convertMsToMinutesSeconds } from "@/lib/utils";
import * as React from "react";
import { useAppSelector } from "../../lib/Redux/hooks";

export interface IHeadingProps {}

export default function Heading({}: IHeadingProps) {
  const numOfTracks = useAppSelector(
    (state: RootState) => state.trackSettingsState.maxNumOfTracks
  );
  return (
    <div className="mb-2 flex w-full items-center justify-between">
      <h3 className=" text-lg font-bold uppercase text-primary">Tracklist</h3>
    </div>
  );
}
