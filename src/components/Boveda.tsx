import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  ExternalLink,
  Download,
  Bookmark,
  History,
  X,
  Sparkles,
  ChevronRight,
  Copy,
  Share2,
  FileText,
  Scale,
  Gavel
} from 'lucide-react';

interface LegalDoc {
  id: string;
  title: string;
  source: string;
  score: number;
  preview: string;
  content: string;
  tags: string[];
  date: string;
  citation: string;
  aiInsight: string;
}

export const Boveda: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<LegalDoc[]>([]);
  const [selectedDoc, setSelectedDoc] = React.useState<LegalDoc | null>(null);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search latency
    setTimeout(() => {
      setResults([
        {
          id: '1',
          title: 'Ley Federal del Trabajo, Art. 50',
          source: 'Legislación Federal',
          score: 0.98,
          date: '2024-01-01',
          citation: 'LFT Art. 50, DOF 01-01-2024',
          preview: 'Las indemnizaciones a que se refiere el artículo anterior consistirán: I. Si la relación de trabajo fuere por tiempo determinado menor de un año...',
          content: 'Las indemnizaciones a que se refiere el artículo anterior consistirán: \n\nI. Si la relación de trabajo fuere por tiempo determinado menor de un año, en una cantidad igual al importe de los salarios de la mitad del tiempo de servicios prestados; si excediere de un año, en una cantidad igual al importe de los salarios de seis meses por el primer año y de veinte días por cada uno de los años siguientes en que hubiese prestado sus servicios; \n\nII. Si la relación de trabajo fuere por tiempo indeterminado, la indemnización consistirá en veinte días de salario por cada uno de los años de servicios prestados; \n\nIII. Además de las indemnizaciones a que se refieren las fracciones anteriores, en el importe de tres meses de salario y el pago de los salarios vencidos e intereses, en su caso, en los términos previstos en el artículo 48 de esta Ley.',
          tags: ['Laboral', 'Indemnización', 'Federal'],
          aiInsight: 'Este artículo es fundamental para calcular la cuantía de la demanda. El Arquitecto sugiere verificar si el contrato es por tiempo determinado o indeterminado antes de aplicar las fracciones I o II.'
        },
        {
          id: '2',
          title: 'Tesis SCJN: 2024567 - Despido Injustificado',
          source: 'Jurisprudencia SCJN',
          score: 0.92,
          date: '2023-11-15',
          citation: 'Tesis: 2a./J. 45/2023 (11a.), Gaceta del Semanario Judicial de la Federación',
          preview: 'DESPIDO INJUSTIFICADO. LA CARGA DE LA PRUEBA CORRESPONDE AL PATRÓN CUANDO EXISTE CONTROVERSIA SOBRE LA CAUSA DE LA RESCISIÓN...',
          content: 'DESPIDO INJUSTIFICADO. LA CARGA DE LA PRUEBA CORRESPONDE AL PATRÓN CUANDO EXISTE CONTROVERSIA SOBRE LA CAUSA DE LA RESCISIÓN. \n\nDe acuerdo con el artículo 784 de la Ley Federal del Trabajo, el patrón tiene la obligación de conservar y exhibir los documentos que tiene el deber legal de generar. En consecuencia, si el trabajador alega un despido injustificado y el patrón lo niega, este último debe acreditar la causa de la rescisión o, en su caso, la inexistencia del despido mediante pruebas documentales idóneas.',
          tags: ['Jurisprudencia', 'SCJN', 'Carga de la Prueba'],
          aiInsight: 'Tesis de aplicación obligatoria. Refuerza la estrategia de defensa al obligar a la contraparte a presentar el aviso de rescisión por escrito.'
        },
        {
          id: '3',
          title: 'Código Civil para el Estado de BCS, Art. 450',
          source: 'Legislación BCS',
          score: 0.85,
          date: '2022-05-20',
          citation: 'CCBCS Art. 450, BOGE 20-05-2022',
          preview: 'Tienen incapacidad natural y legal: I. Los menores de edad; II. Los mayores de edad disminuidos o perturbados en su inteligencia...',
          content: 'Tienen incapacidad natural y legal: \n\nI. Los menores de edad; \n\nII. Los mayores de edad disminuidos o perturbados en su inteligencia, aunque tengan intervalos lúcidos; y aquellos que padezcan alguna afección originada por enfermedad o deficiencia persistente de carácter físico, psicológico o sensorial o por la adicción a sustancias tóxicas como el alcohol, los psicotrópicos o los estupefacientes; siempre que debido a la limitación, o a la alteración en la inteligencia que esto les provoque no puedan gobernarse y obligarse por sí mismos, o manifestar su voluntad por algún medio.',
          tags: ['Civil', 'BCS', 'Capacidad'],
          aiInsight: 'Relevante para casos de interdicción o representación legal en el estado de Baja California Sur.'
        }
      ]);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-legal-bg-light dark:bg-legal-bg-dark">
      {/* Search Header */}
      <header className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-legal-bg-dark/80 backdrop-blur-md z-20">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Bóveda Legal</h1>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Acervo de 676,500 documentos indexados</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                <Bookmark size={20} />
              </button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                <History size={20} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            </div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por concepto jurídico, número de tesis o artículo..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-32 text-lg outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
            />
            <div className="absolute inset-y-2 right-2 flex gap-2">
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2">
            {['Jurisprudencia SCJN', 'Leyes Federales', 'Legislación BCS', 'Tratados Internacionales', 'Sentencias'].map(filter => (
              <button key={filter} className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider text-slate-500">
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            {results.length > 0 ? (
              <>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Se encontraron {results.length} resultados relevantes</span>
                  <div className="flex items-center gap-2">
                    <span>Ordenar por:</span>
                    <select className="bg-transparent border-none outline-none text-blue-500 cursor-pointer">
                      <option>Relevancia</option>
                      <option>Fecha</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {results.map((res, i) => (
                    <motion.div 
                      key={res.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedDoc(res)}
                      className={`bento-card p-6 cursor-pointer border-2 transition-all group ${
                        selectedDoc?.id === res.id ? 'border-blue-500 ring-4 ring-blue-500/5' : 'hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{res.source}</span>
                            <span className="text-[10px] font-bold text-slate-400">• {res.date}</span>
                          </div>
                          <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors leading-tight">{res.title}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Score IA</p>
                          <p className="text-lg font-bold text-emerald-500">{(res.score * 100).toFixed(0)}%</p>
                        </div>
                      </div>

                      <p className="legal-content text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                        {res.preview}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {res.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[9px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-bold uppercase tracking-wider text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-bold text-blue-500">Ver documento completo</span>
                          <ChevronRight size={16} className="text-blue-500" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 space-y-6">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center">
                  <BookOpen size={48} strokeWidth={1} />
                </div>
                <div className="text-center max-w-sm">
                  <p className="font-bold text-slate-900 dark:text-white text-lg">Inicia tu investigación legal</p>
                  <p className="text-sm mt-2">Busca en leyes federales, estatales, jurisprudencia de la SCJN y tratados internacionales.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  {['"Despido injustificado"', '"Pensión alimenticia"', '"Amparo indirecto"', '"Derecho a la salud"'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => {setQuery(s.replace(/"/g, '')); handleSearch({ preventDefault: () => {} } as any);}}
                      className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium hover:border-blue-500 transition-all text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Document Preview Panel */}
        <AnimatePresence>
          {selectedDoc && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-[500px] border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-legal-bg-dark flex flex-col z-30 shadow-2xl"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
                    <FileText size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Vista de Documento</span>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">
                      {selectedDoc.source}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Publicado: {selectedDoc.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold leading-tight">{selectedDoc.title}</h2>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                      <Download size={14} /> Descargar PDF
                    </button>
                    <button className="p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Bookmark size={18} />
                    </button>
                    <button className="p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* AI Insight Section */}
                <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Sparkles size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Análisis del Arquitecto</span>
                  </div>
                  <p className="text-xs leading-relaxed text-blue-900 dark:text-blue-200 font-medium italic">
                    "{selectedDoc.aiInsight}"
                  </p>
                </div>

                {/* Citation Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cita Bibliográfica</h4>
                    <button className="text-[10px] font-bold text-blue-500 flex items-center gap-1 hover:underline">
                      <Copy size={10} /> Copiar Cita
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-mono text-[11px] border border-slate-200 dark:border-slate-800">
                    {selectedDoc.citation}
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Texto Completo</h4>
                  <div className="legal-content text-sm leading-relaxed space-y-4 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                    {selectedDoc.content.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Related Concepts */}
                <div className="space-y-4 pb-8">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conceptos Relacionados</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.tags.map(tag => (
                      <button key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
