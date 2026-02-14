import React, { useState, useEffect } from 'react';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onChangePage: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onChangePage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageType) => {
    onChangePage(page);
    setMobileMenuOpen(false);
    setProductMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-glow transition-colors
                ${currentPage === 'solaris' ? 'bg-solaris' : currentPage === 'nexus' ? 'bg-nexus' : currentPage === 'orbiter' ? 'bg-orbiter' : 'bg-slate-900 dark:bg-slate-800'}`}>
                {currentPage === 'home' ? 'A' : 'S'}
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                {currentPage === 'home' ? 'AaaS' : currentPage === 'solaris' ? 'Solaris' : currentPage === 'nexus' ? 'Nexus' : 'Orbiter'}
              </span>
            </div>

            {/* Desktop Product Switcher */}
            <div className="hidden md:flex relative group">
              <button
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                onMouseEnter={() => setProductMenuOpen(true)}
                onClick={() => setProductMenuOpen(!productMenuOpen)}
              >
                <span>Solutions</span>
                <span className="material-icons text-sm">expand_more</span>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-200 transform origin-top-left p-2 ${productMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseLeave={() => setProductMenuOpen(false)}
              >
                <div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-solaris-light dark:hover:bg-slate-800 cursor-pointer transition-colors group/item"
                  onClick={() => handleNav('solaris')}
                >
                  <div className="w-10 h-10 rounded-lg bg-solaris/10 flex items-center justify-center text-solaris group-hover/item:bg-solaris group-hover/item:text-white transition-colors">
                    <span className="material-symbols-outlined">light_mode</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Solaris</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Creative & Marketing OS</div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-nexus-light dark:hover:bg-slate-800 cursor-pointer transition-colors group/item"
                  onClick={() => handleNav('nexus')}
                >
                  <div className="w-10 h-10 rounded-lg bg-nexus/10 flex items-center justify-center text-nexus group-hover/item:bg-nexus group-hover/item:text-white transition-colors">
                    <span className="material-symbols-outlined">hub</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Nexus</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Expert & Logic OS</div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-orbiter-light dark:hover:bg-slate-800 cursor-pointer transition-colors group/item"
                  onClick={() => handleNav('orbiter')}
                >
                  <div className="w-10 h-10 rounded-lg bg-orbiter/10 flex items-center justify-center text-orbiter group-hover/item:bg-orbiter group-hover/item:text-white transition-colors">
                    <span className="material-symbols-outlined">public</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Orbiter</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Field & Operations OS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNav('login')}
              className="text-sm font-medium text-slate-900 dark:text-white hover:text-slate-600 transition-colors px-4 py-2"
            >
              Login
            </button>
            <button
              onClick={() => handleNav('login')}
              className={`text-sm font-bold text-white px-5 py-2.5 rounded-lg transition-colors shadow-lg
              ${currentPage === 'solaris' ? 'bg-solaris hover:bg-solaris-dark shadow-solaris/20' :
                  currentPage === 'nexus' ? 'bg-nexus hover:bg-blue-700 shadow-nexus/20' :
                    currentPage === 'orbiter' ? 'bg-orbiter hover:bg-orbiter-dark shadow-orbiter/20' :
                      'bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800'}`}
            >
              Démarrer {currentPage === 'home' ? 'AaaS' : currentPage === 'solaris' ? 'Solaris' : currentPage === 'nexus' ? 'Nexus' : 'Orbiter'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 focus:outline-none"
            >
              <span className="material-icons">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background-dark border-b border-slate-100 dark:border-slate-800 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Products</p>
            <button onClick={() => handleNav('solaris')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left">
              <span className="material-symbols-outlined text-solaris">light_mode</span>
              <span className="font-medium text-slate-900 dark:text-white">Solaris</span>
            </button>
            <button onClick={() => handleNav('nexus')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left">
              <span className="material-symbols-outlined text-nexus">hub</span>
              <span className="font-medium text-slate-900 dark:text-white">Nexus</span>
            </button>
            <button onClick={() => handleNav('orbiter')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left">
              <span className="material-symbols-outlined text-orbiter">public</span>
              <span className="font-medium text-slate-900 dark:text-white">Orbiter</span>
            </button>

            <div className="border-t border-slate-100 dark:border-slate-800 my-4 pt-4">
              <button onClick={() => handleNav('home')} className="w-full text-center py-3 bg-slate-900 text-white rounded-lg font-medium">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;