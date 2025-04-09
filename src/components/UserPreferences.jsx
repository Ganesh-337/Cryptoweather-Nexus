import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTheme,
  toggleNotifications,
  setRefreshInterval,
} from "../store/slices/userSlice";
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  BellSlashIcon,
} from "@heroicons/react/24/outline";

const UserPreferences = () => {
  const dispatch = useDispatch();
  const { theme, notifications, refreshInterval } = useSelector(
    (state) => state.user
  );

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  const handleNotificationsToggle = () => {
    dispatch(toggleNotifications());
  };

  const handleRefreshIntervalChange = (e) => {
    dispatch(setRefreshInterval(Number(e.target.value)));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        User Preferences
      </h2>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {theme === "light" ? (
              <SunIcon className="h-5 w-5 text-yellow-500 mr-2" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-600 mr-2" />
            )}
            <span className="text-gray-700">Theme</span>
          </div>
          <button
            onClick={handleThemeToggle}
            className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {notifications ? (
              <BellIcon className="h-5 w-5 text-blue-500 mr-2" />
            ) : (
              <BellSlashIcon className="h-5 w-5 text-gray-400 mr-2" />
            )}
            <span className="text-gray-700">Notifications</span>
          </div>
          <button
            onClick={handleNotificationsToggle}
            className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            {notifications ? "Disable" : "Enable"}
          </button>
        </div>

        {/* Refresh Interval */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Data Refresh Interval (minutes)</span>
          <select
            value={refreshInterval}
            onChange={handleRefreshIntervalChange}
            className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
