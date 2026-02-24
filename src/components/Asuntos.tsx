import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  User, 
  Tag,
  ChevronRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileText,
  TrendingUp
} from 'lucide-react';
import { MOCK_CASES } from '../constants';

interface AsuntosProps {
  onCaseSelect: (id: string) => void;
}

export const Asuntos: React.FC<AsuntosProps> = ({ onCaseSelect }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterMatter, setFilterMatter] = React.useState('Todas');

  const filteredCases = MOCK_CASES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMatter = filterMatter === 'Todas' || c.matter === filterMatter;
    return matchesSearch && matchesMatter;
  });

  const matters = ['Todas', ...new Set(MOCK_CASES.map(c => c.matter))];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Asuntos</h1>
          <p className="text-slate-500 mt-1">Gestiona y monitorea el progreso de tus expedientes legales.</p>
        </div>
        <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2">
          <Plus size={18} /> Nuevo Asunto
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por título, cliente o expediente..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-legal-card-dark border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={filterMatter}
              onChange={(e) => setFilterMatter(e.target.value)}
              className="bg-white dark:bg-legal-card-dark border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-8 text-sm outline-none appearance-none cursor-pointer"
            >
              {matters.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <button className="p-3 bg-white dark:bg-legal-card-dark border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
            <Calendar size={18} />
          </button>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((c, i) => (
          <motion.div 
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onCaseSelect(c.id)}
            className="bento-card p-6 flex flex-col md:flex-row md:items-center gap-6 group cursor-pointer hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
          >
            {/* Status Indicator */}
            <div className="flex items-center gap-4 md:w-1/3">
              <div className={`w-1.5 h-16 rounded-full shrink-0 ${
                c.status === 'CRITICO' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 
                c.status === 'ALERTA' ? 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]' : 
                'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              }`} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg truncate group-hover:text-blue-600 transition-colors">{c.title}</h3>
                  {c.status === 'CRITICO' && <ShieldAlert size={16} className="text-red-500 shrink-0" />}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><User size={12} /> {c.client}</span>
                  <span className="flex items-center gap-1"><Tag size={12} /> {c.matter}</span>
                </div>
              </div>
            </div>

            {/* Progress & Stage */}
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Etapa Actual</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded uppercase">{c.stage}</span>
                </div>
                <span className="text-xs font-bold">{c.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${c.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${
                    c.status === 'CRITICO' ? 'bg-red-500' : 
                    c.status === 'ALERTA' ? 'bg-orange-500' : 'bg-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* Deadline & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/4">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vencimiento</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock size={14} className={c.status === 'CRITICO' ? 'text-red-500' : 'text-slate-400'} />
                  <span className={`text-sm font-bold ${c.status === 'CRITICO' ? 'text-red-600' : ''}`}>{c.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredCases.length === 0 && (
          <div className="py-20 text-center space-y-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <FileText size={32} />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">No se encontraron asuntos</p>
              <p className="text-sm text-slate-500">Intenta ajustar los filtros o realiza una nueva búsqueda.</p>
            </div>
            <button 
              onClick={() => {setSearchQuery(''); setFilterMatter('Todas');}}
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <footer className="flex flex-wrap gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Completados este mes</p>
            <p className="text-lg font-bold">4 Asuntos</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Tasa de éxito IA</p>
            <p className="text-lg font-bold">94.2%</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
