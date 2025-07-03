import React, { createContext, useContext, useState } from 'react';

const ClientContext = createContext();

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 32,
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      cashFlow: {
        income: 85000,
        expenses: 65000,
      },
      balanceSheet: {
        assets: 250000,
        liabilities: 120000,
      },
      goals: {
        shortTerm: 'Build emergency fund of $20,000',
        mediumTerm: 'Save for house down payment ($50,000)',
        longTerm: 'Retire by age 60 with $1.5M',
      },
      insurance: [
        {
          id: '1',
          type: 'Term Life',
          coverage: 500000,
          premium: 45,
          provider: 'MetLife',
        },
        {
          id: '2',
          type: 'Disability',
          coverage: 60000,
          premium: 85,
          provider: 'Northwestern Mutual',
        },
      ],
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 45,
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      cashFlow: {
        income: 125000,
        expenses: 95000,
      },
      balanceSheet: {
        assets: 450000,
        liabilities: 180000,
      },
      goals: {
        shortTerm: 'Pay off credit card debt ($15,000)',
        mediumTerm: 'Kids college fund ($100,000)',
        longTerm: 'Early retirement at 55',
      },
      insurance: [
        {
          id: '1',
          type: 'Whole Life',
          coverage: 750000,
          premium: 180,
          provider: 'New York Life',
        },
      ],
      createdAt: '2024-02-20',
    },
  ]);

  const addClient = (client) => {
    const newClient = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setClients([...clients, newClient]);
    return newClient;
  };

  const updateClient = (id, updates) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const getClient = (id) => {
    return clients.find(client => client.id === id);
  };

  return (
    <ClientContext.Provider value={{
      clients,
      addClient,
      updateClient,
      deleteClient,
      getClient,
    }}>
      {children}
    </ClientContext.Provider>
  );
};