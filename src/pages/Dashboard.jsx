import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useClients } from '../context/ClientContext';
import ClientForm from '../components/forms/ClientForm';
import StatCard from '../components/ui/StatCard';

const { FiPlus, FiUsers, FiFileText, FiTrendingUp, FiDollarSign, FiEdit3, FiTrash2 } = FiIcons;

const Dashboard = () => {
  const { clients, addClient, deleteClient } = useClients();
  const [showClientForm, setShowClientForm] = useState(false);

  const stats = [
    {
      title: 'Total Clients',
      value: clients.length,
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Total Assets Under Management',
      value: `$${(clients.reduce((sum, client) => sum + client.balanceSheet.assets, 0) / 1000000).toFixed(1)}M`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Reports Generated',
      value: clients.length * 3,
      icon: FiFileText,
      color: 'bg-purple-500',
      change: '+25%',
    },
    {
      title: 'Average Net Worth',
      value: `$${Math.round(clients.reduce((sum, client) => sum + (client.balanceSheet.assets - client.balanceSheet.liabilities), 0) / clients.length / 1000)}K`,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      change: '+15%',
    },
  ];

  const handleAddClient = (clientData) => {
    addClient(clientData);
    setShowClientForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your client portfolios and financial analyses</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowClientForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Client</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Client Portfolio</h2>
          <div className="text-sm text-gray-500">
            {clients.length} client{clients.length !== 1 ? 's' : ''}
          </div>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first client</p>
            <button
              onClick={() => setShowClientForm(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg"
            >
              Add Your First Client
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-gray-600">{client.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/client/${client.id}`}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Income:</span>
                    <span className="font-medium text-green-600">
                      ${(client.cashFlow.income - client.cashFlow.expenses).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Worth:</span>
                    <span className="font-medium text-blue-600">
                      ${(client.balanceSheet.assets - client.balanceSheet.liabilities).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{client.age}</span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Link
                    to={`/client/${client.id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/client/${client.id}/report`}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors"
                  >
                    Generate Report
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showClientForm && (
        <ClientForm
          onSubmit={handleAddClient}
          onCancel={() => setShowClientForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;