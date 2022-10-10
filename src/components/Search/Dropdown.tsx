import { ArtistResponse } from "@/lib/types/PreSearch";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MAIN_ENDPOINT, TEST_ENDPOINT } from "@/lib/api";
import { MainResponse } from "@/lib/types/mainSearch";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";
import { setDataState } from "@/lib/Redux/reducers/dataReducer";
import { setSearchState } from "@/lib/Redux/reducers/SearchReducer";
import { RootState } from "@/lib/Redux/store";
import { setAppState } from "@/lib/Redux/reducers/appStateReducer";
import { randomizeArray } from "@/lib/utils";
import { setTracklistState } from "@/lib/Redux/reducers/tracklistReducer";
import { setLoadingState } from "@/lib/Redux/reducers/searchMode";

export interface IArtistSearchProps {
  artists: ArtistResponse | undefined;
  setValue: (value: string) => void;
}

const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const fetcher = async (id: string) => {
  const response = await fetch(`${MAIN_ENDPOINT}?id=${id}`, {
    method: "POST",
    headers: {
      Authorization: AUTH_TOKEN!,
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
  const { maxNumOfTracks } = useAppSelector(
    (state: RootState) => state.trackSettingsState
  );
  const [id, setId] = useState("");
  const appState = useAppSelector((state: RootState) => state.appState.message);
  const { data, isLoading, isError } = useQuery<MainResponse>(
    ["mainSearch", id],
    () => fetcher(id),
    {
      enabled: id.length > 0,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setDataState(randomizeArray([...data.data])));
      dispatch(setTracklistState(randomizeArray([...data.data])));
      dispatch(setAppState(""));
    }
  }, [data]);

  const handleSearch = (id: string, name: string) => {
    dispatch(setLoadingState(true));

    setValue("");
    setId(id);
    setSearchState({ id, name });
    dispatch(setAppState("searching"));
  };

  return (
    <div className="dropdown-open ">
      <div className="flex h-48 flex-col overflow-y-scroll bg-base-100 px-4 shadow-lg">
        {artists?.data.map((artist, i) => {
          return (
            <div
              onClick={() => handleSearch(artist.id, artist.name)}
              key={i}
              className="group flex cursor-pointer  items-center space-x-2  p-2 transition-all duration-200 ease-in-out hover:bg-base-300"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image
                  src={artist.images[0].url}
                  alt={artist.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="color-transition text-sm font-bold text-base-content">
                {artist.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
