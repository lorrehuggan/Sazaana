import { Main } from "@/lib/types/mainSearch";
import Link from "next/link";
import * as React from "react";

export interface ITitleProps {
  track: Main;
}

export default function Title({ track }: ITitleProps) {
  return (
    <div className="flex-1 overflow-x-hidden">
      <Link href={track.data.albumURL}>
        <p className="truncate text-clip text-sm font-bold text-primary">
          {track.data.name.split("(")[0]}
        </p>
      </Link>
      <div className="flex flex-nowrap">
        {track.data.artist.map((artist, i) => {
          return (
            <Link key={i} href={artist.external_urls.spotify}>
              <p className="mr-1 truncate text-clip text-xs">{artist.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
