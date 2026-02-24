import { 
  LayoutDashboard, 
  FolderKanban, 
  Library, 
  Users, 
  FileText, 
  Radar, 
  FlaskConical, 
  Sword, 
  Settings,
  Search,
  MessageSquare
} from 'lucide-react';
import { NavItem } from './types';

export const CLIENT_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
  { label: 'Mis Asuntos', icon: FolderKanban, path: 'asuntos' },
  { label: 'Bóveda Legal', icon: Library, path: 'boveda' },
  { label: 'Cartera de Clientes', icon: Users, path: 'cartera' },
  { label: 'Expedientes', icon: FileText, path: 'expedientes' },
];

export const OPTIONAL_NAV_ITEMS: NavItem[] = [
  { label: 'Radar', icon: Radar, path: 'radar' },
  { label: 'Laboratorio', icon: FlaskConical, path: 'laboratorio' },
  { label: 'El Ring', icon: Sword, path: 'ring' },
  { label: 'Biblioteca', icon: Library, path: 'biblioteca' },
];

export const MOCK_CASES: any[] = [
  {
    id: '1',
    title: 'Amparo Pérez vs IMSS',
    client: 'Juan Pérez',
    matter: 'Administrativo',
    status: 'CRITICO',
    stage: 'LITIGIO',
    lastActivity: '2026-02-18',
    deadline: '2026-02-22',
    description: 'Recurso de amparo contra la negativa de atención médica especializada.',
    progress: 85
  },
  {
    id: '2',
    title: 'Despido Martínez',
    client: 'María Martínez',
    matter: 'Laboral',
    status: 'ALERTA',
    stage: 'REDACCION',
    lastActivity: '2026-02-19',
    deadline: '2026-02-24',
    description: 'Demanda por despido injustificado y reinstalación.',
    progress: 40
  },
  {
    id: '3',
    title: 'Divorcio Rodríguez',
    client: 'Carlos Rodríguez',
    matter: 'Familiar',
    status: 'NORMAL',
    stage: 'ANALISIS',
    lastActivity: '2026-02-17',
    deadline: '2026-02-25',
    description: 'Proceso de divorcio incausado con liquidación de sociedad conyugal.',
    progress: 20
  },
  {
    id: '4',
    title: 'Sucesión Intestamentaria López',
    client: 'Familia López',
    matter: 'Civil',
    status: 'NORMAL',
    stage: 'INTAKE',
    lastActivity: '2026-02-20',
    deadline: '2026-03-10',
    description: 'Denuncia de sucesión intestamentaria de bienes inmuebles.',
    progress: 10
  },
  {
    id: '5',
    title: 'Defensa Fiscal "El Sol"',
    client: 'Restaurante El Sol S.A.',
    matter: 'Fiscal',
    status: 'ALERTA',
    stage: 'ESTRATEGIA',
    lastActivity: '2026-02-15',
    deadline: '2026-02-28',
    description: 'Impugnación de crédito fiscal determinado por el SAT.',
    progress: 60
  }
];

export const MOCK_CLIENTS: any[] = [
  {
    id: 'C1',
    name: 'Juan Pérez',
    type: 'PERSONA_FISICA',
    email: 'juan.perez@email.com',
    phone: '612-123-4567',
    rfc: 'PERJ800101HDF',
    status: 'ACTIVE',
    totalCases: 1,
    totalBilled: 45000,
    pendingBalance: 5000,
    lastContact: '2026-02-18'
  },
  {
    id: 'C2',
    name: 'María Martínez',
    type: 'PERSONA_FISICA',
    email: 'm.martinez@email.com',
    phone: '612-987-6543',
    rfc: 'MARM850505ABC',
    status: 'ACTIVE',
    totalCases: 1,
    totalBilled: 12000,
    pendingBalance: 0,
    lastContact: '2026-02-19'
  },
  {
    id: 'C3',
    name: 'Restaurante El Sol S.A.',
    type: 'PERSONA_MORAL',
    email: 'contacto@elsol.mx',
    phone: '612-555-0199',
    rfc: 'SOL901010TX1',
    status: 'ACTIVE',
    totalCases: 1,
    totalBilled: 85000,
    pendingBalance: 15000,
    lastContact: '2026-02-15'
  }
];

export const PLATFORM_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: 'p-dashboard' },
  { label: 'Clientes (CRM)', icon: Users, path: 'p-crm' },
  { label: 'Facturación (ERP)', icon: FileText, path: 'p-erp' },
  { label: 'Soporte', icon: MessageSquare, path: 'p-support' },
  { label: 'Infraestructura', icon: Radar, path: 'p-infra' },
  { label: 'Equipo AxisvIA', icon: Users, path: 'p-team' },
];

export const MOCK_ORGS: any[] = [
  { id: '1', name: 'Despacho Pérez & Asociados', plan: 'PRO', status: 'ACTIVE', mrr: 450, usersCount: 12, createdAt: '2025-10-15' },
  { id: '2', name: 'García Legal Group', plan: 'ENTERPRISE', status: 'ACTIVE', mrr: 1200, usersCount: 45, createdAt: '2025-11-02' },
  { id: '3', name: 'Consultoría Fiscal BCS', plan: 'BASICO', status: 'TRIAL', mrr: 0, usersCount: 3, createdAt: '2026-02-01' },
];

export const MOCK_TICKETS: any[] = [
  { id: 'TK-102', orgName: 'Despacho Pérez', subject: 'Error en carga de PDF', priority: 'HIGH', status: 'OPEN', createdAt: '2026-02-20' },
  { id: 'TK-101', orgName: 'García Legal', subject: 'Duda sobre RAG local', priority: 'LOW', status: 'RESOLVED', createdAt: '2026-02-19' },
];

export const MOCK_DOCUMENTS: any[] = [
  { id: 'D1', name: 'Demanda_Amparo_Perez.pdf', caseId: '1', caseTitle: 'Amparo Pérez vs IMSS', type: 'PDF', size: '2.4 MB', date: '2026-02-15', status: 'INDEXED' },
  { id: 'D2', name: 'Contestacion_IMSS_123.pdf', caseId: '1', caseTitle: 'Amparo Pérez vs IMSS', type: 'PDF', size: '1.8 MB', date: '2026-02-18', status: 'INDEXED' },
  { id: 'D3', name: 'Pruebas_Medicas_Perez.zip', caseId: '1', caseTitle: 'Amparo Pérez vs IMSS', type: 'ZIP', size: '15.2 MB', date: '2026-02-15', status: 'STORED' },
  { id: 'D4', name: 'Contrato_Laboral_Martinez.docx', caseId: '2', caseTitle: 'Despido Martínez', type: 'DOCX', size: '450 KB', date: '2026-02-10', status: 'INDEXED' },
  { id: 'D5', name: 'Acta_Nacimiento_Rodriguez.pdf', caseId: '3', caseTitle: 'Divorcio Rodríguez', type: 'PDF', size: '1.1 MB', date: '2026-02-05', status: 'INDEXED' },
  { id: 'D6', name: 'Escritura_Publica_456.pdf', caseId: '4', caseTitle: 'Sucesión López', type: 'PDF', size: '5.6 MB', date: '2026-02-20', status: 'ANALYZING' },
];

export const MOCK_RADAR_EVENTS: any[] = [
  {
    id: 'R1',
    type: 'ACUERDO',
    title: 'Nuevo Acuerdo Publicado',
    caseTitle: 'Amparo Pérez vs IMSS',
    caseId: '1',
    court: 'Juzgado 3° de Distrito BCS',
    summary: 'Se admite a trámite el recurso de queja interpuesto por la contraparte.',
    risk: 'ALTO',
    riskAnalysis: 'El recurso de queja podría suspender el procedimiento principal si no se contesta en tiempo.',
    suggestion: 'Presentar alegatos contra el recurso de queja enfocados en la urgencia médica.',
    timestamp: '2026-02-22T09:15:00',
    status: 'NEW'
  },
  {
    id: 'R2',
    type: 'SENTENCIA',
    title: 'Sentencia de Amparo Dictada',
    caseTitle: 'Despido Martínez',
    caseId: '2',
    court: 'Tribunal Colegiado de Circuito',
    summary: 'Se concede el amparo y protección de la justicia federal para efectos de reinstalación.',
    risk: 'BAJO',
    riskAnalysis: 'Sentencia favorable. El riesgo es la posible impugnación por parte de la patronal mediante recurso de revisión.',
    suggestion: 'Preparar la ejecución de sentencia y monitorear el término de revisión.',
    timestamp: '2026-02-21T14:30:00',
    status: 'READ'
  },
  {
    id: 'R3',
    type: 'NOTIFICACION',
    title: 'Notificación de Peritaje',
    caseTitle: 'Sucesión López',
    caseId: '4',
    court: 'Juzgado 2° Civil La Paz',
    summary: 'El perito valuador ha rendido su dictamen sobre el inmueble en litigio.',
    risk: 'MEDIO',
    riskAnalysis: 'El valor determinado es 20% menor al avalúo comercial previo.',
    suggestion: 'Impugnar el peritaje o solicitar aclaración sobre la metodología de valuación.',
    timestamp: '2026-02-20T11:00:00',
    status: 'NEW'
  }
];
