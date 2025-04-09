import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, description, icon, path }) => {
  return (
    <Link to={path} className="block">
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <div className="text-2xl text-blue-500">{icon}</div>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
