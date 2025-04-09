import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCityDetails } from "../../services/weatherDetailsService";
import { fetchWeatherData } from "../../store/slices/weatherSlice";

const WeatherDetails = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: cities } = useSelector((state) => state.weather);
  const [weatherDetails, setWeatherDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCityDetails(cityId);
        setWeatherDetails(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch weather details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [cityId]);

  // const conditions = weatherDetails.forecast.map((hour, index));


  const city = cities?.find((c) => c.cityId === cityId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !weatherDetails) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error || "City not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/weather")}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Weather
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {city?.city || "Weather Details"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Weather */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Current Weather
              </h2>
              <div className="space-y-4">
                <p className="text-4xl font-bold text-gray-900">
                  {weatherDetails.current.temperature}°C
                </p>
                <p className="text-gray-600">
                  Feels like: {weatherDetails.current.feels_like}°C
                </p>
                <p className="text-gray-600">
                  Conditions: {weatherDetails.current.conditions}
                </p>
                <p className="text-gray-600">
                  Humidity: {weatherDetails.current.humidity}%
                </p>
                <p className="text-gray-600">
                  Wind: {weatherDetails.current.wind_speed} km/h
                </p>
              </div>
            </div>

            {/* Forecast */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Hourly Forecast
              </h2>
              <div className="space-y-4">
                {weatherDetails.forecast.map((hour, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 pb-2"
                  >
                    <span className="text-gray-700">{hour.time}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-900">
                        {hour.temperature}°C
                      </span>
                      <span className="text-gray-600">{hour.conditions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
