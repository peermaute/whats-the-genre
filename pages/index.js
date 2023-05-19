import styles from "@/styles/Home.module.css";
import {
  search,
  getArtist,
  getGenreOfArtist,
} from "@/pages/api/_spotifyApi.js";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import Error from "@/components/Error";
import Genre from "@/components/Genre";

export default function Home() {
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);

  const handleOnSelect = async (item) => {
    if(!item) return;
    try {
      const genre = await getGenreOfArtist(item.artists[0].id);
      setGenre(genre);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className={"flex flex-col justify-center items-center h-screen"}>
      <SearchBar handleOnSelect={handleOnSelect}/>
      {error && <Error errorMsg={"Something went wrong."} />}
      {!error && genre && <Genre genre={genre}/>}
    </div>
  );
}
