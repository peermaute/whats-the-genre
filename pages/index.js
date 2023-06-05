import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="h-screen">
        <div className={"flex flex-col justify-center items-center"}>
          <Main />
        </div>
      </div>
      <div className="bottom-0 right-0">
        <Footer />
      </div>
    </>
  );
}
