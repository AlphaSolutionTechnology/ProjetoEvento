import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, description, icon, link }) => {
  return (
    <Link
      to={link}
      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border dark:border-gray-700 group"
      aria-label={title}
    >
      <div className="text-4xl text-gray-700 dark:text-gray-200 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </Link>
  );
};

export default DashboardCard;
