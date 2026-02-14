import React from 'react';
import { PRICING_TIERS } from '../constants';

const PricingSection: React.FC = () => {
  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark/30" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Investment Tiers</h2>
          <p className="text-slate-500 dark:text-slate-400">Choose the level of operational integration that fits your scale.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.name}
              className={`bg-white dark:bg-background-dark rounded-2xl p-8 shadow-sm relative
                ${tier.highlight 
                  ? 'border-2 border-primary shadow-xl scale-100 lg:scale-105 z-10' 
                  : 'border border-slate-200 dark:border-slate-700'}`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{tier.description}</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</span>
                {tier.period && <span className="text-slate-500 dark:text-slate-400 ml-2">{tier.period}</span>}
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                    <span className={`material-icons text-sm mr-2 mt-0.5 ${tier.highlight ? 'text-primary' : 'text-green-500'}`}>check</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors shadow-sm
                  ${tier.buttonStyle === 'primary' 
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20' 
                    : 'border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;