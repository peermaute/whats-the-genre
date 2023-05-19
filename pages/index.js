import styles from "@/styles/Home.module.css";
import { search, getArtist, getGenreOfArtist } from "@/pages/api/_spotifyApi.js";
import { useEffect, useState } from "react";

export default function Home() {
  const [songList, setSongList] = useState([]);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fillState = async () => {
      try{
        const data = await search("hello", "track");
        if(data){
          setSongList(data);
        }
        const genre = await getGenreOfArtist("4dpARuHxo51G3z768sgnrY");
        if(genre){
          setArtist(genre);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fillState();
  }, []);

  return (
    <>
        <ul>
      {songList.map((song) => (
        <li key={song.id}>{song.name}</li>
      ))}
    </ul>
    <h1>{artist}</h1>
    </>
  );
}
