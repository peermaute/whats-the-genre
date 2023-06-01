import Output from "./Output";

const Error = ({ errorMsg }) => {
  return (
    <Output title="Error" text={errorMsg} />
  );
}

export default Error;