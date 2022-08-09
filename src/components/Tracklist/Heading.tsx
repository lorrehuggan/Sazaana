import { convertMsToMinutesSeconds } from "@/lib/utils";
import * as React from "react";

export interface IHeadingProps {
  totalDuration: number;
}

export default function Heading({ totalDuration }: IHeadingProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <h3 className="mb-2 font-bold">Tracklist</h3>
      <div className="space-x-2">
        <span className="text-xs">{`20 tracks`}</span>
        <span className="text-xs">{`${convertMsToMinutesSeconds(
          totalDuration
        )}`}</span>
      </div>
    </div>
  );
}
