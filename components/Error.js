const Error = ({ errorMsg }) => {
  return (
    <div className="error">
      <h1>{errorMsg}</h1>
    </div>
  );
}

export default Error;