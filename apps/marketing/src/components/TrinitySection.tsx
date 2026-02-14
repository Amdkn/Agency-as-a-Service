import React from 'react';
import { PILLARS } from '../constants';
import { PageType } from '../types';

interface TrinitySectionProps {
  onChangePage: (page: PageType) => void;
}

const TrinitySection: React.FC<TrinitySectionProps> = ({ onChangePage }) => {
  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark/50" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Trinity Architecture</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Our proprietary Operating System is built on three interconnected pillars designed to cover the entire spectrum of business automation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <div 
              key={pillar.id}
              className={`group relative bg-white dark:bg-background-dark rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent ${pillar.borderClass}`}
            >
              <div className={`w-14 h-14 rounded-xl ${pillar.bgClass} flex items-center justify-center ${pillar.color} mb-6 group-hover:scale-110 transition-transform`}>
                <span className="material-icons text-3xl">{pillar.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{pillar.name}</h3>
              <p className={`text-sm font-semibold ${pillar.color} mb-4 uppercase tracking-wide`}>{pillar.subtitle}</p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {pillar.description}
              </p>
              <button 
                onClick={() => {
                  onChangePage(pillar.id as PageType);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`inline-flex items-center text-sm font-medium text-slate-900 dark:text-white hover:${pillar.color} transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none`}
              >
                Learn more <span className="material-icons text-sm ml-1">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrinitySection;