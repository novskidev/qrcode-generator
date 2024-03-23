import React, { useEffect, useState } from "react";

function App() {
  const [link, setLink] = useState("");
  const [qrData, setQrData] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=150x150`);
      setIsHidden((prev) => !prev);
      setQrData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDownload = () => {
    if (qrData && qrData.url) {
      const downloadUrl = qrData.url;
      window.open(downloadUrl);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex justify-center items-center flex-row w-screen h-screen bg-gray-300'>
      <div className='flex flex-col justify-start items-center h-fit w-2/6 p-6 bg-white'>
        <h1 className="text-xl font-bold font-mono mt-4">QR Code Generator</h1>
        <input onChange={(e) => {setLink(e.target.value)}} className='rounded border-2 border-sky-600 w-3/4 p-1 mt-6' type="text" placeholder='Enter Link' />
        <button onClick={fetchData} className="w-3/4 mt-2 bg-sky-600 text-white">Generate</button>
        {qrData && <img className="w-3/4 mt-8" src={qrData.url} alt="QR Code" />}
        <button hidden={isHidden} onClick={handleDownload} className="w-3/4 mt-8 bg-sky-600 text-white">Download 🔽</button>
      </div>
    </div>
  );
}

export default App;
