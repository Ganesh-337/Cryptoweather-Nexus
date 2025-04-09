import React from "react";
import { Link } from "react-router-dom";

const WeatherCard = ({
  city,
  temperature,
  humidity,
  conditions,
  icon,
  cityId,
}) => {
  return (
    <Link to={`/weather/${cityId}`} className="block">
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{city}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={conditions}
            className="w-12 h-12"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Temperature:</span>
            <span className="font-semibold">{temperature}°C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Humidity:</span>
            <span className="font-semibold">{humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Conditions:</span>
            <span className="font-semibold">{conditions}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WeatherCard;
