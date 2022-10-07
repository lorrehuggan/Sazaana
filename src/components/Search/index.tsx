import { SearchInput } from "./SearchInput";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";
import { ArtistResponse } from "@/lib/types/PreSearch";
import { useQuery } from "@tanstack/react-query";
import ArtistSearchResults from "./Dropdown";
import { setAppState } from "@/lib/Redux/reducers/appStateReducer";
import { RootState } from "@/lib/Redux/store";
import Loading from "./Loading";
import UseAppReset from "@/lib/hooks/useResetApp";
import { useFetcher } from "@/lib/utils";
import { PRE_ENDPOINT } from "@/lib/api";
import useKeyPress from "@/lib/hooks/useKeyPress";

type Props = {};

const AUTH_TOKEN = process.env.AUTH_TOKEN as string;

const fetch = (id: string, state: string) =>
  useFetcher({
    endpoint: `${PRE_ENDPOINT}?artist=${id}`,
    method: "GET",
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

const Search = (props: Props) => {
  const { resetApp } = UseAppReset();
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [state, setState] = useState("artist");
  const appState = useAppSelector((state: RootState) => state.appState.message);
  const enterPressed = useKeyPress("Enter");
  const xPressed = useKeyPress("x");

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery<ArtistResponse>(
    ["preSearch", userQuery],
    () => fetch(userQuery, state),
    {
      enabled: appState === "searching" && value.length > 0,
    }
  );
  const dispatch = useAppDispatch();

  //search with enter button
  useEffect(() => {
    if (enterPressed) {
      handleSearch();

      return;
    }
  }, [enterPressed, xPressed]);

  const handleSearch = () => {
    if (artists) {
      resetApp();
    }
    if (value.length > 0 && value.length < 12) {
      dispatch(setAppState("searching"));
    } else {
      dispatch(setAppState(""));
    }
    setUserQuery(value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <section className="border-b-neutral-300 canvas-width mx-auto  border-b-2 pt-4">
        <h1 className=" mb-4 text-5xl font-extrabold tracking-tighter xl:text-8xl">
          {`Discover new music with the help of your favorite artists`}
        </h1>
        <SearchInput
          value={value}
          handleInput={handleInput}
          handleSearch={handleSearch}
          resetApp={resetApp}
        />
      </section>

      {/* TODO these need be taken care of in the near future */}
      {isLoading && appState === "searching" && <Loading />}
      {artists && appState === "searching" ? (
        <ArtistSearchResults artists={artists} setValue={setValue} />
      ) : null}
    </>
  );
};

export default Search;
