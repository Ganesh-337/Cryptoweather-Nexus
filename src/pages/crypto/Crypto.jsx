import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCryptoData,
  addFavorite,
  removeFavorite,
} from "../../store/slices/cryptoSlice";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

const Crypto = () => {
  const dispatch = useDispatch();
  const {
    data: cryptos,
    loading,
    error,
    favorites,
  } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => dispatch(fetchCryptoData()), 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleFavoriteToggle = (cryptoId) => {
    if (favorites.includes(cryptoId)) {
      dispatch(removeFavorite(cryptoId));
    } else {
      dispatch(addFavorite(cryptoId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Cryptocurrency Dashboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptos.map((crypto) => (
              <div
                key={crypto.cryptoId}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <Link to={`/crypto/${crypto.cryptoId}`} className="flex-1">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {crypto.name}
                      </h2>
                      <p className="text-gray-600">{crypto.symbol}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleFavoriteToggle(crypto.cryptoId)}
                    className="text-red-500 hover:text-red-600 transition-colors duration-200 ml-4"
                  >
                    {favorites.includes(crypto.cryptoId) ? (
                      <HeartIconSolid className="h-6 w-6" />
                    ) : (
                      <HeartIconOutline className="h-6 w-6" />
                    )}
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-gray-900">
                    ${crypto.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    24h Change: {crypto.change_24h}%
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <p className="text-sm text-gray-600">
                      Market Cap: ${crypto.market_cap}
                    </p>
                    <p className="text-sm text-gray-600">
                      Volume: ${crypto.volume_24h}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Crypto;
