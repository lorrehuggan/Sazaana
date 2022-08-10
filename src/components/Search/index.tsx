import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";
import { setSearchMode } from "../../lib/Redux/reducers/searchMode";
import { ArtistResponse } from "@/lib/types/PreSearch";
import { useQuery } from "@tanstack/react-query";
import ArtistSearchResults from "./Artist";
import { setAppState } from "@/lib/Redux/reducers/appStateReducer";
import { RootState } from "@/lib/Redux/store";
import Loading from "./Loading";

type Props = {};

const AUTH_TOKEN = process.env.AUTH_TOKEN as string;

const fetcher = async (id: string, state: string) => {
  const response = await fetch(
    `http://localhost:5000/api/main/pre-search?${state}=${id}`,
    {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

const Search = (props: Props) => {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState("artist");
  const appState = useAppSelector((state: RootState) => state.appState.message);

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery<ArtistResponse>(
    ["preSearch", value],
    () => fetcher(value, state),
    {
      enabled: appState === "searching" && value.length > 0,
    }
  );

  const dispatch = useAppDispatch();

  const handleSwitch = (e: any) => {
    if (state === "artist") setState("track");
    if (state === "track") setState("artist");
    setEnabled(e);
    dispatch(setSearchMode());
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0 && e.target.value.length < 12) {
      dispatch(setAppState("searching"));
    } else {
      dispatch(setAppState(""));
    }
    setValue(e.target.value);
  };

  return (
    <>
      <section className="r-width border-b-neutral-300 border-b-2 pt-4">
        <h1 className="display-font mb-4 text-5xl font-extrabold tracking-tighter">
          {`Discover new music with the help of your favorite artist`}
        </h1>
        <div className="flex items-center">
          <input
            data-testid="search-input"
            name="Artist"
            value={value}
            onChange={handleInput}
            className=" w-full bg-transparent py-1 focus:outline-none"
            type="text"
            placeholder={`Search By ${enabled ? "Track" : "Artist"}`}
          />
          <span className="text-xs">Reset</span>
        </div>
      </section>
      {/* these need be taken care of in the near future */}
      {isLoading && appState === "searching" && <Loading />}
      {artists && appState === "searching" ? (
        <ArtistSearchResults artists={artists} setValue={setValue} />
      ) : null}
    </>
  );
};

export default Search;
