import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className={"flex flex-col justify-center items-center"}>
        <Main />
      </div>
      <div className="absolute bottom-0 right-0">
        <Footer />
      </div>
    </>
  );
}
