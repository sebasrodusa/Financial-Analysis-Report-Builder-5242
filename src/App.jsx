import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import ClientProfile from './pages/ClientProfile';
import ReportGenerator from './pages/ReportGenerator';
import ProfessionalDirectory from './pages/ProfessionalDirectory';
import ProfessionalProfile from './pages/ProfessionalProfile';
import { ClientProvider } from './context/ClientContext';
import { ProfessionalProvider } from './context/ProfessionalContext';

function App() {
  return (
    <ClientProvider>
      <ProfessionalProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16"
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/client/:id" element={<ClientProfile />} />
                <Route path="/client/:id/report" element={<ReportGenerator />} />
                <Route path="/directory" element={<ProfessionalDirectory />} />
                <Route path="/professional/:id" element={<ProfessionalProfile />} />
              </Routes>
            </motion.main>
          </div>
        </Router>
      </ProfessionalProvider>
    </ClientProvider>
  );
}

export default App;