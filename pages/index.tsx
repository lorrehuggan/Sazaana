import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Query from "@/components/Query";
import Search from "@/components/Search";
import Settings from "@/components/Settings";
import SignIn from "@/components/SignIn";
import Tracklist from "@/components/Tracklist";
import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";

export default function Home() {
  const trackData = useAppSelector((state: RootState) => state.dataState.data);
  return (
    <>
      <Header />
      <Main>
        <Search />
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
