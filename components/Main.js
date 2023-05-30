import { getGenreOfArtist } from "@/pages/api/_spotifyApi.js";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Error from "@/components/Error";
import Genre from "@/components/Genre";

const Main = () => {
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
    <main className="sm:w-4/5 w-96 max-w-3xl flex justify-center flex-col items-center">
      <SearchBar
        handleOnSelect={handleOnSelect}
        setError={setError}
        handleOnClear={handleOnClear}
      />
      {error && <Error errorMsg={error} />}
      {!error && genre && <Genre genre={genre} />}
    </main>
  );
};

export default Main;
