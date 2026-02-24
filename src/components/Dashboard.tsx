import React from 'react';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  Clock, 
  FolderKanban, 
  TrendingUp,
  Search,
  MessageSquare,
  ShieldAlert,
  Radar
} from 'lucide-react';
import { MOCK_CASES } from '../constants';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buenos días, Lic. García 👋</h1>
          <p className="text-slate-500 mt-1">Aquí tienes un resumen de tu actividad legal hoy.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
          <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Nuevo Asunto
          </button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Asuntos Activos', value: '12', icon: FolderKanban, color: 'text-blue-500' },
          { label: 'Casos Críticos', value: '2', icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Vencen Hoy', value: '3', icon: Clock, color: 'text-orange-500' },
          { label: 'Eficiencia IA', value: '+24%', icon: TrendingUp, color: 'text-emerald-500' },
        ].map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bento-card p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 ${kpi.color}`}>
              <kpi.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Casos Urgentes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Casos Urgentes (Vencen esta semana)</h2>
            <button className="text-sm text-slate-500 hover:text-slate-900">Ver todos</button>
          </div>
          <div className="space-y-3">
            {MOCK_CASES.map((c, i) => (
              <motion.div 
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="bento-card p-4 flex items-center justify-between hover:border-slate-400 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-12 rounded-full ${
                    c.status === 'CRITICO' ? 'bg-red-500' : 
                    c.status === 'ALERTA' ? 'bg-orange-500' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-600 transition-colors">{c.title}</h3>
                    <p className="text-xs text-slate-500">{c.matter} • {c.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-400">Vence</p>
                  <p className="text-sm font-bold">{c.deadline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Copilot Rápido */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Copilot Rápido</h2>
          <div className="bento-card p-6 h-full flex flex-col bg-slate-900 text-white border-none">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <MessageSquare size={14} />
              </div>
              <span className="font-semibold text-sm">AxisvIA Intelligence</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              ¿En qué puedo ayudarte hoy? Puedo analizar expedientes, buscar jurisprudencia o redactar borradores.
            </p>
            <div className="mt-auto space-y-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Escribe aquí..." 
                  className="w-full bg-slate-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-500 rounded-md">
                  <TrendingUp size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Analizar Amparo', 'Resumir Ley', 'Buscar Tesis'].map(tag => (
                  <button key={tag} className="text-[10px] bg-slate-800 px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas del Sabueso */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Radar size={20} className="text-blue-500" />
            Alertas del Sabueso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bento-card p-4 border-l-4 border-l-blue-500 flex gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg h-fit">
                <AlertCircle size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Nueva jurisprudencia relevante</p>
                <p className="text-xs text-slate-500 mt-1">Se publicó una tesis sobre "Despido Injustificado" que afecta al Caso #45.</p>
                <button className="text-[10px] text-blue-500 font-bold mt-2 uppercase tracking-wider">Ver Análisis</button>
              </div>
            </div>
            <div className="bento-card p-4 border-l-4 border-l-orange-500 flex gap-4">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg h-fit">
                <Clock size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Plazo de Ley próximo</p>
                <p className="text-xs text-slate-500 mt-1">Faltan 48 horas para presentar la contestación en el Caso #12.</p>
                <button className="text-[10px] text-orange-500 font-bold mt-2 uppercase tracking-wider">Redactar Ahora</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Estado del Acervo</h2>
          <div className="bento-card p-5 bg-slate-50 dark:bg-slate-800/30 border-dashed">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Documentos Indexados</span>
                <span className="text-xs font-bold">676,500</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[94%]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">SCJN</p>
                  <p className="text-sm font-bold">311,079</p>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Leyes</p>
                  <p className="text-sm font-bold">26,341</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic text-center">
                Última sincronización: Hoy, 12:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
