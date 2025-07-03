import React, { createContext, useContext, useState } from 'react';

const ProfessionalContext = createContext();

export const useProfessionals = () => {
  const context = useContext(ProfessionalContext);
  if (!context) {
    throw new Error('useProfessionals must be used within a ProfessionalProvider');
  }
  return context;
};

export const ProfessionalProvider = ({ children }) => {
  const [professionals, setProfessionals] = useState([
    {
      id: '1',
      name: 'Jennifer Martinez',
      title: 'Certified Financial Planner',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      email: 'jennifer.martinez@finpro.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      completedAnalyses: 247,
      skills: ['Retirement Planning', 'Investment Management', 'Tax Strategy', 'Estate Planning'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/jennifermartinez',
        instagram: '@jenmartinez_cfp',
      },
      testimonials: [
        {
          id: '1',
          clientName: 'Robert Thompson',
          content: 'Jennifer helped me restructure my portfolio and I\'ve seen a 15% improvement in returns.',
          date: '2024-01-15',
          rating: 5,
        },
        {
          id: '2',
          clientName: 'Lisa Wang',
          content: 'Excellent guidance on retirement planning. Very knowledgeable and professional.',
          date: '2024-02-10',
          rating: 5,
        },
      ],
      events: [
        {
          id: '1',
          title: 'Retirement Planning Workshop',
          date: '2024-03-15',
          time: '2:00 PM EST',
          type: 'Workshop',
          description: 'Learn the fundamentals of retirement planning and investment strategies.',
        },
      ],
    },
    {
      id: '2',
      name: 'David Kim',
      title: 'Investment Advisor',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      email: 'david.kim@wealthadvisors.com',
      phone: '+1 (555) 345-6789',
      location: 'San Francisco, CA',
      completedAnalyses: 189,
      skills: ['Portfolio Management', 'Risk Assessment', 'Wealth Preservation', 'Alternative Investments'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/davidkim',
      },
      testimonials: [
        {
          id: '1',
          clientName: 'Amanda Rodriguez',
          content: 'David\'s investment strategies have consistently outperformed the market.',
          date: '2024-01-20',
          rating: 5,
        },
      ],
      events: [
        {
          id: '1',
          title: 'Market Outlook 2024',
          date: '2024-03-20',
          time: '6:00 PM PST',
          type: 'Webinar',
          description: 'Analysis of current market trends and investment opportunities.',
        },
      ],
    },
  ]);

  const addTestimonial = (professionalId, testimonial) => {
    setProfessionals(professionals.map(prof => 
      prof.id === professionalId
        ? {
            ...prof,
            testimonials: [
              ...prof.testimonials,
              {
                ...testimonial,
                id: Date.now().toString(),
                date: new Date().toISOString().split('T')[0],
              }
            ]
          }
        : prof
    ));
  };

  const addEvent = (professionalId, event) => {
    setProfessionals(professionals.map(prof => 
      prof.id === professionalId
        ? {
            ...prof,
            events: [
              ...prof.events,
              {
                ...event,
                id: Date.now().toString(),
              }
            ]
          }
        : prof
    ));
  };

  return (
    <ProfessionalContext.Provider value={{
      professionals,
      addTestimonial,
      addEvent,
    }}>
      {children}
    </ProfessionalContext.Provider>
  );
};