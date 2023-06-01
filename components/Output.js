const Output = ({ title, text }) => {
  return (
    <div className="flex flex-col text-gray-700 bg-white mt-5 p-3 rounded-lg drop-shadow-lg shadow-black">
      <p>{title}</p>
      <hr style={{
          background: '#424242',
          height: '1.5px',
          marginTop: '5px',
          marginBottom: '5px'
        }}/>
      <p>{text}</p>
    </div>
  );
}

export default Output;