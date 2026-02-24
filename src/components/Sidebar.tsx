import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  LogOut, 
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Scale,
  Settings,
  Zap
} from 'lucide-react';
import { CLIENT_NAV_ITEMS, OPTIONAL_NAV_ITEMS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchToPlatform: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onSwitchToPlatform }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-legal-bg-light dark:bg-legal-bg-dark border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 z-50"
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white dark:text-slate-900" />
            </div>
            <span className="font-bold text-xl tracking-tight">AxisvIA</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="py-2">
          {!isCollapsed && <p className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Principal</p>}
          {CLIENT_NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => setActiveTab(item.path)}
              className={`sidebar-item w-full ${activeTab === item.path ? 'sidebar-item-active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="py-2">
          {!isCollapsed && <p className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Módulos IA</p>}
          {OPTIONAL_NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => setActiveTab(item.path)}
              className={`sidebar-item w-full ${activeTab === item.path ? 'sidebar-item-active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button 
          onClick={onSwitchToPlatform}
          className="sidebar-item w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-800/50"
          title={isCollapsed ? "Platform Admin" : undefined}
        >
          <Zap size={20} className="fill-current" />
          {!isCollapsed && <span>Platform Admin</span>}
        </button>
        <button className="sidebar-item w-full">
          <Settings size={20} />
          {!isCollapsed && <span>Configuración</span>}
        </button>
        <div className="pt-2 flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
            <UserIcon size={16} className="text-slate-500" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Lic. García</p>
              <p className="text-[10px] text-slate-500 truncate">Abogado Senior</p>
            </div>
          )}
          {!isCollapsed && <LogOut size={16} className="text-slate-400 hover:text-red-500 cursor-pointer" />}
        </div>
      </div>
    </motion.aside>
  );
};
