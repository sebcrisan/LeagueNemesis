import { useState } from "react";
import "./App.css";
import "./styles/styles.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8">
      <div className="w-full max-w-md mx-auto overflow-hidden">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-4">
          League of Legends Nemesis
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Summoner Name:
            <input
              type="text"
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              required
              className="mt-2 p-3 w-full border rounded-md text-lg sm:text-xl"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-3 rounded-md w-full transition duration-150 text-lg sm:text-xl"
          >
            {loading ? "Loading..." : "Fetch Data"}
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center h-16">
            <div className="loader"></div>
          </div>
        )}{" "}
        {/* Loading spinner */}
        {data.length > 0 && (
          <div className="result mt-8 w-full max-w-md overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Results:</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Champion</TableCell>
                    <TableCell>Games Played Against</TableCell>
                    <TableCell>Loss Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.index}>
                      <TableCell>{item.index}</TableCell>
                      <TableCell>{item.champion}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.loss_percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
