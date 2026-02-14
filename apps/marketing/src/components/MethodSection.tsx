import React from 'react';
import { METHOD_STEPS } from '../constants';

const MethodSection: React.FC = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden" id="method">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{backgroundImage: 'radial-gradient(#195de6 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">The Method</h2>
          <p className="text-slate-500 dark:text-slate-400">From chaos to clarity in 5 structured steps.</p>
        </div>
        
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {METHOD_STEPS.map((step) => (
              <div key={step.number} className="relative pt-0 md:pt-16 md:text-center group">
                <div 
                  className={`md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 bg-white dark:bg-background-dark border-2 rounded-full flex items-center justify-center z-10 transition-all mb-4 md:mb-0
                  ${step.active 
                    ? 'border-primary shadow-glow' 
                    : 'border-slate-200 dark:border-slate-700 group-hover:border-primary'}`}
                >
                  <span className={`font-bold transition-colors ${step.active ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>
                    {step.number}
                  </span>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${step.active ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;