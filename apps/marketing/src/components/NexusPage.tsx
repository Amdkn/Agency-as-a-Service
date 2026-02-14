import React from 'react';

const NexusPage: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 pt-8">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 border border-blue-100 rounded text-xs font-semibold text-nexus mb-6 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-nexus"></span>
                        Expert OS v2.4 Live
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-tight mb-6">
                        L'Expertise,<br/>
                        <span className="text-nexus italic">Sécurisée.</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-light max-w-lg leading-relaxed mb-10 border-l-2 border-nexus pl-6">
                        Votre capital intellectuel est votre actif le plus précieux. Protégez-le, structurez-le et décuplez-le avec l'OS dédié aux industries de savoir.
                    </p>
                    <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8 max-w-md">
                        <div>
                            <div className="text-3xl font-serif text-slate-900 mb-1">99.9%</div>
                            <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Uptime SLA</div>
                        </div>
                        <div>
                            <div className="text-3xl font-serif text-slate-900 mb-1">ISO 27001</div>
                            <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Certified Security</div>
                        </div>
                    </div>
                </div>
                
                {/* Search Engine UI */}
                <div className="lg:col-span-5 relative">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-nexus text-sm">manage_search</span>
                                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Nexus Semantic Engine</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="relative mb-6">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400">search</span>
                                <input className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 text-slate-800 text-sm rounded focus:ring-1 focus:ring-nexus focus:border-nexus font-mono focus:outline-none" readOnly type="text" value="Clause de non-concurrence jurisprudence 2023"/>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500">CMD+K</div>
                            </div>
                            <div className="space-y-3">
                                <div className="p-3 bg-nexus-light/50 border border-blue-100 rounded hover:border-nexus transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-semibold text-nexus group-hover:underline">Arrêt Cour de Cassation n°21-11.234</h4>
                                        <span className="text-[10px] bg-white border border-slate-200 px-1.5 rounded text-slate-500">98% match</span>
                                    </div>
                                    <p className="text-xs text-slate-600 line-clamp-2">...confirme la nullité de la clause de non-concurrence en l'absence de contrepartie financière effective...</p>
                                </div>
                                <div className="p-3 bg-white border border-slate-100 rounded hover:border-nexus transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-nexus">Analyse Comparative: Social/Commercial</h4>
                                        <span className="text-[10px] bg-slate-50 border border-slate-200 px-1.5 rounded text-slate-500">85% match</span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">Synthèse des obligations contractuelles croisées entre le droit du travail et le droit commercial pour les cadres dirigeants.</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-xs text-slate-400">Indexed 14,203 documents in 0.04s</span>
                                <button className="text-xs font-medium text-nexus hover:text-blue-700">View All Results →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-b border-slate-200" id="sectors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
                <h2 className="font-serif text-3xl font-medium text-slate-900 mb-4">Verticales Industrielles</h2>
                <p className="text-slate-500 max-w-2xl">L'architecture Nexus est pré-configurée pour les environnements à haute densité de connaissances.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 overflow-hidden rounded-lg shadow-sm">
                <div className="bg-white p-8 hover:bg-slate-50 transition-colors group">
                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mb-6 group-hover:bg-nexus group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-slate-700 group-hover:text-white">gavel</span>
                    </div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">Nexus Law</h3>
                    <p className="text-xs font-bold text-nexus uppercase tracking-wide mb-4">Legal Engineering</p>
                    <ul className="space-y-3">
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Génération IA de contrats</li>
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Recherche de jurisprudence</li>
                    </ul>
                </div>
                <div className="bg-white p-8 hover:bg-slate-50 transition-colors group">
                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mb-6 group-hover:bg-nexus group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-slate-700 group-hover:text-white">monitor_heart</span>
                    </div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">Nexus Health</h3>
                    <p className="text-xs font-bold text-nexus uppercase tracking-wide mb-4">Clinical Data</p>
                    <ul className="space-y-3">
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Dossiers patients chiffrés</li>
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Aide au diagnostic</li>
                    </ul>
                </div>
                <div className="bg-white p-8 hover:bg-slate-50 transition-colors group">
                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mb-6 group-hover:bg-nexus group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-slate-700 group-hover:text-white">account_balance</span>
                    </div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">Nexus Finance</h3>
                    <p className="text-xs font-bold text-nexus uppercase tracking-wide mb-4">Accounting Core</p>
                    <ul className="space-y-3">
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Clôture fiscale automatisée</li>
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Détection de fraude</li>
                    </ul>
                </div>
                <div className="bg-white p-8 hover:bg-slate-50 transition-colors group">
                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mb-6 group-hover:bg-nexus group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-slate-700 group-hover:text-white">show_chart</span>
                    </div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">Nexus Capital</h3>
                    <p className="text-xs font-bold text-nexus uppercase tracking-wide mb-4">Wealth OS</p>
                    <ul className="space-y-3">
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Agrégation de patrimoine</li>
                        <li className="flex items-start text-sm text-slate-600"><span className="material-icons text-slate-300 text-xs mr-2 mt-1">check</span> Reporting LP temps réel</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nexus opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700 opacity-20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">Prêt à rationaliser votre expertise ?</h2>
            <p className="text-slate-300 text-lg mb-10 font-light max-w-2xl mx-auto">
                Rejoignez les cabinets d'élite qui utilisent Nexus pour transformer leur savoir en avantage concurrentiel durable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-nexus text-white rounded hover:bg-blue-600 transition-colors font-medium shadow-lg shadow-blue-900/50">
                    Déployer Nexus
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default NexusPage;