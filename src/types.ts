import { LucideIcon } from 'lucide-react';

export type UserRole = 'ADMIN' | 'ABOGADO' | 'PARALEGAL';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Case {
  id: string;
  title: string;
  client: string;
  matter: string;
  status: 'NORMAL' | 'ALERTA' | 'CRITICO';
  stage: 'INTAKE' | 'ANALISIS' | 'ESTRATEGIA' | 'REDACCION' | 'LITIGIO';
  lastActivity: string;
  deadline?: string;
  description: string;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
  featureFlag?: string;
}

export interface Client {
  id: string;
  name: string;
  type: 'PERSONA_FISICA' | 'PERSONA_MORAL';
  email: string;
  phone: string;
  rfc: string;
  status: 'ACTIVE' | 'INACTIVE';
  totalCases: number;
  totalBilled: number;
  pendingBalance: number;
  lastContact: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: 'BASICO' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'SUSPENDED' | 'TRIAL';
  mrr: number;
  usersCount: number;
  createdAt: string;
  features: string[];
}

export interface SupportTicket {
  id: string;
  orgName: string;
  subject: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

export interface SystemHealth {
  service: string;
  status: 'UP' | 'DOWN' | 'DEGRADED';
  latency: string;
  load: string;
}
