import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBarChart3, FiUsers, FiFileText, FiUser, FiSettings } = FiIcons;

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiBarChart3 },
    { path: '/directory', label: 'Directory', icon: FiUsers },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FinAnalytics Pro</span>
          </Link>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;