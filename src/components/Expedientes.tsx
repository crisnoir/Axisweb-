import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  MoreVertical, 
  Folder, 
  ChevronRight,
  Clock,
  Database,
  Sparkles,
  ShieldCheck,
  Upload
} from 'lucide-react';
import { MOCK_DOCUMENTS } from '../constants';

export const Expedientes: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('Todos');

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.caseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'Todos' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const docTypes = ['Todos', ...new Set(MOCK_DOCUMENTS.map(d => d.type))];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expedientes Digitales</h1>
          <p className="text-slate-500 mt-1">Archivo centralizado y soberano de toda la documentación procesal.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Folder size={18} /> Nueva Carpeta
          </button>
          <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <Upload size={18} /> Subir Documentos
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Documentos', value: '1,240', icon: FileText, color: 'text-blue-500' },
          { label: 'Espacio Utilizado', value: '4.2 GB', icon: Database, color: 'text-slate-500' },
          { label: 'Indexados por IA', value: '98%', icon: Sparkles, color: 'text-emerald-500' },
          { label: 'Integridad Soberana', value: 'Verificado', icon: ShieldCheck, color: 'text-blue-600' },
        ].map((stat, i) => (
          <div key={i} className="bento-card p-4 flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre de archivo o caso..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-legal-card-dark border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white dark:bg-legal-card-dark border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-8 text-sm outline-none appearance-none cursor-pointer"
            >
              {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bento-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombre</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Caso Asociado</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tamaño</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado IA</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredDocs.map((doc, i) => (
              <motion.tr 
                key={doc.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-blue-600 transition-colors">{doc.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{doc.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Folder size={14} className="text-slate-400" />
                    {doc.caseTitle}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} />
                    {doc.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {doc.size}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-bold uppercase tracking-wider ${
                    doc.status === 'INDEXED' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' :
                    doc.status === 'ANALYZING' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 animate-pulse' :
                    'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}>
                    {doc.status === 'INDEXED' ? 'Indexado' : doc.status === 'ANALYZING' ? 'Analizando' : 'Almacenado'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500" title="Vista Previa">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500" title="Descargar">
                      <Download size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {filteredDocs.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <FileText size={32} />
            </div>
            <p className="text-slate-500 font-medium">No se encontraron documentos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* Storage Health */}
      <div className="bento-card p-6 bg-slate-900 text-white border-none flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 flex items-center justify-center">
            <span className="text-sm font-bold">84%</span>
          </div>
          <div>
            <h3 className="font-bold">Salud del Acervo Digital</h3>
            <p className="text-xs text-slate-400 mt-1">Todos los documentos están respaldados en nodos soberanos y cifrados de punto a punto.</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
          <ShieldCheck size={16} /> Auditoría de Integridad
        </button>
      </div>
    </div>
  );
};
