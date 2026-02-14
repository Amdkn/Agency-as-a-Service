import React from 'react';
import { PageType } from '../types';

const OrbiterPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-display">
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 map-bg opacity-30 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-orbiter-light via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-green-100 text-green-800 mb-6 border border-green-200">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        Système Opérationnel v2.4
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                        Maîtrisez le <br/>
                        <span className="text-orbiter">Monde Physique.</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-lg font-light leading-relaxed">
                        Logistique, Interventions et Stocks synchronisés en temps réel. L'OS pour ceux qui construisent le monde réel.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="bg-white p-4 rounded-2xl shadow-card border border-slate-100 flex items-center gap-4 min-w-[200px]">
                            <div className="bg-green-50 p-2 rounded-lg text-orbiter">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase font-bold">Planning</div>
                                <div className="text-sm font-semibold">Optimisé IA</div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-card border border-slate-100 flex items-center gap-4 min-w-[200px]">
                            <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase font-bold">Flotte</div>
                                <div className="text-sm font-semibold">100% Connectée</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 relative z-20">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-slate-900">Vue Globale</h3>
                                <p className="text-xs text-slate-500">Paris, Île-de-France</p>
                            </div>
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </div>
                        <div className="bg-slate-50 rounded-2xl h-64 w-full relative overflow-hidden mb-6 border border-slate-100 map-bg">
                             {/* Faux Map Visuals */}
                            <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.4}}>
                                <path d="M50 50 Q 150 100 250 50 T 450 150" fill="none" stroke="#16A34A" strokeDasharray="5,5" strokeWidth="3"></path>
                                <path d="M100 200 Q 200 150 300 200" fill="none" stroke="#D97706" strokeWidth="3"></path>
                            </svg>
                            <div className="absolute top-12 left-1/4 transform -translate-x-1/2">
                                <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-orbiter border-2 border-orbiter z-10 relative">
                                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                                </div>
                                <div className="bg-white px-2 py-1 rounded text-[10px] font-bold shadow absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">En route</div>
                            </div>
                             <div className="absolute bottom-16 right-1/3 transform translate-x-1/2">
                                <div className="w-8 h-8 bg-slate-900 rounded-full shadow-lg flex items-center justify-center text-white border-2 border-white z-10 relative">
                                    <span className="material-symbols-outlined text-sm">inventory_2</span>
                                </div>
                                <div className="bg-white px-2 py-1 rounded text-[10px] font-bold shadow absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">Livré</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-slate-900">98%</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-wide">On Time</div>
                            </div>
                            <div className="text-center border-l border-slate-100">
                                <div className="text-2xl font-bold text-slate-900">142</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Active Missions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="map">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Command Center</h2>
                <p className="text-slate-400">Visibilité totale sur vos opérations terrain.</p>
            </div>
            <div className="bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[500px]">
                <div className="w-full lg:w-80 bg-slate-800 border-r border-slate-700 flex flex-col z-20">
                    <div className="p-6 border-b border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Flotte Active</h3>
                            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Live</span>
                        </div>
                        <div className="relative">
                            <input className="w-full bg-slate-900 border-none rounded-lg py-2 pl-9 text-sm text-white focus:ring-1 focus:ring-orbiter placeholder-slate-500" placeholder="Rechercher une unité..." type="text"/>
                            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-500 text-sm">search</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                        <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600 hover:border-orbiter cursor-pointer transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="font-semibold text-sm">Unit 42-Alpha</span>
                                </div>
                                <span className="text-xs text-slate-400">2m ago</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Paris, 75011</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                        [ Interactive Map Interface ]
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-24 bg-surface-light relative" id="sectors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Secteurs Orbiter</h2>
                <p className="text-slate-500">Modules spécialisés pour chaque vertical métier.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden h-full flex flex-col">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined">apartment</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Orbiter Estate</h3>
                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-4">Digital Inspection</p>
                        <p className="text-sm text-slate-500 mb-6 flex-grow">Gestion immobilière assistée par IA. Inspections automatisées.</p>
                    </div>
                </div>
                <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden h-full flex flex-col">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined">construction</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Orbiter Trade</h3>
                        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-4">Site Planning</p>
                        <p className="text-sm text-slate-500 mb-6 flex-grow">Planification de chantier et coordination des sous-traitants.</p>
                    </div>
                </div>
                <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden h-full flex flex-col">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined">storefront</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Orbiter Retail</h3>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4">Predictive Inventory</p>
                        <p className="text-sm text-slate-500 mb-6 flex-grow">Optimisation des stocks en rayon et en réserve.</p>
                    </div>
                </div>
                <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden h-full flex flex-col">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined">directions_car</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Orbiter Auto</h3>
                        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-4">GPS Fleet Tracking</p>
                        <p className="text-sm text-slate-500 mb-6 flex-grow">Télémétrie avancée pour flottes de véhicules.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default OrbiterPage;