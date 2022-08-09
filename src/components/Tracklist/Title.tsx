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
        <p className="truncate text-clip text-sm font-bold">
          {track.data.name}
        </p>
      </Link>
      <div className="flex flex-wrap">
        {track.data.artist.slice(0, 2).map((artist, i) => {
          return (
            <>
              <Link href={artist.external_urls.spotify}>
                <p key={i} className="mr-1 truncate text-clip text-xs">
                  {artist.name}
                </p>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
