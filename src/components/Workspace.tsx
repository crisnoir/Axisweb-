import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  AlertTriangle,
  ChevronLeft,
  Send,
  Sparkles,
  Gavel,
  Scale,
  FileSearch,
  CheckCircle2,
  ShieldAlert,
  Radar
} from 'lucide-react';

export const Workspace: React.FC<{ caseId: string; onBack: () => void }> = ({ caseId, onBack }) => {
  const [activeTab, setActiveTab] = React.useState('resumen');
  const [activeAgent, setActiveAgent] = React.useState<'CENTINELA' | 'ARQUITECTO' | 'SABUESO'>('CENTINELA');
  const [chatInput, setChatInput] = React.useState('');
  
  const [messages, setMessages] = React.useState([
    { 
      agent: 'CENTINELA', 
      content: 'He detectado que el término para la contestación vence en 48 horas. ¿Deseas que revise los requisitos de forma para evitar un desechamiento?' 
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setMessages([...messages, { agent: 'USER' as any, content: chatInput }]);
    setChatInput('');
    
    setTimeout(() => {
      const response = activeAgent === 'ARQUITECTO' 
        ? 'Generando borrador de conceptos de violación basado en la Tesis 2024567...'
        : activeAgent === 'SABUESO'
        ? 'Monitoreando el boletín judicial del 3° Distrito. No hay acuerdos nuevos hoy.'
        : 'Riesgo procesal mitigado: He verificado la personería del promovente.';
        
      setMessages(prev => [...prev, { agent: activeAgent, content: response }]);
    }, 1000);
  };

  const stages = [
    { id: 'INTAKE', label: 'Ingreso', status: 'done' },
    { id: 'ANALISIS', label: 'Análisis', status: 'current' },
    { id: 'ESTRATEGIA', label: 'Estrategia', status: 'pending' },
    { id: 'REDACCION', label: 'Redacción', status: 'pending' },
    { id: 'LITIGIO', label: 'Litigio', status: 'pending' },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-legal-bg-light dark:bg-legal-bg-dark">
      {/* Header with Workflow Progress */}
      <header className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-legal-bg-dark/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Amparo Pérez vs IMSS</h1>
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase tracking-wider">Crítico</span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Expediente: 123/2026 • 3° Distrito BCS</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
              <Sparkles size={14} /> Acciones del Arquitecto
            </button>
          </div>
        </div>

        {/* Workflow Stages Bar */}
        <div className="flex items-center gap-1 max-w-3xl">
          {stages.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                s.status === 'current' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 
                s.status === 'done' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' : 
                'bg-slate-100 text-slate-400 dark:bg-slate-800'
              }`}>
                {s.status === 'done' ? <CheckCircle2 size={12} /> : <div className="w-3 h-3 rounded-full border-2 border-current flex items-center justify-center text-[8px]">{i+1}</div>}
                {s.label}
              </div>
              {i < stages.length - 1 && <div className="w-4 h-px bg-slate-200 dark:bg-slate-800" />}
            </React.Fragment>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Workspace Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Contextual Tabs */}
          <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800">
            {['Resumen', 'Hechos', 'Documentos', 'Estrategia', 'Pruebas'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 text-xs font-bold transition-all relative uppercase tracking-widest ${
                  activeTab === tab.toLowerCase() ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                }`}
              >
                {tab}
                {activeTab === tab.toLowerCase() && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'resumen' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                {/* Agentic Insights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bento-card p-5 border-l-4 border-l-red-500">
                    <div className="flex items-center gap-2 text-red-600 mb-3">
                      <ShieldAlert size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Centinela (Riesgos)</span>
                    </div>
                    <p className="text-sm font-bold">Plazo de Contestación</p>
                    <p className="text-xs text-slate-500 mt-1">Vence en 48 horas. No se ha detectado borrador de contestación en el sistema.</p>
                  </div>
                  
                  <div className="bento-card p-5 border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-2 text-blue-600 mb-3">
                      <Sparkles size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Arquitecto (Estrategia)</span>
                    </div>
                    <p className="text-sm font-bold">Conceptos de Violación</p>
                    <p className="text-xs text-slate-500 mt-1">Sugerencia: Invocar el principio de "Pro Persona" basado en la Tesis 2024567.</p>
                  </div>

                  <div className="bento-card p-5 border-l-4 border-l-emerald-500">
                    <div className="flex items-center gap-2 text-emerald-600 mb-3">
                      <Radar size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Sabueso (Vigilancia)</span>
                    </div>
                    <p className="text-sm font-bold">Estado Procesal</p>
                    <p className="text-xs text-slate-500 mt-1">Último acuerdo: 15 Feb. El Sabueso está monitoreando el boletín de mañana.</p>
                  </div>
                </div>

                {/* Case Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Análisis de Hechos</h3>
                    <div className="bento-card p-6 legal-content text-sm space-y-4">
                      <p>1. El quejoso, Juan Pérez, padece de obesidad mórbida con comorbilidades asociadas (hipertensión y diabetes tipo 2).</p>
                      <p>2. El IMSS ha negado sistemáticamente la programación de la cirugía bariátrica necesaria, alegando falta de presupuesto.</p>
                      <p>3. Existe un riesgo inminente a la vida del paciente según el peritaje médico privado anexo.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Fundamentación Sugerida</h3>
                    <div className="space-y-3">
                      {[
                        { title: 'Art. 4 Constitucional', desc: 'Derecho humano a la protección de la salud.' },
                        { title: 'Ley de Amparo Art. 126', desc: 'Suspensión de oficio y de plano por riesgo a la vida.' },
                        { title: 'Tesis 2024567', desc: 'Obligaciones del Estado en materia de salud especializada.' },
                      ].map((f, i) => (
                        <div key={i} className="bento-card p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-blue-600">{f.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Intelligence Companion Sidebar */}
        <div className="w-96 border-l border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-legal-bg-dark/40 backdrop-blur-xl">
          {/* Agent Selector */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {[
                { id: 'CENTINELA', icon: ShieldAlert, color: 'text-red-500' },
                { id: 'ARQUITECTO', icon: Sparkles, color: 'text-blue-500' },
                { id: 'SABUESO', icon: Radar, color: 'text-emerald-500' },
              ].map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id as any)}
                  className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-all ${
                    activeAgent === agent.id ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <agent.icon size={18} className={agent.color} />
                  <span className="text-[8px] font-bold mt-1 uppercase tracking-tighter">{agent.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat/Companion Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                activeAgent === 'CENTINELA' ? 'bg-red-500' : 
                activeAgent === 'ARQUITECTO' ? 'bg-blue-500' : 'bg-emerald-500'
              }`} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {activeAgent} está activo
              </span>
            </div>

            {messages.map((msg, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className={`flex ${msg.agent === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm shadow-sm ${
                  msg.agent === 'USER' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                }`}>
                  {msg.agent !== 'USER' && (
                    <div className="flex items-center gap-1.5 mb-2">
                      {msg.agent === 'CENTINELA' && <ShieldAlert size={12} className="text-red-500" />}
                      {msg.agent === 'ARQUITECTO' && <Sparkles size={12} className="text-blue-500" />}
                      {msg.agent === 'SABUESO' && <Radar size={12} className="text-emerald-500" />}
                      <span className="text-[9px] font-bold uppercase tracking-wider opacity-50">{msg.agent}</span>
                    </div>
                  )}
                  <p className={msg.agent === 'USER' ? '' : 'legal-content leading-relaxed'}>
                    {msg.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-legal-bg-dark/50">
            <form onSubmit={handleSend} className="relative">
              <textarea 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Habla con el ${activeAgent.toLowerCase()}...`} 
                rows={2}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
              />
              <button 
                type="submit" 
                className="absolute right-3 bottom-3 p-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
              {[
                { label: 'Analizar Riesgos', agent: 'CENTINELA' },
                { label: 'Redactar Cláusula', agent: 'ARQUITECTO' },
                { label: 'Ver Boletín', agent: 'SABUESO' },
              ].map(s => (
                <button 
                  key={s.label}
                  onClick={() => {
                    setActiveAgent(s.agent as any);
                    setChatInput(s.label);
                  }}
                  className="whitespace-nowrap text-[9px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
