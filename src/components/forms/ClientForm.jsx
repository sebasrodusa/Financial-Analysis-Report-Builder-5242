import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiUser, FiDollarSign, FiTarget, FiShield } = FiIcons;

const ClientForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    age: initialData.age || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    cashFlow: {
      income: initialData.cashFlow?.income || '',
      expenses: initialData.cashFlow?.expenses || '',
    },
    balanceSheet: {
      assets: initialData.balanceSheet?.assets || '',
      liabilities: initialData.balanceSheet?.liabilities || '',
    },
    goals: {
      shortTerm: initialData.goals?.shortTerm || '',
      mediumTerm: initialData.goals?.mediumTerm || '',
      longTerm: initialData.goals?.longTerm || '',
    },
    insurance: initialData.insurance || [],
  });

  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FiUser },
    { id: 'cashflow', label: 'Cash Flow', icon: FiDollarSign },
    { id: 'goals', label: 'Goals', icon: FiTarget },
    { id: 'insurance', label: 'Insurance', icon: FiShield },
  ];

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      age: parseInt(formData.age),
      cashFlow: {
        income: parseInt(formData.cashFlow.income) || 0,
        expenses: parseInt(formData.cashFlow.expenses) || 0,
      },
      balanceSheet: {
        assets: parseInt(formData.balanceSheet.assets) || 0,
        liabilities: parseInt(formData.balanceSheet.liabilities) || 0,
      },
    };

    onSubmit(processedData);
  };

  const addInsurancePolicy = () => {
    setFormData(prev => ({
      ...prev,
      insurance: [...prev.insurance, {
        id: Date.now().toString(),
        type: '',
        coverage: '',
        premium: '',
        provider: '',
      }]
    }));
  };

  const updateInsurancePolicy = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      insurance: prev.insurance.map((policy, i) => 
        i === index ? { ...policy, [field]: value } : policy
      )
    }));
  };

  const removeInsurancePolicy = (index) => {
    setFormData(prev => ({
      ...prev,
      insurance: prev.insurance.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData.name ? 'Edit Client' : 'Add New Client'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange(null, 'name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter client's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => handleInputChange(null, 'age', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter age"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange(null, 'email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cashflow' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Income</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income ($)
                    </label>
                    <input
                      type="number"
                      value={formData.cashFlow.income}
                      onChange={(e) => handleInputChange('cashFlow', 'income', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter annual income"
                    />
                  </div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">Expenses</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Expenses ($)
                    </label>
                    <input
                      type="number"
                      value={formData.cashFlow.expenses}
                      onChange={(e) => handleInputChange('cashFlow', 'expenses', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter annual expenses"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Net Income</h3>
                <p className="text-2xl font-bold text-blue-900">
                  ${((formData.cashFlow.income || 0) - (formData.cashFlow.expenses || 0)).toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Assets</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Assets ($)
                    </label>
                    <input
                      type="number"
                      value={formData.balanceSheet.assets}
                      onChange={(e) => handleInputChange('balanceSheet', 'assets', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter total assets"
                    />
                  </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800 mb-4">Liabilities</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Liabilities ($)
                    </label>
                    <input
                      type="number"
                      value={formData.balanceSheet.liabilities}
                      onChange={(e) => handleInputChange('balanceSheet', 'liabilities', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter total liabilities"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Net Worth</h3>
                <p className="text-2xl font-bold text-purple-900">
                  ${((formData.balanceSheet.assets || 0) - (formData.balanceSheet.liabilities || 0)).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short-term Goals (1-2 years)
                </label>
                <textarea
                  value={formData.goals.shortTerm}
                  onChange={(e) => handleInputChange('goals', 'shortTerm', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter short-term financial goals"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medium-term Goals (3-10 years)
                </label>
                <textarea
                  value={formData.goals.mediumTerm}
                  onChange={(e) => handleInputChange('goals', 'mediumTerm', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter medium-term financial goals"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long-term Goals (10+ years)
                </label>
                <textarea
                  value={formData.goals.longTerm}
                  onChange={(e) => handleInputChange('goals', 'longTerm', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter long-term financial goals"
                />
              </div>
            </div>
          )}

          {activeTab === 'insurance' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Insurance Policies</h3>
                <button
                  type="button"
                  onClick={addInsurancePolicy}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add Policy
                </button>
              </div>
              
              {formData.insurance.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No insurance policies added yet
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.insurance.map((policy, index) => (
                    <div key={policy.id || index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Policy Type
                          </label>
                          <select
                            value={policy.type}
                            onChange={(e) => updateInsurancePolicy(index, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="">Select type</option>
                            <option value="Term Life">Term Life</option>
                            <option value="Whole Life">Whole Life</option>
                            <option value="Universal Life">Universal Life</option>
                            <option value="Disability">Disability</option>
                            <option value="Health">Health</option>
                            <option value="Auto">Auto</option>
                            <option value="Home">Home</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coverage ($)
                          </label>
                          <input
                            type="number"
                            value={policy.coverage}
                            onChange={(e) => updateInsurancePolicy(index, 'coverage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Coverage amount"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Monthly Premium ($)
                          </label>
                          <input
                            type="number"
                            value={policy.premium}
                            onChange={(e) => updateInsurancePolicy(index, 'premium', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Monthly premium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Provider
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={policy.provider}
                              onChange={(e) => updateInsurancePolicy(index, 'provider', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Insurance provider"
                            />
                            <button
                              type="button"
                              onClick={() => removeInsurancePolicy(index)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            >
                              <SafeIcon icon={FiX} className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
            >
              {initialData.name ? 'Update Client' : 'Add Client'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ClientForm;