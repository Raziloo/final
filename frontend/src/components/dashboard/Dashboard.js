import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TickerInput from "./TickerInput";
import TimeRangeButtons from "./TimeRangeButtons";
import StockChart from "./StockChart";
import { getPolygonParams } from "../../utils/utils";
import PastPredictions from "./PastPredictions";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [timeRange, setTimeRange] = useState("1M");
  const [stockData, setStockData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [pastPredictions, setPastPredictions] = useState([]);

  useEffect(() => {
    const storedPredictions = JSON.parse(localStorage.getItem("pastPredictions")) || [];
    setPastPredictions(storedPredictions);
  }, []);

  const fetchStockData = async (range = timeRange, symbol = ticker) => { // Ensure range defaults to current timeRange
    try {
      setError("");
      setStockData(null);
  
      console.log(`Fetching stock data for: ${symbol}, Range: ${range}`); // Debugging log
  
      const { multiplier, timespan, from, to } = getPolygonParams(range);
    
      if (!multiplier || !timespan || !from || !to) {
        throw new Error("Invalid time range");
      }
  
      const polygonURL = `https://api.polygon.io/v2/aggs/ticker/${symbol.toUpperCase()}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=5000&apiKey=${
        process.env.REACT_APP_POLYGON_API_KEY
      }`;
  
      const response = await fetch(polygonURL);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  
      const data = await response.json();
      if (!data.results || !Array.isArray(data.results)) throw new Error("No valid data returned");
  
      const results = data.results;
  
      const allLabels = results.map((bar) => {
        const dateObj = new Date(bar.t);
        return range === "1D"
          ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : dateObj.toLocaleDateString();
      });
  
      const allData = results.map((bar) => bar.o);
  
      const latestPrice = results[results.length - 1].c;
  
      setStockData({
        labels: allLabels,
        datasets: [
          {
            label: `${symbol.toUpperCase()} Stock Price (${range})`,
            data: allData,
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      });
  
      setCurrentPrice(latestPrice);
    } catch (err) {
      console.error("Error fetching stock data:", err.message);
      setError(err.message);
    }
  };

  const fetchPrediction = async () => {
    setLoadingPrediction(true);
    try {
      setError("");
      setPrediction(null);

      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker }),
      });

      if (!response.ok) throw new Error(`Prediction request failed with status ${response.status}`);

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setPrediction(data);

      // Save the prediction to localStorage
      const newPrediction = {
        ticker: ticker.toUpperCase(),
        predictedPrice: data.predicted_price.toFixed(2),
        date: new Date().toLocaleString(),
      };

      const updatedPredictions = [newPrediction, ...pastPredictions].slice(0, 5); // Keep last 5 predictions
      setPastPredictions(updatedPredictions);
      localStorage.setItem("pastPredictions", JSON.stringify(updatedPredictions));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPrediction(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br dark:from-purple-500 dark:to-blue-600 text-gray-900 dark:text-white pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <motion.header
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Your Trading Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-white/80">
            Analyze stock data and get AI-powered predictions!
          </p>
        </motion.header>

        {/* Input & Controls */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="w-full max-w-xs">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Stock Symbol"
            />
          </div>
          <motion.button
            className={`px-6 py-3 rounded shadow-md text-lg font-semibold transition-colors duration-300 ${
              loadingPrediction
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-400 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTimeRange("1M");
              fetchStockData("1M");
              fetchPrediction();
            }}
            disabled={loadingPrediction}
          >
            {loadingPrediction ? "Loading..." : "Get Prediction"}
          </motion.button>
        </motion.div>

        {/* Time Range Buttons */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <TimeRangeButtons
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            fetchStockData={fetchStockData}
          />
        </motion.div>

        {/* Error or Labels */}
        {error && (
          <motion.p
            className="text-red-600 text-center font-semibold"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}

        {currentPrice && (
          <motion.div
            className="bg-gray-100 dark:bg-white/10 p-4 rounded-md shadow-md text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg font-semibold">
              Current price for{" "}
              <span className="text-blue-600 dark:text-blue-300">
                {ticker.toUpperCase()}
              </span>{" "}
              is{" "}
              <span className="text-green-600 dark:text-green-400">
                ${currentPrice.toFixed(2)}
              </span>
              .
            </p>
          </motion.div>
        )}

        {prediction && (
          <motion.div
            className="bg-gray-100 dark:bg-white/10 p-6 rounded-md shadow-lg text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Prediction
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
              The predicted stock price for{" "}
              <span className="text-blue-600 dark:text-blue-300">
                {ticker.toUpperCase()}
              </span>{" "}
              is{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ${prediction.predicted_price.toFixed(2)}
              </span>
              .
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Prediction Date: {prediction.date}
            </p>

            {/* AI Disclaimer Message */}
            <motion.p
              className="mt-4 text-l text-gray-800 dark:text-red-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ⚠️ AI predictions are based on past trends and do not guarantee
              future performance. Always conduct your own research before making
              financial decisions.
            </motion.p>
          </motion.div>
        )}


        {/* Stock Chart */}
        {stockData && (
          <motion.div
            className="bg-gray-100 dark:bg-white/10 p-6 rounded-md shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <StockChart
              stockData={stockData}
              ticker={ticker}
              timeRange={timeRange}
            />
          </motion.div>
        )}
      </div>
      <PastPredictions pastPredictions={pastPredictions} onSelectPrediction={fetchStockData} range={timeRange}/>
    </motion.div>
    
  );
};

export default Dashboard;
