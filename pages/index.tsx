import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Search from "@/components/Search";
import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";

export default function Home() {
  const dataState = useAppSelector((state: RootState) => state.dataState.data);
  return (
    <>
      <Header />
      <Main>
        <Search />
      </Main>
      <Footer />
    </>
  );
}
