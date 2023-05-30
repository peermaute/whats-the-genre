import { getGenreOfArtist } from "@/pages/api/_spotifyApi.js";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Error from "@/components/Error";
import Genre from "@/components/Genre";
import Footer from "@/components/Footer";

export default function Home() {
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);

  const handleOnSelect = async (item) => {
    if (!item || typeof item === "string") return;
    try {
      const genre = await getGenreOfArtist(item.artists[0].id);
      console.log("genre");
      console.log(genre);
      !genre || genre.length < 1 ? setGenre("Not Found :(") : setGenre(genre);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleOnClear = () => {
    setGenre(null);
    setError(null);
  };

  return (
    <div className={"flex flex-col justify-center items-center h-screen"}>
      <h1 className={"text-4xl font-bold mb-4 text-center"}>
        Find the genre of a song
      </h1>
      <SearchBar
        handleOnSelect={handleOnSelect}
        setError={setError}
        handleOnClear={handleOnClear}
      />
      {error && <Error errorMsg={error} />}
      {!error && genre && <Genre genre={genre} />}
      <div className="absolute bottom-0 right-0">
        <Footer />
      </div>
    </div>
  );
}
