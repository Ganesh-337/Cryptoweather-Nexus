import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsData } from "../../store/slices/newsSlice";
import NewsCard from "../../components/NewsCard";
import NewsModal from "../../components/NewsModal";

const News = () => {
  const dispatch = useDispatch();
  const { data: news, loading, error } = useSelector((state) => state.news);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    dispatch(fetchNewsData());
    const interval = setInterval(() => dispatch(fetchNewsData()), 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          News Dashboard
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
            {news.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                onClick={handleArticleClick}
              />
            ))}
          </div>
        )}

        {selectedArticle && (
          <NewsModal article={selectedArticle} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default News;
