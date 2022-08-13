import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Query from "@/components/Query";
import Search from "@/components/Search";
import Settings from "@/components/Settings";
import SignIn from "@/components/SignIn";
import Tracklist from "@/components/Tracklist";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CALLBACK_URL } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@/lib/types/User";
import UserTopArtists from "@/components/User/TopArtists";
import { setUserState } from "@/lib/Redux/reducers/userReducer";

const fetcher = async (code: string) => {
  const response = await fetch(`${CALLBACK_URL}?code=${code}`, {
    headers: {
      Authorization: "",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

export default function Home() {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>(["getUser", code], () => fetcher(code), {
    enabled: code.length > 1,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const trackData = useAppSelector((state: RootState) => state.dataState.data);
  const router = useRouter();

  useEffect(() => {
    if (router.query.code as string) {
      setCode(router.query.code as string);
      router.push("/");
    }
  }, [router.query.code]);

  useEffect(() => {
    if (user) {
      dispatch(setUserState(user));
    }
  }, [user]);

  return (
    <>
      <Header user={user} />
      <Main>
        <Search />
        {user && <UserTopArtists user={user} />}
        {trackData && (
          <>
            <Query />
            <section className="canvas-width lg:relative lg:mx-auto lg:mt-8 lg:flex lg:space-x-4 ">
              <div>
                <div className="lg:sticky lg:top-5">
                  <SignIn />
                  <Settings />
                </div>
              </div>
              <Tracklist />
            </section>
          </>
        )}
      </Main>
      <Footer />
    </>
  );
}
