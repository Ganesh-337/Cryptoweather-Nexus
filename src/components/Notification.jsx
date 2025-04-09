import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Notification = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (notification.type) {
      case "price_alert":
        return notification.priceChangePercent > 0 ? "📈" : "📉";
      case "weather_alert":
        return "🌦️";
      default:
        return "🔔";
    }
  };

  const getTitle = () => {
    switch (notification.type) {
      case "price_alert":
        return `${notification.symbol} Price Alert`;
      case "weather_alert":
        return "Weather Alert";
      default:
        return "Notification";
    }
  };

  const getMessage = () => {
    switch (notification.type) {
      case "price_alert":
        return `${notification.symbol} price ${
          notification.priceChangePercent > 0 ? "increased" : "decreased"
        } by ${Math.abs(notification.priceChangePercent).toFixed(2)}%`;
      case "weather_alert":
        return notification.message;
      default:
        return notification.message;
    }
  };

  const getColorClass = () => {
    switch (notification.type) {
      case "price_alert":
        return notification.priceChangePercent > 0
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200";
      case "weather_alert":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-white border-white";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full rounded-lg border p-4 shadow-lg ${getColorClass()} transform transition-all duration-00 ease-in-out`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 text-2xl mr-3">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">{getTitle()}</h3>
          <p className="mt-1 text-sm text-gray-500">{getMessage()}</p>
          {notification.type === "price_alert" && (
            <p className="mt-1 text-sm text-gray-300 font-medium">
              Current Price: ${notification.currentPrice.toLocaleString()}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
