import { Main } from "@/lib/types/mainSearch";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaPlay } from "react-icons/fa";

export interface IAlbumImageProps {
  track: Main;
}

export default function AlbumImage({ track }: IAlbumImageProps) {
  return (
    <Link href={track.data.trackURL}>
      <div className="transform-transition group relative h-16 w-16 cursor-pointer overflow-hidden rounded shadow-album lg:h-20 lg:w-20 lg:hover:-translate-y-2 lg:hover:rotate-2 xl:h-28 xl:w-28">
        {/* <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
          <FaPlay className="h-6 w-6 text-white active:text-primary xl:hidden" />
        </div> */}
        <div className=" absolute top-0 left-0 z-10 h-16 w-16 bg-gradient-to-r from-primary to-secondary opacity-0 mix-blend-color transition-opacity duration-200 ease-in-out group-hover:opacity-100 lg:h-20 lg:w-20 xl:h-28 xl:w-28 "></div>
        <Image
          src={track.data.images[0].url}
          alt={track.data.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Link>
  );
}
