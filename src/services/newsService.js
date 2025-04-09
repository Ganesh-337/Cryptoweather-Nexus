const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

export const getCryptoNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&q=cryptocurrency&language=en&category=business,technology&size=5`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error('Failed to fetch news data');
    }

    return data.results.map(article => ({
      title: article.title,
      description: article.description,
      url: article.link,
      source: article.source_id,
      publishedAt: new Date(article.pubDate).toLocaleDateString(),
      imageUrl: article.image_url || null
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}; 