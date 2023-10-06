import { useState } from "react";
import "./App.css";
import "./styles/styles.css";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">League of Legends Nemesis</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <label className="block mb-4">
          Summoner Name:
          <input
            type="text"
            value={summonerName}
            onChange={(e) => setSummonerName(e.target.value)}
            required
            className="mt-2 p-2 w-full border rounded-md"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </form>
      {data.length > 0 && (
        <div className="result mt-8 bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Results:</h2>
          <ul>
            {data.map((item) => (
              <li key={item.index} className="mb-2">
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
