import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProfessionals } from '../context/ProfessionalContext';
import TestimonialForm from '../components/forms/TestimonialForm';
import EventForm from '../components/forms/EventForm';

const { FiArrowLeft, FiStar, FiUsers, FiCalendar, FiLinkedin, FiInstagram, FiPlus, FiMapPin, FiMail, FiPhone } = FiIcons;

const ProfessionalProfile = () => {
  const { id } = useParams();
  const { professionals, addTestimonial, addEvent } = useProfessionals();
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const professional = professionals.find(prof => prof.id === id);

  if (!professional) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Professional not found</h1>
          <Link to="/directory" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleAddTestimonial = (testimonialData) => {
    addTestimonial(id, testimonialData);
    setShowTestimonialForm(false);
  };

  const handleAddEvent = (eventData) => {
    addEvent(id, eventData);
    setShowEventForm(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'events', label: 'Events' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/directory"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Back to Directory</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12">
          <div className="flex items-center space-x-6">
            <img
              src={professional.profilePicture}
              alt={professional.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold mb-2">{professional.name}</h1>
              <p className="text-xl text-primary-100 mb-4">{professional.title}</p>
              <div className="flex items-center space-x-6 text-primary-100">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5" />
                  <span>{professional.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiStar} className="w-5 h-5 text-yellow-300" />
                  <span>5.0 ({professional.testimonials.length} reviews)</span>
                </div>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4">
                <p className="text-3xl font-bold">{professional.completedAnalyses}</p>
                <p className="text-primary-100">Analyses Completed</p>
              </div>
              <div className="flex space-x-3">
                {professional.socialLinks.linkedin && (
                  <a
                    href={professional.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiLinkedin} className="w-6 h-6" />
                  </a>
                )}
                {professional.socialLinks.instagram && (
                  <a
                    href="#"
                    className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiInstagram} className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
                  <div className="flex flex-wrap gap-3">
                    {professional.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Testimonials</h2>
                  {professional.testimonials.slice(0, 2).map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 p-6 rounded-lg mb-4"
                    >
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-3">"{testimonial.content}"</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-900">{testimonial.clientName}</span>
                        <span className="text-gray-600">{testimonial.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{professional.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{professional.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{professional.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-primary-700">Completed Analyses:</span>
                      <span className="font-bold text-primary-900">{professional.completedAnalyses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-700">Client Reviews:</span>
                      <span className="font-bold text-primary-900">{professional.testimonials.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-700">Upcoming Events:</span>
                      <span className="font-bold text-primary-900">{professional.events.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Client Testimonials</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTestimonialForm(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5" />
                  <span>Add Testimonial</span>
                </motion.button>
              </div>

              {professional.testimonials.length === 0 ? (
                <div className="text-center py-12">
                  <SafeIcon icon={FiStar} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
                  <p className="text-gray-600">Be the first to leave a testimonial</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {professional.testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 p-6 rounded-lg"
                    >
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{testimonial.clientName}</span>
                        <span className="text-sm text-gray-600">{testimonial.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEventForm(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5" />
                  <span>Add Event</span>
                </motion.button>
              </div>

              {professional.events.length === 0 ? (
                <div className="text-center py-12">
                  <SafeIcon icon={FiCalendar} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
                  <p className="text-gray-600">Check back later for workshops and webinars</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {professional.events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 p-6 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full mt-2">
                            {event.type}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">{event.date}</p>
                          <p className="text-gray-600">{event.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{event.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showTestimonialForm && (
        <TestimonialForm
          onSubmit={handleAddTestimonial}
          onCancel={() => setShowTestimonialForm(false)}
        />
      )}

      {showEventForm && (
        <EventForm
          onSubmit={handleAddEvent}
          onCancel={() => setShowEventForm(false)}
        />
      )}
    </div>
  );
};

export default ProfessionalProfile;