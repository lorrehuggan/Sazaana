import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Search from "@/components/Search";

export default function Home() {
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
