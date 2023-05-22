import TurnStone from "turnstone";
import { search } from "@/pages/api/_spotifyApi";

// Tailwind classes for Turnstone elements
const styles = {
  input:
    "w-full h-12 border border-oldsilver-300 py-2 pl-10 pr-7 text-xl outline-none rounded",
  inputFocus:
    "w-full h-12 border-x-0 border-t-0 border-b border-crystal-500 py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border",
  query: "text-oldsilver-800 placeholder-oldsilver-400",
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden`,
  clearButton:
    "absolute inset-y-0 right-0 w-8 inline-flex items-center justify-center text-crystal-500 hover:text-hotpink-300",
  typeahead: "text-slate-500",
  listbox:
    "w-full bg-white sm:border sm:border-crystal-500 sm:rounded text-left sm:mt-2 p-2 sm:drop-shadow-xl",
  groupHeading:
    "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-hotpink-300",
  item: "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700",
  highlightedItem:
    "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700 rounded bg-crystal-100",
  match: "font-semibold",
  noItems: "cursor-default text-center my-20",
};

const SearchBar = ({ handleOnSelect }) => {
  const listbox = {
    displayField: "name",
    data: async (query) => {
      try {
        const res = await search(query, "track");
        return res;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    searchType: "contains",
  };

  const Item = ({ item }) => {
    return (
      <div className="flex items-center cursor-pointer px-5 py-4">
        <img
          width={35}
          height={35}
          src={item.album.images[0].url}
          alt={item.name}
          className="rounded-full object-cover mr-3"
        />
        <p>{`${item.name} - ${item.artists[0].name}`}</p>
      </div>
    );
  };

  return (
    <TurnStone
      id="search"
      name="search"
      autoFocus={true}
      typeahead={true}
      clearButton={true}
      debounceWait={50}
      minQueryLength={2}
      listboxIsImmutable={true}
      maxItems={5}
      noItemsMessage="No results found matching your search"
      placeholder="Search for a song"
      listbox={listbox}
      styles={styles}
      Item={Item}
      onSelect={(item) => handleOnSelect(item)}
    />
  );
};

export default SearchBar;
