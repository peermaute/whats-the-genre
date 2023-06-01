const Output = ({ title, text }) => {
  return (
    <div className="flex flex-col text-gray-800 bg-white mt-5 p-3 rounded-lg shadow-md">
      <p>{title}</p>
      <hr style={{
          background: 'gray',
          height: '1.5px',
          marginTop: '5px',
          marginBottom: '5px'
        }}/>
      <p>{text}</p>
    </div>
  );
}

export default Output;