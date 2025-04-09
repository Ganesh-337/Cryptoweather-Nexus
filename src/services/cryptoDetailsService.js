// import { API_KEYS } from '../config/api';

const BASE_URL = import.meta.env.VITE_CRYPTO_BASE_URL;
// const API_KEY = 'CG-vKxp9uLL7TCxadQ8ArJzhK5s';


export const getCryptoDetails = async (cryptoId) => {
  if (!cryptoId) {
    throw new Error('Crypto ID is required');
  }

  try {
    // Get current market data
    const marketResponse = await fetch(
      `${BASE_URL}/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!marketResponse.ok) {
      throw new Error(`HTTP error! status: ${marketResponse.status}`);
    }

    const marketData = await marketResponse.json();

    // Get historical data for chart (last 7 days)
    const historicalResponse = await fetch(
      `${BASE_URL}/coins/${cryptoId}/market_chart?vs_currency=usd&days=7&interval=daily`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!historicalResponse.ok) {
      throw new Error(`HTTP error! status: ${historicalResponse.status}`);
    }

    const historicalData = await historicalResponse.json();

    // Process historical data for chart
    const priceHistory = historicalData.prices.map(item => ({
      date: new Date(item[0]).toLocaleDateString(),
      price: item[1]
    }));

    return {
      current: {
        name: marketData.name,
        symbol: marketData.symbol.toUpperCase(),
        current_price: marketData.market_data.current_price.usd,
        market_cap: marketData.market_data.market_cap.usd,
        total_volume: marketData.market_data.total_volume.usd,
        high_24h: marketData.market_data.high_24h.usd,
        low_24h: marketData.market_data.low_24h.usd,
        price_change_24h: marketData.market_data.price_change_24h,
        price_change_percentage_24h: marketData.market_data.price_change_percentage_24h,
        circulating_supply: marketData.market_data.circulating_supply,
        total_supply: marketData.market_data.total_supply,
        max_supply: marketData.market_data.max_supply
      },
      history: priceHistory
    };
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    throw error;
  }
}; 