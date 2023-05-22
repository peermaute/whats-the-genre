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

  return (
    <div className={"flex flex-col justify-center items-center h-screen"}>
      <SearchBar/>
    </div>
  );
}
