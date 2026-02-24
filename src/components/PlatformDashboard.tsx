import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  DollarSign, 
  MessageSquare, 
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Database,
  Cpu
} from 'lucide-react';
import { MOCK_ORGS, MOCK_TICKETS } from '../constants';

export const PlatformDashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-slate-500 mt-1">KPIs globales y estado de la infraestructura AxisvIA.</p>
      </header>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'MRR Total', value: '$18,450', icon: DollarSign, trend: '+12%', up: true },
          { label: 'Clientes Activos', value: '142', icon: Users, trend: '+5', up: true },
          { label: 'Tickets Abiertos', value: '8', icon: MessageSquare, trend: '-2', up: true },
          { label: 'Uptime Sistema', value: '99.98%', icon: Activity, trend: 'Estable', up: true },
        ].map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bento-card p-5"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${kpi.up ? 'text-emerald-500' : 'text-red-500'}`}>
                {kpi.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CRM Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Clientes Recientes</h2>
            <button className="text-sm text-blue-500 font-bold">Ver CRM completo</button>
          </div>
          <div className="bento-card overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="px-6 py-3">Organización</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">MRR</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_ORGS.map((org) => (
                  <tr key={org.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium">{org.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        org.plan === 'ENTERPRISE' ? 'bg-purple-100 text-purple-600' : 
                        org.plan === 'PRO' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {org.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">${org.mrr}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${org.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        <span className="text-xs">{org.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Infrastructure Health */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Salud Infraestructura</h2>
          <div className="bento-card p-5 space-y-6">
            <div className="space-y-4">
              {[
                { label: 'API Gateway', icon: Server, status: 'UP', load: '12%' },
                { label: 'PostgreSQL (pgvector)', icon: Database, status: 'UP', load: '45%' },
                { label: 'RAG Engine (Vertex)', icon: Cpu, status: 'UP', load: '8%' },
                { label: 'Qwen Local Node', icon: Activity, status: 'DEGRADED', load: '92%' },
              ].map((svc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      svc.status === 'UP' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                    }`}>
                      <svc.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{svc.label}</p>
                      <p className="text-[10px] text-slate-500">Carga: {svc.load}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    svc.status === 'UP' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {svc.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Latencia RAG Promedio</span>
                <span className="text-xs font-bold">240ms</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[85%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Tickets de Soporte Críticos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_TICKETS.map((tk) => (
            <div key={tk.id} className="bento-card p-4 flex justify-between items-center hover:border-slate-400 cursor-pointer transition-colors">
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg h-fit ${
                  tk.priority === 'HIGH' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-500'
                }`}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">{tk.id}</span>
                    <p className="text-sm font-bold">{tk.subject}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{tk.orgName} • {tk.createdAt}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                tk.status === 'OPEN' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {tk.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
