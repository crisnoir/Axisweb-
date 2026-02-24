import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Settings, 
  Shield, 
  CreditCard,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { MOCK_ORGS } from '../constants';

export const PlatformCRM: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Clientes (CRM)</h1>
          <p className="text-slate-500 mt-1">Administra organizaciones, planes y feature flags.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors flex items-center gap-2">
          <Plus size={18} /> Nueva Organización
        </button>
      </header>

      <div className="bento-card p-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, RFC o ID..." 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 px-4 text-sm outline-none">
          <option>Todos los planes</option>
          <option>Enterprise</option>
          <option>Pro</option>
          <option>Básico</option>
        </select>
        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 px-4 text-sm outline-none">
          <option>Todos los estados</option>
          <option>Activo</option>
          <option>Suspendido</option>
          <option>Prueba</option>
        </select>
      </div>

      <div className="bento-card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-bold text-slate-400">
            <tr>
              <th className="px-6 py-4">Organización</th>
              <th className="px-6 py-4">Plan & MRR</th>
              <th className="px-6 py-4">Usuarios</th>
              <th className="px-6 py-4">Feature Flags</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_ORGS.map((org) => (
              <tr key={org.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                      {org.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{org.name}</p>
                      <p className="text-[10px] text-slate-500">ID: {org.id} • Creado: {org.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold ${
                      org.plan === 'ENTERPRISE' ? 'bg-purple-100 text-purple-600' : 
                      org.plan === 'PRO' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {org.plan}
                    </span>
                    <span className="font-bold mt-1">${org.mrr}/mes</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{org.usersCount}</span>
                    <span className="text-slate-400">/ 50</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {['RAG', 'Radar', 'Ring'].map(flag => (
                      <div key={flag} className="w-2 h-2 rounded-full bg-emerald-500" title={flag} />
                    ))}
                    <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" title="Lab" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    org.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {org.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400" title="Configurar Módulos">
                      <Settings size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400" title="Facturación">
                      <CreditCard size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feature Flags Matrix Preview */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Matriz de Módulos (Feature Flags)</h2>
        <div className="bento-card p-6">
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="text-left font-bold text-xs text-slate-400 uppercase">Organización</div>
            {['Asuntos', 'Copilot', 'Bóveda', 'Radar'].map(f => (
              <div key={f} className="font-bold text-xs text-slate-400 uppercase">{f}</div>
            ))}
            
            {MOCK_ORGS.map(org => (
              <React.Fragment key={org.id}>
                <div className="text-left text-sm font-medium">{org.name}</div>
                <div className="flex justify-center"><CheckCircle2 className="text-emerald-500" size={18} /></div>
                <div className="flex justify-center"><CheckCircle2 className="text-emerald-500" size={18} /></div>
                <div className="flex justify-center"><CheckCircle2 className="text-emerald-500" size={18} /></div>
                <div className="flex justify-center">
                  {org.plan === 'ENTERPRISE' ? <CheckCircle2 className="text-emerald-500" size={18} /> : <XCircle className="text-slate-200 dark:text-slate-800" size={18} />}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
