import { Main } from "@/lib/types/mainSearch";
import Link from "next/link";
import * as React from "react";

export interface ITitleProps {
  track: Main;
}

export default function Title({ track }: ITitleProps) {
  return (
    <div className="flex-1 overflow-x-hidden">
      <Link href={track.data.trackURL}>
        <p className="cursor-pointer truncate text-clip text-sm font-bold text-primary lg:text-lg">
          {track.data.name.split("(")[0]}
        </p>
      </Link>
      <div className="flex flex-nowrap">
        {track.data.artist.map((artist, i) => {
          return (
            <Link key={i} href={artist.external_urls.spotify}>
              <p className="mr-1 cursor-pointer truncate text-clip text-xs transition-colors duration-200 ease-in-out lg:text-sm lg:hover:text-accent">
                {artist.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
