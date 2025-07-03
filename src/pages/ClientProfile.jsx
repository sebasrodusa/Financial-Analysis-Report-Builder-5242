import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useClients } from '../context/ClientContext';
import ClientForm from '../components/forms/ClientForm';

const { FiEdit3, FiFileText, FiArrowLeft, FiDollarSign, FiTrendingUp, FiShield, FiTarget } = FiIcons;

const ClientProfile = () => {
  const { id } = useParams();
  const { getClient, updateClient } = useClients();
  const [showEditForm, setShowEditForm] = useState(false);
  
  const client = getClient(id);

  if (!client) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Client not found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const netIncome = client.cashFlow.income - client.cashFlow.expenses;
  const netWorth = client.balanceSheet.assets - client.balanceSheet.liabilities;

  const handleUpdateClient = (updatedData) => {
    updateClient(id, updatedData);
    setShowEditForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600 mt-2">Client Profile & Financial Overview</p>
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEditForm(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <SafeIcon icon={FiEdit3} className="w-5 h-5" />
              <span>Edit Profile</span>
            </motion.button>
            <Link
              to={`/client/${id}/report`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <SafeIcon icon={FiFileText} className="w-5 h-5" />
              <span>Generate Report</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-primary-600" />
              <span>Financial Overview</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Cash Flow</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Income:</span>
                    <span className="font-medium">${client.cashFlow.income.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Expenses:</span>
                    <span className="font-medium">${client.cashFlow.expenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-green-200">
                    <span className="font-semibold text-green-800">Net Income:</span>
                    <span className="font-bold text-green-800">${netIncome.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Balance Sheet</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Assets:</span>
                    <span className="font-medium">${client.balanceSheet.assets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Liabilities:</span>
                    <span className="font-medium">${client.balanceSheet.liabilities.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-blue-200">
                    <span className="font-semibold text-blue-800">Net Worth:</span>
                    <span className="font-bold text-blue-800">${netWorth.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-primary-600" />
              <span>Financial Goals</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Short-term Goals (1-2 years)</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {client.goals.shortTerm || 'No short-term goals specified'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Medium-term Goals (3-10 years)</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {client.goals.mediumTerm || 'No medium-term goals specified'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Long-term Goals (10+ years)</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {client.goals.longTerm || 'No long-term goals specified'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <SafeIcon icon={FiShield} className="w-6 h-6 text-primary-600" />
              <span>Insurance Policies</span>
            </h2>
            
            {client.insurance.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No insurance policies on record
              </div>
            ) : (
              <div className="space-y-4">
                {client.insurance.map((policy) => (
                  <div key={policy.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{policy.type}</h3>
                      <span className="text-sm text-gray-600">{policy.provider}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Coverage:</span>
                        <span className="ml-2 font-medium">${policy.coverage.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Monthly Premium:</span>
                        <span className="ml-2 font-medium">${policy.premium}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <p className="text-gray-900 font-medium">{client.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>
                <p className="text-gray-900 font-medium">{client.age} years old</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900 font-medium">{client.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-gray-900 font-medium">{client.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Client Since</label>
                <p className="text-gray-900 font-medium">{client.createdAt}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800 font-medium">Savings Rate</span>
                <span className="text-green-800 font-bold">
                  {((netIncome / client.cashFlow.income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800 font-medium">Debt-to-Asset Ratio</span>
                <span className="text-blue-800 font-bold">
                  {((client.balanceSheet.liabilities / client.balanceSheet.assets) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-800 font-medium">Net Worth Growth</span>
                <span className="text-purple-800 font-bold">+12.5%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {showEditForm && (
        <ClientForm
          initialData={client}
          onSubmit={handleUpdateClient}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
};

export default ClientProfile;