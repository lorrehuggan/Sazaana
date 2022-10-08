import { SearchInput } from "./SearchInput";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";
import { ArtistResponse } from "@/lib/types/PreSearch";
import { useQuery } from "@tanstack/react-query";
import ArtistSearchResults from "./Dropdown";
import { setAppState } from "@/lib/Redux/reducers/appStateReducer";
import { RootState } from "@/lib/Redux/store";
import UseAppReset from "@/lib/hooks/useResetApp";
import { useFetcher } from "@/lib/utils";
import { PRE_ENDPOINT } from "@/lib/api";
import useKeyPress from "@/lib/hooks/useKeyPress";
import { setLoadingState } from "@/lib/Redux/reducers/searchMode";
import { setDataState } from "@/lib/Redux/reducers/dataReducer";

type Props = {};

const AUTH_TOKEN = process.env.AUTH_TOKEN as string;

const fetch = (id: string) =>
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
  const deletePressed = useKeyPress("Backspace");
  const xPressed = useKeyPress("x");
  const loading = useAppSelector(
    (state: RootState) => state.searchMode.loading
  );
  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery<ArtistResponse>(
    ["preSearch", userQuery],
    () => fetch(userQuery),
    {
      enabled: appState === "searching" && value.length > 1,
      refetchOnWindowFocus: false,
    }
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (deletePressed) {
      dispatch(setLoadingState(false));
    }

    if (value.length < 1) {
      dispatch(setLoadingState(false));
    }
  }, [value]);

  // set global loading state on search
  useEffect(() => {
    if (appState === "searching") {
      dispatch(setLoadingState(isLoading));
    } else if (appState === "") {
      dispatch(setLoadingState(false));
    }
    return () => {};
  }, [isLoading]);

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

    if (value.length > 0 && value.length < 15) {
      dispatch(setLoadingState(isLoading));
      dispatch(setAppState("searching"));
      setUserQuery(value);
    } else {
      dispatch(setAppState(""));
    }
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
      {artists && appState === "searching" ? (
        <ArtistSearchResults artists={artists} setValue={setValue} />
      ) : null}
    </>
  );
};

export default Search;
