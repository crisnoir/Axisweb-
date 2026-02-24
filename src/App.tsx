import React from 'react';
import { Sidebar } from './components/Sidebar';
import { PlatformSidebar } from './components/PlatformSidebar';
import { Dashboard } from './components/Dashboard';
import { Asuntos } from './components/Asuntos';
import { Cartera } from './components/Cartera';
import { Expedientes } from './components/Expedientes';
import { Radar } from './components/Radar';
import { Boveda } from './components/Boveda';
import { Workspace } from './components/Workspace';
import { PlatformDashboard } from './components/PlatformDashboard';
import { PlatformCRM } from './components/PlatformCRM';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [viewMode, setViewMode] = React.useState<'CLIENT' | 'PLATFORM'>('CLIENT');
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedCaseId, setSelectedCaseId] = React.useState<string | null>(null);

  // Handle case selection from dashboard
  const handleCaseSelect = (id: string) => {
    setSelectedCaseId(id);
    setActiveTab('workspace');
  };

  const handleSwitchToPlatform = () => {
    setViewMode('PLATFORM');
    setActiveTab('p-dashboard');
  };

  const handleSwitchToClient = () => {
    setViewMode('CLIENT');
    setActiveTab('dashboard');
  };

  return (
    <div className="flex min-h-screen bg-legal-bg-light dark:bg-legal-bg-dark text-slate-900 dark:text-slate-100">
      {viewMode === 'CLIENT' ? (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onSwitchToPlatform={handleSwitchToPlatform}
        />
      ) : (
        <PlatformSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onSwitchToClient={handleSwitchToClient} 
        />
      )}
      
      <main className="flex-1 overflow-y-auto h-screen">
        <AnimatePresence mode="wait">
          {/* CLIENT VIEWS */}
          {viewMode === 'CLIENT' && activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dashboard />
              <div className="p-8 pt-0 flex gap-4">
                <button onClick={() => handleCaseSelect('1')} className="text-xs text-slate-400 hover:text-slate-600 underline">
                  Demo: Abrir Caso #1
                </button>
              </div>
            </motion.div>
          )}

          {viewMode === 'CLIENT' && activeTab === 'asuntos' && (
            <motion.div key="asuntos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Asuntos onCaseSelect={handleCaseSelect} />
            </motion.div>
          )}

          {viewMode === 'CLIENT' && activeTab === 'cartera' && (
            <motion.div key="cartera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Cartera onCaseSelect={handleCaseSelect} />
            </motion.div>
          )}

          {viewMode === 'CLIENT' && activeTab === 'expedientes' && (
            <motion.div key="expedientes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Expedientes />
            </motion.div>
          )}

          {viewMode === 'CLIENT' && activeTab === 'radar' && (
            <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Radar onCaseSelect={handleCaseSelect} />
            </motion.div>
          )}

          {viewMode === 'CLIENT' && activeTab === 'boveda' && (
            <motion.div key="boveda" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Boveda />
            </motion.div>
          )}

          {viewMode === 'CLIENT' && activeTab === 'workspace' && selectedCaseId && (
            <motion.div key="workspace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
              <Workspace caseId={selectedCaseId} onBack={() => setActiveTab('dashboard')} />
            </motion.div>
          )}

          {/* PLATFORM VIEWS */}
          {viewMode === 'PLATFORM' && activeTab === 'p-dashboard' && (
            <motion.div key="p-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PlatformDashboard />
            </motion.div>
          )}

          {viewMode === 'PLATFORM' && activeTab === 'p-crm' && (
            <motion.div key="p-crm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PlatformCRM />
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {((viewMode === 'CLIENT' && !['dashboard', 'asuntos', 'cartera', 'expedientes', 'radar', 'boveda', 'workspace'].includes(activeTab)) ||
            (viewMode === 'PLATFORM' && !['p-dashboard', 'p-crm'].includes(activeTab))) && (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex items-center justify-center text-slate-400">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Módulo en Desarrollo</h2>
                <p>El módulo de {activeTab} estará disponible próximamente.</p>
                <button 
                  onClick={() => setActiveTab(viewMode === 'CLIENT' ? 'dashboard' : 'p-dashboard')}
                  className="mt-4 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold"
                >
                  Volver al Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
