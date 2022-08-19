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
        <span className="color-transition cursor-pointer truncate text-clip text-sm font-bold text-primary lg:text-lg lg:hover:text-secondary">
          {track.data.name.split("(")[0]}
        </span>
      </Link>
      <div className="flex flex-nowrap">
        {track.data.artist.slice(0, 20).map((artist, i) => {
          return (
            <Link key={i} href={artist.external_urls.spotify}>
              <span className="mr-1 cursor-pointer truncate text-clip text-xs transition-colors duration-200 ease-in-out lg:text-sm lg:hover:text-accent">
                {i < track.data.artist.length - 1
                  ? artist.name + ", "
                  : artist.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
