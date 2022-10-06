import { TEST_ENDPOINT } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import { setAppState } from "@/lib/Redux/reducers/appStateReducer";
import { setDataState } from "@/lib/Redux/reducers/dataReducer";
import { RootState } from "@/lib/Redux/store";
import { MainResponse } from "@/lib/types/mainSearch";
import { ArtistResponse } from "@/lib/types/PreSearch";
import { User } from "@/lib/types/User";
import { randomizeArray, useFetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import * as React from "react";
import { MAIN_ENDPOINT } from "@/lib/api";
import UseAppReset from "@/lib/hooks/useResetApp";
import { setTracklistState } from "@/lib/Redux/reducers/tracklistReducer";

export interface IUserTopArtistsProps {
  user: User;
}

const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const fetch = (id: string, accessToken: string) =>
  useFetcher({
    endpoint: `${MAIN_ENDPOINT}?id=${id}`,
    method: "POST",
    headers: {
      Authorization: AUTH_TOKEN,
      accessToken: accessToken,
    },
  });

export default function UserTopArtists({ user }: IUserTopArtistsProps) {
  const { resetApp } = UseAppReset();
  const accessToken = useAppSelector(
    (state: RootState) => state.authState.access_token
  );
  const [id, setId] = React.useState("");
  const { data, isLoading, isError } = useQuery<MainResponse>(
    ["userArtistSearch", id],
    () => fetch(id, accessToken),
    {
      enabled: id.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  const dispatch = useAppDispatch();

  const handleSearch = (id: string) => {
    console.log({ test: accessToken });

    resetApp();
    setId(id);
  };

  React.useEffect(() => {
    if (data) {
      dispatch(setDataState(randomizeArray([...data.data])));
      dispatch(setTracklistState(randomizeArray([...data.data])));
      dispatch(setAppState(""));
    }
  }, [data]);

  if (isLoading) {
    <div>loading...</div>;
  }

  if (isError) {
    <div>Error..</div>;
  }

  return (
    <section className="canvas-width mt-2 cursor-pointer">
      <div className="rounded bg-base-300 p-1">
        <p className="text-sm ">
          Artist you have listened to recently on Spotify
        </p>
      </div>
      <div className="mt-2 flex snap-x snap-mandatory flex-nowrap space-x-2 overflow-x-scroll ">
        {user.userTopArtists.body.items.slice(0, 5).map((item, index) => {
          return (
            <div
              key={item.id + index}
              onClick={() => handleSearch(item.id)}
              className="group relative h-32 w-44 shrink-0 snap-start overflow-hidden rounded-md shadow-lg sm:flex-1"
            >
              <div
                className=" absolute top-0 left-0 z-10 h-32 w-44 bg-gradient-to-tr from-primary to-secondary mix-blend-color group-hover:from-accent group-hover:to-accent-focus sm:h-full sm:w-full
              "
              />
              <div
                className=" absolute top-0 left-0 z-20 h-32 w-44 bg-gradient-to-t from-black/80 to-transparent sm:h-full sm:w-full
              "
              />
              <div
                className="absolute bottom-2 left-2 z-30  w-44 
              "
              >
                <span className="font-bold text-base-100">{item.name}</span>
              </div>

              <Image
                src={item.images[0].url}
                alt={item.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
