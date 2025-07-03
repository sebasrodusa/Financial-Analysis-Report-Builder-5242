import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useClients } from '../context/ClientContext';

const { FiArrowLeft, FiDownload, FiShare2, FiPrinter } = FiIcons;

const ReportGenerator = () => {
  const { id } = useParams();
  const { getClient } = useClients();
  const [reportType, setReportType] = useState('comprehensive');
  
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

  const cashFlowData = [
    { name: 'Income', value: client.cashFlow.income, color: '#22c55e' },
    { name: 'Expenses', value: client.cashFlow.expenses, color: '#ef4444' },
  ];

  const balanceSheetData = [
    { name: 'Assets', value: client.balanceSheet.assets, color: '#3b82f6' },
    { name: 'Liabilities', value: client.balanceSheet.liabilities, color: '#f59e0b' },
  ];

  const netWorthTrendData = [
    { month: 'Jan', value: netWorth * 0.85 },
    { month: 'Feb', value: netWorth * 0.88 },
    { month: 'Mar', value: netWorth * 0.92 },
    { month: 'Apr', value: netWorth * 0.95 },
    { month: 'May', value: netWorth * 0.98 },
    { month: 'Jun', value: netWorth },
  ];

  const assetAllocationData = [
    { name: 'Stocks', value: 45, color: '#3b82f6' },
    { name: 'Bonds', value: 25, color: '#10b981' },
    { name: 'Real Estate', value: 20, color: '#f59e0b' },
    { name: 'Cash', value: 10, color: '#6b7280' },
  ];

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to={`/client/${id}`}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Back to Client Profile</span>
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Analysis Report</h1>
            <p className="text-gray-600 mt-2">{client.name} - Generated on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="comprehensive">Comprehensive Report</option>
              <option value="summary">Executive Summary</option>
              <option value="goals">Goals Assessment</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportPDF}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <SafeIcon icon={FiDownload} className="w-5 h-5" />
              <span>Export PDF</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="space-y-8" id="report-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Net Income</h3>
              <p className="text-3xl font-bold text-green-900 mt-2">${netIncome.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">Annual</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Net Worth</h3>
              <p className="text-3xl font-bold text-blue-900 mt-2">${netWorth.toLocaleString()}</p>
              <p className="text-sm text-blue-600 mt-1">Current</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Savings Rate</h3>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {((netIncome / client.cashFlow.income) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-purple-600 mt-1">Of Income</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800">Debt Ratio</h3>
              <p className="text-3xl font-bold text-orange-900 mt-2">
                {((client.balanceSheet.liabilities / client.balanceSheet.assets) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-orange-600 mt-1">Of Assets</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Asset Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Net Worth Trend</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={netWorthTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Net Worth']} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Financial Goals Progress</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Emergency Fund Goal</h4>
                <span className="text-sm text-gray-600">75% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">$15,000 of $20,000 target</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">House Down Payment</h4>
                <span className="text-sm text-gray-600">40% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">$20,000 of $50,000 target</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Retirement Savings</h4>
                <span className="text-sm text-gray-600">25% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">$375,000 of $1,500,000 target</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recommendations</h3>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h4 className="font-semibold text-green-800">Excellent Savings Rate</h4>
              <p className="text-green-700">
                Your current savings rate of {((netIncome / client.cashFlow.income) * 100).toFixed(1)}% 
                is above the recommended 20%. Continue this excellent habit!
              </p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h4 className="font-semibold text-blue-800">Diversification Opportunity</h4>
              <p className="text-blue-700">
                Consider diversifying your investment portfolio to reduce risk and optimize returns. 
                A mix of stocks, bonds, and real estate can provide better long-term stability.
              </p>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h4 className="font-semibold text-yellow-800">Insurance Review</h4>
              <p className="text-yellow-700">
                Review your life insurance coverage annually to ensure it aligns with your changing 
                financial situation and family needs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportGenerator;