import * as React from "react";
import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { convertMsToMinutesSeconds, randomizeArray } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface ITracklistProps {}

export default function Tracklist(props: ITracklistProps) {
  const trackData = useAppSelector((state: RootState) => state.dataState.data)!;
  const trackListShuffled = randomizeArray([...trackData.data]);
  return (
    <section className="r-width mt-6">
      <h3 className="mb-2 font-bold">Curated Track List</h3>
      {trackListShuffled.slice(0, 20).map((track) => {
        return (
          <div key={track.data.id} className="flex items-center space-x-4 py-2">
            {/* main image */}

            <Link href={track.data.albumURL}>
              <div className="relative h-16 w-16 overflow-hidden rounded shadow-md">
                <Image
                  src={track.data.images[0].url}
                  alt={track.data.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </Link>

            {/* track name & artist name */}

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

            {/* duration & Preview */}

            <button className="text-xs">Preview</button>

            <span className="text-xs">
              {convertMsToMinutesSeconds(track.data.duration)}
            </span>
          </div>
        );
      })}
    </section>
  );
}
