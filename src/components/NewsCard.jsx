import React from "react";

const NewsCard = ({ article, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(article)}
    >
      {article.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{article.source}</span>
          <span className="text-sm text-gray-500">{article.publishedAt}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        <div className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          Read more →
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
