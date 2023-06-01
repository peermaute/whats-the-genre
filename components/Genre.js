import Output from "./Output";

const Genre = ({ genre }) => {
  return (
    <Output title="Genre" text={toTitleCase(genre)} />
  );
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default Genre;