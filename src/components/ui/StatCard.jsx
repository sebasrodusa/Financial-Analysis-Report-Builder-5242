import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';

const StatCard = ({ title, value, icon, color, change }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-green-600 text-sm font-medium mt-1">{change}</p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <SafeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;