import { ArtistResponse } from "@/lib/types/PreSearch";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TEST_ENDPOINT } from "@/lib/api";
import { MainResponse } from "@/lib/types/mainSearch";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";
import { setDataState } from "@/lib/Redux/reducers/dataReducer";
import { setSearchState } from "@/lib/Redux/reducers/SearchReducer";
import { RootState } from "@/lib/Redux/store";
import { setAppState } from "@/lib/Redux/reducers/appStateReducer";

export interface IArtistSearchProps {
  artists: ArtistResponse | undefined;
  setValue: (value: string) => void;
}

const AUTH_TOKEN =
  "BQC-Z-uPC6Kz97-S9103cFFbcXdlrYXEaGkW7HBC9qoaAAYycIo8E1bNCuYTVBq4f17rJr-DPLKj2xEOG99mIShPBYmtLyvr33McHulJHtuzlkGaqs";

const fetcher = async (id: string) => {
  const response = await fetch(`${TEST_ENDPOINT}?id=${id}`, {
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
      dispatch(setAppState(""));
    }
  }, [data]);

  const handleSearch = (id: string, name: string) => {
    setId(id);
    setSearchState({ id, name });
  };

  return (
    <div className="dropdown-open">
      <div className="r-width  dropdown-content menu max-h-56 space-y-3 overflow-y-scroll rounded-b-xl bg-base-300 p-2 py-2 text-neutral shadow-lg">
        {artists?.data.map((artist, i) => {
          return (
            <div
              onClick={() => handleSearch(artist.id, artist.name)}
              key={i}
              className="flex cursor-pointer items-center space-x-2 transition-all duration-200 ease-in-out hover:bg-pink-300"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image
                  src={artist.images[0].url}
                  alt={artist.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-sm font-bold text-white">{artist.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
