import { Main } from "@/lib/types/mainSearch";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IAlbumImageProps {
  track: Main;
}

export default function AlbumImage({ track }: IAlbumImageProps) {
  return (
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
  );
}
