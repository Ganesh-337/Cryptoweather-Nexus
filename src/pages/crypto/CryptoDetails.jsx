import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoDetails } from "../../services/cryptoDetailsService";
// import { fetchCryptoData } from "../../store/slices/cryptoSlice";

const CryptoDetails = () => {
  const { cryptoId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: cryptocurrencies } = useSelector((state) => state.crypto);
  const [cryptoDetails, setCryptoDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCryptoDetails(cryptoId);
        setCryptoDetails(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch cryptocurrency details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [cryptoId]);

  const crypto = cryptocurrencies?.find((c) => c.cryptoId === cryptoId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !cryptoDetails) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error || "Cryptocurrency not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/crypto")}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Cryptocurrencies
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {crypto?.name || "Cryptocurrency Details"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Market Data */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Market Data
              </h2>
              <div className="space-y-4">
                <p className="text-4xl font-bold text-gray-900">
                  {cryptoDetails.current.current_price}
                </p>
                <p
                  className={`text-lg ${
                    cryptoDetails.current.price_change_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {cryptoDetails.current.price_change_24h} (
                  {cryptoDetails.current.price_change_percentage_24h}%)
                </p>
                <p className="text-gray-600">
                  Market Cap: {cryptoDetails.current.market_cap}
                </p>
                <p className="text-gray-600">
                  24h Volume: {cryptoDetails.current.total_volume}
                </p>
                <p className="text-gray-600">
                  High 24h: {cryptoDetails.current.high_24h}
                </p>
                <p className="text-gray-600">
                  Low 24h: {cryptoDetails.current.low_24h}
                </p>
              </div>
            </div>

            {/* Supply Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Supply Information
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Circulating Supply: {cryptoDetails.current.circulating_supply}
                </p>
                <p className="text-gray-600">
                  Total Supply: {cryptoDetails.current.total_supply || "N/A"}
                </p>
                <p className="text-gray-600">
                  Max Supply: {cryptoDetails.current.max_supply || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Price History Chart */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Price History (7 Days)
            </h2>
            <div className="h-64">
              {/* Here you would typically integrate a charting library like Chart.js or Recharts */}
              <div className="flex items-end h-full space-x-2">
                {cryptoDetails.history.map((day, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{
                      height: `${
                        (day.price /
                          Math.max(
                            ...cryptoDetails.history.map((d) => d.price)
                          )) *
                        100
                      }%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
