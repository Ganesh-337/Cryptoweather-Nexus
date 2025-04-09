import React from "react";
import { Link } from "react-router-dom";

const CryptoCard = ({ name, symbol, price, change_24h, market_cap, id }) => {
  const isPositive = change_24h && change_24h.includes("+");
  const changeColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <Link to={`/crypto/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <span className="text-gray-500">{symbol}</span>
          </div>
          <div className={`text-2xl font-bold ${changeColor}`}>
            {change_24h}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price:</span>
            <span className="font-semibold">{price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Market Cap:</span>
            <span className="font-semibold">{market_cap}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;
