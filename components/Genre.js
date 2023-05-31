const Genre = ({ genre }) => {
  return (
    <div className="pt-10 text-center text-gray-700">
      <h1 className="text-xl font-bold">Genre: {toTitleCase(genre)}</h1>
    </div>
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