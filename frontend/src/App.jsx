import { useState } from "react";
import "./App.css";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/get-data", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summonerName }),
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      } else {
        console.error("Error fetching data:", response.statusText);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>League of Legends Nemesis</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Summoner Name:
          <input
            type="text"
            value={summonerName}
            onChange={(e) => setSummonerName(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </form>
      {data.length > 0 && (
        <div className="result">
          <h2>Results:</h2>
          <ul>
            {data.map((item) => (
              <li key={item.index}>
                {item.index} - {item.champion} - {item.count} games played
                against - {item.loss_percentage}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
