import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Zap,
  Globe,
  Settings
} from 'lucide-react';
import { PLATFORM_NAV_ITEMS } from '../constants';

interface PlatformSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchToClient: () => void;
}

export const PlatformSidebar: React.FC<PlatformSidebarProps> = ({ activeTab, setActiveTab, onSwitchToClient }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col sticky top-0 z-50"
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">AxisvIA Platform</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-500"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="py-2">
          {!isCollapsed && <p className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Administración Global</p>}
          {PLATFORM_NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => setActiveTab(item.path)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full ${
                activeTab === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <button 
          onClick={onSwitchToClient}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors w-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20"
          title={isCollapsed ? "Vista Cliente" : undefined}
        >
          <Globe size={20} className="fill-current opacity-20" />
          {!isCollapsed && <span>Ir a Vista Cliente</span>}
        </button>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full hover:bg-slate-800">
          <Settings size={20} />
          {!isCollapsed && <span>Configuración</span>}
        </button>
        <div className="pt-2 flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
            <Shield size={16} className="text-blue-500" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">Super Admin</p>
              <p className="text-[10px] text-slate-500 truncate">AxisvIA Core Team</p>
            </div>
          )}
          {!isCollapsed && <LogOut size={16} className="text-slate-500 hover:text-red-500 cursor-pointer" />}
        </div>
      </div>
    </motion.aside>
  );
};
