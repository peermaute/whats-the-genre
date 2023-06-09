import React, { useState, useCallback, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { search } from "@/pages/api/_spotifyApi";
import Box from "@mui/material/Box";

function SearchBar({
  handleOnSelect,
  setError,
  handleOnClear,
  isSong,
  toggleSearchBarFocus,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setOptions([]);
    setInputValue("");
  }, [isSong]);

  const handleInputChange = useCallback(
    async (event) => {
      if (!event.target.value || event.target.value.length < 3)
        return setOptions([]);
      try {
        const searchString = isSong ? "track" : "artist";
        const res = await search(event.target.value, searchString);
        if (!res || res.length < 0) return setOptions([]);
        setOptions(res);
        setError(null);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch search results");
      }
    },
    [setError, isSong]
  );

  const getImageUrl = (option) => {
    if (isSong) {
      return option.album.images.length > 0 ? option.album.images[0].url : null;
    } else {
      return option.images.length > 0 ? option.images[0].url : null;
    }
  };

  const handleRenderInput = (props, option) => {
    return (
      <Box
        component="li"
        sx={{ "& > img": { mr: 2, flexShrink: 0 }, borderRadius: 2 }}
        {...props}
      >
        <img
          loading="lazy"
          width="20"
          src={getImageUrl(option)}
          alt={option.name}
        />
        {isSong ? option.name + " - " + option.artists[0].name : option.name}
      </Box>
    );
  };

  return (
    <Autocomplete
      options={options}
      sx={{
        boxShadow: 1,
        backgroundColor: "white",
        pl: 1.5,
        pr: 1.5,
        pt: 1,
        pb: 2,
        borderRadius: 2,
      }}
      getOptionLabel={(option) => {
        if (option && typeof option === "object") {
          return option.name;
        }
        if (typeof option === "string") {
          return option;
        }
        return "";
      }}
      filterOptions={(options) => options}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          value={inputValue}
          label={isSong ? "Search for a Song" : "Search for an Artist"}
          variant="standard"
          color="grey"
        />
      )}
      onFocus={toggleSearchBarFocus}
      onBlur={toggleSearchBarFocus}
      renderOption={(props, option) => handleRenderInput(props, option)}
      autoComplete
      freeSolo
      isOptionEqualToValue={(option, value) => {
        if (
          !value ||
          !option ||
          !option.artists ||
          option.artists.length < 1 ||
          option.artists.length < 1 ||
          !option.artists[0].name
        )
          return false;
        return (
          option.name === value.name &&
          option.artists[0].name === value.artists[0].name
        );
      }}
      onChange={(event, value, reason) => {
        handleOnSelect(value);
        if (reason === "clear") handleOnClear();
      }}
    />
  );
}

export default SearchBar;
