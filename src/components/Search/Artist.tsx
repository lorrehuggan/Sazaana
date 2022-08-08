import { ArtistResponse } from "@/lib/types/PreSearch";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MAIN_ENDPOINT } from "@/lib/api";
import { MainResponse } from "@/lib/types/mainSearch";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";
import { setDataState } from "@/lib/Redux/reducers/dataReducer";
import { RootState } from "@/lib/Redux/store";

export interface IArtistSearchProps {
  artists: ArtistResponse | undefined;
  setValue: (value: string) => void;
}

const AUTH_TOKEN =
  "BQC-Z-uPC6Kz97-S9103cFFbcXdlrYXEaGkW7HBC9qoaAAYycIo8E1bNCuYTVBq4f17rJr-DPLKj2xEOG99mIShPBYmtLyvr33McHulJHtuzlkGaqs";

const fetcher = async (id: string) => {
  const response = await fetch(`${MAIN_ENDPOINT}?id=${id}`, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

export default function ArtistSearchResults({
  artists,
  setValue,
}: IArtistSearchProps) {
  const [id, setId] = useState("");
  const appState = useAppSelector((state: RootState) => state.appState.message);
  const { data, isLoading, isError } = useQuery<MainResponse>(
    ["mainSearch", id],
    () => fetcher(id),
    {
      enabled: appState === "searching" && id.length > 0,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setDataState(data));
    }
  }, [data]);

  return (
    <ul className="r-width border-neutral z-50 mx-auto max-h-52 overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 py-2 shadow-lg">
      {artists?.data.map((artist, i) => {
        return (
          <li
            onClick={() => {
              setId(artist.id);
            }}
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
