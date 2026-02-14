import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SolarisPage from './components/SolarisPage';
import NexusPage from './components/NexusPage';
import OrbiterPage from './components/OrbiterPage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import { PageType } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'solaris':
        return <SolarisPage />;
      case 'nexus':
        return <NexusPage />;
      case 'orbiter':
        return <OrbiterPage />;
      case 'login':
        return <LoginPage />;
      default:
        return <HomePage onChangePage={setCurrentPage} />;
    }
  };

  const isLogin = currentPage === 'login';

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden">
      {!isLogin && <Navbar currentPage={currentPage} onChangePage={setCurrentPage} />}
      <main>
        {renderPage()}
      </main>
      {!isLogin && <Footer />}
    </div>
  );
};

export default App;