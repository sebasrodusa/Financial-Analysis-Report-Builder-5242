import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProfessionals } from '../context/ProfessionalContext';

const { FiSearch, FiMapPin, FiStar, FiUsers, FiCalendar, FiLinkedin, FiInstagram } = FiIcons;

const ProfessionalDirectory = () => {
  const { professionals } = useProfessionals();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');

  const allSkills = [...new Set(professionals.flatMap(prof => prof.skills))];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !filterSkill || prof.skills.includes(filterSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Directory</h1>
        <p className="text-gray-600">Connect with verified financial professionals</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, title, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-64">
            <select
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Specializations</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProfessionals.map((professional, index) => (
          <motion.div
            key={professional.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={professional.profilePicture}
                alt={professional.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{professional.name}</h3>
                <p className="text-primary-600 font-medium">{professional.title}</p>
                <div className="flex items-center space-x-1 text-gray-600 mt-1">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span className="text-sm">{professional.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">5.0</span>
                </div>
                <p className="text-xs text-gray-600">
                  {professional.testimonials.length} reviews
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-blue-900">{professional.completedAnalyses}</p>
                <p className="text-xs text-blue-600">Analyses Completed</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <SafeIcon icon={FiCalendar} className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-green-900">{professional.events.length}</p>
                <p className="text-xs text-green-600">Upcoming Events</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {professional.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact Information</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{professional.email}</p>
                <p>{professional.phone}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {professional.socialLinks.linkedin && (
                  <a
                    href={professional.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
                  </a>
                )}
                {professional.socialLinks.instagram && (
                  <a
                    href="#"
                    className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiInstagram} className="w-5 h-5" />
                  </a>
                )}
              </div>
              <Link
                to={`/professional/${professional.id}`}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                View Profile
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDirectory;