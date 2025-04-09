import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          Welcome to CryptoWeather Nexus
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5 pt-10">
          <Link to="/crypto" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cryptocurrency
              </h2>
              <p className="text-gray-600">
                Track real-time cryptocurrency prices and market data
              </p>
            </div>
          </Link>
          {/* Crypto Section */}

          {/* Weather Section */}
          <Link to="/weather" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Weather
              </h2>
              <p className="text-gray-600">
                Check weather conditions for your favorite cities
              </p>
            </div>
          </Link>

          {/* News Section */}
          <Link to="/news" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                News
              </h2>
              <p className="text-gray-600">
                Stay updated with the latest cryptocurrency news
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
