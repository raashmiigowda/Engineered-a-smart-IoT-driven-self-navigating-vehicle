import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then(data => setData(data));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const sendCommand = (action) => {
    fetch("http://localhost:5000/control", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action })
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 Smart Vehicle Dashboard</h1>

      <h2>Live Data</h2>
      {data.map((item, index) => (
        <div key={index}>
          Distance: {item.distance} cm | Direction: {item.direction}
        </div>
      ))}

      <h2>Controls</h2>
      <button onClick={() => sendCommand("forward")}>Forward</button>
      <button onClick={() => sendCommand("left")}>Left</button>
      <button onClick={() => sendCommand("right")}>Right</button>
      <button onClick={() => sendCommand("stop")}>Stop</button>
    </div>
  );
}

export default App;
