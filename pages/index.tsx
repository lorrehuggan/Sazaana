import { useEffect } from "react";
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
import UserTopArtists from "@/components/User/TopArtists";
import Head from "next/head";
import CreatePlaylist from "@/components/CreatePlaylist";
import UseAuth from "@/lib/hooks/useAuth";
import { setAuthState } from "@/lib/Redux/reducers/authReducer";

export default function Home() {
  const { access_token, refresh_token } = UseAuth();
  const trackData = useAppSelector((state: RootState) => state.dataState.data);
  const userData = useAppSelector((state: RootState) => state.userState.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!access_token || !refresh_token) return;

    dispatch(
      setAuthState({
        access_token,
        refresh_token,
      })
    );
    console.log({ access_token });
  });

  return (
    <>
      <Head>
        <title>Sazaana</title>
      </Head>
      <Header />
      <Main>
        <Search />
        {userData && <UserTopArtists user={userData} />}
        {trackData && (
          <>
            <Query />
            <section className="canvas-width lg:relative lg:mx-auto lg:mt-8 lg:flex lg:space-x-4 ">
              <div className="lg:w-[calc(968px/3)]">
                <div className="lg:sticky lg:top-5">
                  {userData ? <CreatePlaylist /> : <SignIn />}
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
