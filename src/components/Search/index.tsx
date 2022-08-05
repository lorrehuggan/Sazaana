import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAppDispatch } from "../../lib/Redux/hooks";
import { setSearchMode } from "../../lib/Redux/reducers/searchMode";
import usePreSearch from "@/lib/hooks/usePreSearch";
import { ArtistResponse } from "@/lib/types/PreSearch";
import { useQuery } from "@tanstack/react-query";
import ArtistSearch from "./Artist";

type Props = {};

const fetcher = async (id: string, state: string) => {
  const response = await fetch(
    `http://localhost:5000/api/main/pre-search?${state}=${id}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

const Search = (props: Props) => {
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState("artist");

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery<ArtistResponse>(
    ["preSearch", value],
    () => fetcher(value, state),
    {
      enabled: isSearching,
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
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    setValue(e.target.value);
  };

  return (
    <>
      <section className="r-width border-b-2 border-b-neutral-300 pt-4">
        <h1 className="display-font mb-4 font-display text-5xl">
          Discover new music with the help of old favorites
        </h1>
        <div className="flex items-center">
          <input
            data-testid="search-input"
            name={`${enabled ? "Track" : "Artist"}`}
            value={value}
            onChange={handleInput}
            className=" w-full py-1 focus:outline-none"
            type="text"
            placeholder={`Search By ${enabled ? "Track" : "Artist"}`}
          />
          <Switch
            data-testid="search-switch"
            checked={enabled}
            onChange={handleSwitch}
            className={`${
              enabled ? "bg-c-teal-300" : "bg-c-teal-400"
            } relative mx-1 inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out`}
          >
            <span
              className={`${
                enabled ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </section>
      {artists && isSearching && <ArtistSearch artists={artists} />}
    </>
  );
};

export default Search;
