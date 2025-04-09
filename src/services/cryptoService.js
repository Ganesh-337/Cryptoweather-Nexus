// import { API_KEYS } from '../config/api';

const BASE_URL = import.meta.env.VITE_CRYPTO_BASE_URL;
// const API_KEY = 'CG-vKxp9uLL7TCxadQ8ArJzhK5s';

const cryptocurrencies = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' }
];

// Rate limiting helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getCryptoData = async () => {
  try {
    const ids = cryptocurrencies.map(crypto => crypto.id).join(',');
    const response = await fetch(
      `${BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
      }
    );

    if (response.status === 429) {
      // If we hit rate limit, wait and retry once
      await delay(10000); // Wait 10 seconds
      return getCryptoData(); // Retry the request
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return cryptocurrencies.map(crypto => {
      const cryptoData = data[crypto.id];
      if (!cryptoData) {
        return {
          cryptoId: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          price: 'N/A',
          change_24h: 'N/A',
          market_cap: 'N/A',
          volume_24h: 'N/A'
        };
      }

      return {
        cryptoId: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        price: cryptoData.usd,
        change_24h: cryptoData.usd_24h_change,
        market_cap: cryptoData.usd_market_cap,
        volume_24h: cryptoData.usd_24h_vol
      };
    });
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return cryptocurrencies.map(crypto => ({
      cryptoId: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: 'N/A',
      change_24h: 'N/A',
      market_cap: 'N/A',
      volume_24h: 'N/A'
    }));
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const formatPercentage = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always'
  }).format(value / 100);
};

const formatMarketCap = (value) => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  return formatCurrency(value);
}; 