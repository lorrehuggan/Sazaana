import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
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
        <SignIn />
        <Settings />
        {trackData && <Tracklist />}
      </Main>
      <Footer />
    </>
  );
}
