import { getGenreOfArtist } from "@/pages/api/_spotifyApi.js";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Error from "@/components/Error";
import Genre from "@/components/Genre";
import SearchSwitch from "./SearchSwitch";

const heightOfSwitch = 66;
const heigtOfSearchBar = 72;
const heightOffSet = heightOfSwitch + heigtOfSearchBar / 2;

const Main = () => {
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const [isSong, setIsSong] = useState(true);

  const toggleIsSong = () => {
    setIsSong(!isSong);
    setError(null);
    setGenre(null);
  };

  const handleOnSelect = async (item) => {
    if (!item || typeof item === "string") return;
    try {
      let genre;
      if (!isSong && item.type === "artist") {
        genre = await getGenreOfArtist(item.id);
      } else {
        genre = await getGenreOfArtist(item.artists[0].id);
      }
      !genre || genre.length < 1 ? setGenre("Not Found :(") : setGenre(genre);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleOnClear = () => {
    setGenre(null);
    setError(null);
  };

  return (
    <main className="sm:w-4/5 w-96 max-w-3xl flex flex-col items-center justify-center">
      <div className="w-10/12">
        <div style={{ marginTop: `calc(50vh - ${heightOffSet}px)` }}>
          <div className="flex flex-row-reverse">
            <SearchSwitch toggleIsSong={toggleIsSong} />
          </div>
          <SearchBar
            handleOnSelect={handleOnSelect}
            setError={setError}
            handleOnClear={handleOnClear}
            isSong={isSong}
          />
        </div>
        {error && <Error errorMsg={error} />}
        {!error && genre && <Genre genre={genre} />}
      </div>
    </main>
  );
};

export default Main;
