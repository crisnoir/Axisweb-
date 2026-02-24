import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar as RadarIcon, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Gavel, 
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  FileText,
  Search,
  Filter,
  MessageSquare,
  Zap
} from 'lucide-react';
import { MOCK_RADAR_EVENTS } from '../constants';

interface RadarProps {
  onCaseSelect: (id: string) => void;
}

export const Radar: React.FC<RadarProps> = ({ onCaseSelect }) => {
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(MOCK_RADAR_EVENTS[0].id);
  const selectedEvent = MOCK_RADAR_EVENTS.find(e => e.id === selectedEventId);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-legal-bg-light dark:bg-legal-bg-dark">
      {/* Header */}
      <header className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-legal-bg-dark/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <RadarIcon size={24} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Radar de Inteligencia</h1>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Vigilancia Judicial Activa • El Sabueso</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Sabueso en Línea</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Event Feed */}
        <div className="w-[450px] border-r border-slate-200 dark:border-slate-800 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-900/20">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <span>Eventos Recientes</span>
              <span>{MOCK_RADAR_EVENTS.length} Detectados</span>
            </div>

            {MOCK_RADAR_EVENTS.map((event) => (
              <motion.div
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden group ${
                  selectedEventId === event.id 
                    ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-xl shadow-blue-500/5' 
                    : 'bg-white/50 dark:bg-slate-800/40 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {event.status === 'NEW' && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-bl-lg" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${
                    event.type === 'ACUERDO' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                    event.type === 'SENTENCIA' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                    'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
                  }`}>
                    {event.type === 'ACUERDO' ? <FileText size={20} /> :
                     event.type === 'SENTENCIA' ? <Gavel size={20} /> :
                     <AlertTriangle size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{event.type}</span>
                      <span className="text-[10px] text-slate-400">{new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <h3 className="font-bold text-sm truncate group-hover:text-blue-600 transition-colors">{event.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 truncate">{event.caseTitle}</p>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        event.risk === 'ALTO' ? 'bg-red-100 text-red-600 dark:bg-red-900/40' :
                        event.risk === 'MEDIO' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40' :
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40'
                      }`}>
                        Riesgo {event.risk}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Event Analysis Detail */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-legal-bg-dark">
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-12 max-w-4xl mx-auto space-y-10"
              >
                {/* Event Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                      {selectedEvent.type}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Detectado: {new Date(selectedEvent.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold leading-tight">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-6 text-slate-500">
                    <div className="flex items-center gap-2">
                      <FolderIcon size={16} />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedEvent.caseTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gavel size={16} />
                      <span className="text-sm">{selectedEvent.court}</span>
                    </div>
                  </div>
                </div>

                {/* Agentic Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sabueso: Extraction */}
                  <div className="bento-card p-6 border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/10">
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                      <RadarIcon size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Sabueso: Extracción</span>
                    </div>
                    <p className="text-sm font-bold mb-2">Resumen del Acuerdo</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedEvent.summary}
                    </p>
                  </div>

                  {/* Centinela: Risk */}
                  <div className={`bento-card p-6 border-l-4 ${
                    selectedEvent.risk === 'ALTO' ? 'border-l-red-500 bg-red-50/30 dark:bg-red-900/10' :
                    'border-l-orange-500 bg-orange-50/30 dark:bg-orange-900/10'
                  }`}>
                    <div className={`flex items-center gap-2 mb-4 ${
                      selectedEvent.risk === 'ALTO' ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      <ShieldAlert size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Centinela: Auditoría de Riesgo</span>
                    </div>
                    <p className="text-sm font-bold mb-2">Análisis de Impacto</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedEvent.riskAnalysis}
                    </p>
                  </div>
                </div>

                {/* Arquitecto: Proactive Action */}
                <div className="bento-card p-8 border-2 border-blue-500/20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-legal-card-dark relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles size={120} className="text-blue-500" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-blue-600 mb-6">
                      <Sparkles size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Arquitecto: Acción Sugerida</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">Estrategia de Respuesta Inmediata</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl">
                      {selectedEvent.suggestion}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <button className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                        <Zap size={18} /> Generar Borrador de Respuesta
                      </button>
                      <button 
                        onClick={() => onCaseSelect(selectedEvent.caseId)}
                        className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Ir al Workspace <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Context */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contexto del Expediente</h4>
                  <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-legal-bg-dark z-10" />
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Hoy</p>
                      <p className="text-sm font-bold mt-1">{selectedEvent.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{selectedEvent.court}</p>
                    </div>
                    <div className="relative opacity-50">
                      <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-legal-bg-dark z-10" />
                      <p className="text-xs font-bold uppercase tracking-wider">18 Feb 2026</p>
                      <p className="text-sm font-bold mt-1">Presentación de Pruebas Supervenientes</p>
                      <p className="text-xs text-slate-500 mt-1">Se anexaron 3 documentos clínicos.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <RadarIcon size={64} strokeWidth={1} className="opacity-20" />
                <p className="font-medium">Selecciona un evento para ver el análisis detallado</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FolderIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);
