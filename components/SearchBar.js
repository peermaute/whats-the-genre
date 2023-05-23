import React, { useState, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { search } from "@/pages/api/_spotifyApi";
import Box from "@mui/material/Box";

function SearchBar({ handleOnSelect, setError }) {
  const [options, setOptions] = useState([]);

  const handleInputChange = useCallback(
    async (event) => {
      if (!event.target.value || event.target.value.length < 3)
        return setOptions([]);
      try {
        const res = await search(event.target.value, "track");
        if (!res || res.length < 0) return setOptions([]);
        setOptions(res);
        setError(null);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch search results");
      }
    },
    [setError]
  );

  const handleRenderInput = (props, option) => {
    return (
      <Box
        component="li"
        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
        {...props}
      >
        <img
          loading="lazy"
          width="20"
          src={option.album.images[0].url}
          alt={option.name}
        />
        {option.name + " - " + option.artists[0].name}
      </Box>
    );
  };

  return (
    <Autocomplete
      className="w-1/2"
      options={options}
      getOptionLabel={(option) => {
        if (option && typeof option === "object") {
          return option.name
        }
        if(typeof option === 'string'){
          return option
        }
        return ""
      }}
      filterOptions={(options) => options}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label="Search for a song" variant="outlined" />
      )}
      renderOption={(props, option) => handleRenderInput(props, option)}
      autoComplete
      freeSolo
      isOptionEqualToValue={(option, value) =>
        option.name === value.name &&
        option.artists[0].name === value.artists[0].name
      }
      onChange={(event, value) => handleOnSelect(value)}
    />
  );
}

export default SearchBar;
