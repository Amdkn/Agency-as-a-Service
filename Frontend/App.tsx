import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AiPanel from './components/AiPanel';
import Dashboard from './components/views/Dashboard';
import SopLibrary from './components/views/SopLibrary';
import Tasks from './components/views/Tasks';
import Growth from './components/views/Growth';
import Marketplace from './components/views/Marketplace';
import Finance from './components/views/Finance';
import Clients from './components/views/Clients';
import People from './components/views/People';
import Legal from './components/views/Legal';
import ItData from './components/views/ItData';
import Settings from './components/views/Settings';
import Toast from './components/Toast';
import Modal from './components/Modal';
import Login from './components/views/Login';
import { NavView, ToastMessage } from './types';
import { PanelRightClose, PanelRightOpen, Bell, Search, Leaf, Loader, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './components/AuthProvider';

const MainLayout: React.FC = () => {
  const { signOut, user } = useAuth();

  // Initialize view from URL
  const getInitialView = (): NavView => {
    const path = window.location.pathname.substring(1).toUpperCase(); // remove leading slash
    // Handle mapping manually or dynamic
    // e.g. /clients -> CLIENTS
    // / -> DASHBOARD
    if (!path) return NavView.DASHBOARD;

    // Simple mapping strategy
    const view = Object.values(NavView).find(v => v === path);
    if (view) return view;

    // Manual overrides for prettier URLs if needed
    if (path === 'SOP-LIBRARY') return NavView.SOP_LIBRARY;
    if (path === 'IT-DATA') return NavView.IT_DATA;

    return NavView.DASHBOARD;
  };

  const [currentView, setCurrentView] = useState<NavView>(getInitialView);
  const [isAiPanelExpanded, setIsAiPanelExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sync URL when view changes
  React.useEffect(() => {
    const viewPath = currentView === NavView.DASHBOARD ? '/' : `/${currentView.toLowerCase()}`;
    // Use replaceState only if initial load, otherwise pushState? 
    // Actually, we want to allow back button.
    // But we shouldn't push on mount.
    if (window.location.pathname !== viewPath) {
      window.history.pushState({}, '', viewPath + window.location.search);
    }
  }, [currentView]);

  // Handle Back Button
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Interaction State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{ title: string, content: React.ReactNode } | null>(null);

  // Interaction Handlers
  const handleShowToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const handleCloseToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenModal = (title: string, content: React.ReactNode) => {
    setModalConfig({ title, content });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalConfig(null), 300); // Clear after animation
  };

  const commonProps = {
    onShowToast: handleShowToast,
    onOpenModal: handleOpenModal,
    onCloseModal: handleCloseModal,
  };

  const renderView = () => {
    switch (currentView) {
      case NavView.DASHBOARD:
        return <Dashboard {...commonProps} />;
      case NavView.FINANCE:
        return <Finance {...commonProps} />;
      case NavView.CLIENTS:
        return <Clients {...commonProps} />;
      case NavView.PEOPLE:
        return <People {...commonProps} />;
      case NavView.LEGAL:
        return <Legal {...commonProps} />;
      case NavView.SOP_LIBRARY:
        return <SopLibrary {...commonProps} />;
      case NavView.TASKS:
        return <Tasks {...commonProps} />;
      case NavView.GROWTH:
        return <Growth {...commonProps} />;
      case NavView.MARKETPLACE:
        return <Marketplace {...commonProps} />;
      case NavView.IT_DATA:
        return <ItData />;
      case NavView.SETTINGS:
        return <Settings {...commonProps} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-solar-muted">
            <Leaf className="w-12 h-12 mb-4 text-emerald-200" />
            <p className="text-lg font-serif italic text-emerald-900">Module Sprouting...</p>
            <p className="text-sm mt-2">This section of the garden is being cultivated.</p>
          </div>
        );
    }
  };

  const getPageTitle = (view: NavView) => {
    return view.charAt(0) + view.slice(1).toLowerCase().replace('_', ' ');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-solar-text font-sans flex overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">

      {/* 1. Left Sidebar (Fixed) */}
      <Sidebar
        currentView={currentView}
        onChangeView={setCurrentView}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* 2. Main Content Area (Fluid) */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-24'} ${isAiPanelExpanded ? 'mr-80' : 'mr-24'}`}>

        {/* Top Header - Glassmorphism */}
        <header className="h-20 sticky top-0 z-30 flex items-center justify-between px-8 glass-panel m-4 rounded-2xl shadow-sm">

          {/* Context / Breadcrumb */}
          <div className="flex items-center">
            <span className="text-solar-muted font-medium mr-2 text-sm">Garden</span>
            <span className="text-emerald-300 mr-2">/</span>
            <h1 className="text-emerald-900 font-serif font-bold text-xl tracking-tight">{getPageTitle(currentView)}</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-hover:text-emerald-600 transition-colors" />
              <input
                type="text"
                placeholder="Search the ecosystem..."
                className="bg-white/50 border border-stone-200 rounded-full pl-9 pr-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 w-56 transition-all hover:bg-white"
              />
            </div>

            <button className="text-stone-400 hover:text-emerald-700 transition-colors relative p-2 rounded-full hover:bg-emerald-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full border border-white"></span>
            </button>

            <div className="h-6 w-px bg-stone-200 mx-2"></div>

            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-emerald-900">{user?.email?.split('@')[0]}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider">Architect</span>
              </div>
            </div>

            <button
              onClick={signOut}
              className="text-stone-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAiPanelExpanded(!isAiPanelExpanded)}
              className={`flex items-center space-x-2 text-xs font-medium px-4 py-2 rounded-full border transition-all shadow-sm ${isAiPanelExpanded
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-white text-stone-600 border-stone-200 hover:text-emerald-700 hover:border-emerald-200'
                }`}
            >
              {isAiPanelExpanded ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 px-8 pb-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      {/* 3. Right Sidebar (Collapsible Dock) */}
      <AiPanel
        isExpanded={isAiPanelExpanded}
        onToggle={() => setIsAiPanelExpanded(!isAiPanelExpanded)}
        onShowToast={handleShowToast}
      />

      {/* 4. Global Overlays */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
        <div className="pointer-events-auto">
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onClose={handleCloseToast} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalConfig?.title || ''}
      >
        {modalConfig?.content}
      </Modal>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthGuard />
    </AuthProvider>
  );
};

const AuthGuard: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return <MainLayout />;
};


export default App;