const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

const cities = [
  { name: 'New York', id: 5128581 },
  { name: 'London', id: 2643743 },
  { name: 'Tokyo', id: 1850147 }
];

export const getWeatherForCities = async () => {
  try {
    const weatherPromises = cities.map(city => 
      fetch(`${BASE_URL}?id=${city.id}&units=metric&appid=${API_KEY}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data || !data.main || !data.weather || !data.weather[0]) {
            throw new Error('Invalid data structure received from API');
          }
          return {
            city: city.name,
            cityId: city.id,
            temperature: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            conditions: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind_speed: data.wind.speed,
            wind_deg: data.wind.deg,
            visibility: data.visibility / 1000, // Convert to kilometers
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
          };
        })
        .catch(error => {
          console.error(`Error fetching weather for ${city.name}:`, error);
          return {
            city: city.name,
            cityId: city.id,
            temperature: 'N/A',
            feels_like: 'N/A',
            humidity: 'N/A',
            pressure: 'N/A',
            conditions: 'Error',
            description: 'Error fetching data',
            icon: '01d',
            wind_speed: 'N/A',
            wind_deg: 'N/A',
            visibility: 'N/A',
            sunrise: 'N/A',
            sunset: 'N/A'
          };
        })
    );

    return await Promise.all(weatherPromises);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
}; 