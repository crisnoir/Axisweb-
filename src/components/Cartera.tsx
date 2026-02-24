import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  DollarSign, 
  Briefcase, 
  ChevronRight, 
  MoreHorizontal,
  ArrowLeft,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { MOCK_CLIENTS, MOCK_CASES } from '../constants';

interface CarteraProps {
  onCaseSelect: (id: string) => void;
}

export const Cartera: React.FC<CarteraProps> = ({ onCaseSelect }) => {
  const [selectedClientId, setSelectedClientId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const selectedClient = MOCK_CLIENTS.find(c => c.id === selectedClientId);
  const clientCases = MOCK_CASES.filter(c => c.client === selectedClient?.name);

  const filteredClients = MOCK_CLIENTS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.rfc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedClientId ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 space-y-8 max-w-7xl mx-auto w-full"
          >
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Cartera de Clientes</h1>
                <p className="text-slate-500 mt-1">Administra la información, casos y facturación de tus clientes.</p>
              </div>
              <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
                <Plus size={18} /> Nuevo Cliente
              </button>
            </header>

            <div className="bento-card p-4 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre o RFC..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2.5 px-4 text-sm outline-none">
                <option>Todos los tipos</option>
                <option>Persona Física</option>
                <option>Persona Moral</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <motion.div 
                  key={client.id}
                  layoutId={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className="bento-card p-6 cursor-pointer group hover:border-blue-400 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500 transition-colors">
                      <User size={24} />
                    </div>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg leading-tight">{client.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">{client.rfc}</p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asuntos</p>
                      <p className="text-sm font-bold mt-0.5">{client.totalCases} Activos</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo Pendiente</p>
                      <p className={`text-sm font-bold mt-0.5 ${client.pendingBalance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        ${client.pendingBalance.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Último contacto: {client.lastContact}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <header className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-legal-bg-dark/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedClientId(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight">{selectedClient?.name}</h1>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded uppercase tracking-wider">Activo</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 uppercase font-bold tracking-widest">RFC: {selectedClient?.rfc} • {selectedClient?.type.replace('_', ' ')}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors">
                    Editar Perfil
                  </button>
                  <button className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                    Nueva Factura
                  </button>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Info & Billing */}
                <div className="space-y-6">
                  <section className="bento-card p-6 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Información de Contacto</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                          <Mail size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                          <p className="text-sm font-medium">{selectedClient?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                          <Phone size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Teléfono</p>
                          <p className="text-sm font-medium">{selectedClient?.phone}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bento-card p-6 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Resumen Financiero</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Facturado</p>
                        <p className="text-lg font-bold mt-1">${selectedClient?.totalBilled.toLocaleString()}</p>
                      </div>
                      <div className={`p-4 rounded-xl ${selectedClient?.pendingBalance > 0 ? 'bg-red-50 dark:bg-red-900/10' : 'bg-emerald-50 dark:bg-emerald-900/10'}`}>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Saldo Pendiente</p>
                        <p className={`text-lg font-bold mt-1 ${selectedClient?.pendingBalance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                          ${selectedClient?.pendingBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Últimas Facturas</p>
                      {[
                        { id: 'FAC-2024-001', amount: 15000, status: 'PAID', date: '2026-01-15' },
                        { id: 'FAC-2024-002', amount: 5000, status: 'PENDING', date: '2026-02-10' },
                      ].map((fac, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-xs">
                          <div className="flex items-center gap-2">
                            <DollarSign size={14} className="text-slate-400" />
                            <span className="font-bold">{fac.id}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold">${fac.amount.toLocaleString()}</span>
                            <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-bold uppercase ${
                              fac.status === 'PAID' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                              {fac.status === 'PAID' ? 'Pagada' : 'Pendiente'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column: Cases & Documents */}
                <div className="lg:col-span-2 space-y-8">
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Asuntos Vinculados</h3>
                      <button className="text-xs font-bold text-blue-500 hover:underline">+ Nuevo Asunto</button>
                    </div>
                    <div className="space-y-3">
                      {clientCases.map((c) => (
                        <div 
                          key={c.id}
                          onClick={() => onCaseSelect(c.id)}
                          className="bento-card p-4 flex items-center justify-between group cursor-pointer hover:border-blue-400 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-1 h-10 rounded-full ${
                              c.status === 'CRITICO' ? 'bg-red-500' : c.status === 'ALERTA' ? 'bg-orange-500' : 'bg-emerald-500'
                            }`} />
                            <div>
                              <p className="text-sm font-bold group-hover:text-blue-600 transition-colors">{c.title}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded uppercase">{c.stage}</span>
                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Exp: {c.id}/2026</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Vencimiento</p>
                              <p className="text-xs font-bold">{c.deadline}</p>
                            </div>
                            <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Documentación del Cliente</h3>
                      <button className="text-xs font-bold text-blue-500 hover:underline">+ Subir Archivo</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'Identificación Oficial.pdf', type: 'ID', date: '2026-01-10' },
                        { name: 'Comprobante Domicilio.pdf', type: 'DOC', date: '2026-01-10' },
                        { name: 'Acta Constitutiva.pdf', type: 'LEGAL', date: '2026-01-12' },
                        { name: 'Poder Notarial.pdf', type: 'LEGAL', date: '2026-01-12' },
                      ].map((doc, i) => (
                        <div key={i} className="bento-card p-4 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 group-hover:text-blue-500 transition-colors">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="text-xs font-bold">{doc.name}</p>
                              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{doc.type} • {doc.date}</p>
                            </div>
                          </div>
                          <Download size={16} className="text-slate-300 hover:text-slate-900 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
