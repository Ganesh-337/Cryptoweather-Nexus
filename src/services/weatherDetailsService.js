const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

export const getCityDetails = async (cityId) => {
  try {
    // Get current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?id=${cityId}&units=metric&appid=${API_KEY}`
    );
    
    if (!currentResponse.ok) {
      throw new Error(`HTTP error! status: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();

    // Get 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?id=${cityId}&units=metric&appid=${API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error(`HTTP error! status: ${forecastResponse.status}`);
    }

    const forecastData = await forecastResponse.json();

    // Process forecast data for chart
    const hourlyForecast = forecastData.list.map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString(),
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
      conditions: item.weather[0].main
    }));

    return {
      current: {
        temperature: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        conditions: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon
      },
      forecast: hourlyForecast
    };
  } catch (error) {
    console.error('Error fetching city details:', error);
    throw error;
  }
}; 