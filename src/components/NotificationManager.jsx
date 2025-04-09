import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { websocketService } from "../services/websocketService";
import Notification from "./Notification";

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Update current route in websocket service
    websocketService.setCurrentRoute(location.pathname);

    // Connect to appropriate service based on route
    if (location.pathname === "/crypto") {
      websocketService.connect();
    } else if (location.pathname === "/weather") {
      // Simulate weather alerts every 30 seconds
      const weatherInterval = setInterval(() => {
        websocketService.simulateWeatherAlert();
      }, 30000);

      return () => clearInterval(weatherInterval);
    }

    // Subscribe to notifications
    const unsubscribe = websocketService.subscribe((notification) => {
      setNotifications((prev) => [
        ...prev,
        { ...notification, id: Date.now() },
      ]);
    });

    // Cleanup
    return () => {
      unsubscribe();
      websocketService.disconnect();
    };
  }, [location.pathname]);

  const handleClose = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => handleClose(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationManager;
