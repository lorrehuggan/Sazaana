import { ArtistResponse } from "@/lib/types/PreSearch";
import Image from "next/image";
import React from "react";

export interface IArtistSearchProps {
  artists: ArtistResponse | undefined;
}

export default function ArtistSearch({ artists }: IArtistSearchProps) {
  return (
    <ul className="r-width z-50 mx-auto h-32 overflow-y-scroll rounded-b-xl py-2 shadow-lg">
      {artists?.data.map((artist, i) => {
        return (
          <li
            key={i}
            className="flex cursor-pointer items-center space-x-2 p-2 hover:bg-neutral-100"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="text-sm">{artist.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
