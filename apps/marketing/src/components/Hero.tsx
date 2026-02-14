import React from 'react';
import { PageType } from '../types';

interface HeroProps {
  onChangePage: (page: PageType) => void;
}

const Hero: React.FC<HeroProps> = ({ onChangePage }) => {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary mb-6 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              A'Space OS Kernel v1.0 Live
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              L'Excellence <br />
              Opérationnelle. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Pour n'importe quelle Industrie.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-lg font-light leading-relaxed">
              Agency as a Service. The AI-based Operating System for modern business automation. Scalable. Predictable. Autonomous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onChangePage('login')} className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-all shadow-glow hover:-translate-y-1">
                Explore The OS
                <span className="material-icons ml-2 text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Visual Content: Orbiting Circles */}
          <div className="relative flex justify-center items-center h-[500px] lg:h-[600px] animate-float">
            {/* Orbit Rings */}
            <div className="absolute border border-slate-100 dark:border-slate-800 rounded-full w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"></div>
            <div className="absolute border border-slate-200 dark:border-slate-700 rounded-full w-[220px] h-[220px] sm:w-[350px] sm:h-[350px]"></div>

            {/* Center Core */}
            <div className="relative z-10 w-24 h-24 bg-white dark:bg-background-dark rounded-full shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">AaaS</div>
            </div>

            {/* Solaris Planet */}
            <div onClick={() => onChangePage('solaris')} className="absolute top-[10%] left-[10%] sm:left-[20%] z-20 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-soft dark:shadow-none dark:border dark:border-slate-700 flex items-center gap-3 w-48 animate-pulse-slow cursor-pointer hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-solaris/10 flex items-center justify-center text-solaris">
                <span className="material-symbols-outlined">light_mode</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Intelligence</div>
                <div className="font-semibold text-slate-900 dark:text-white">Solaris</div>
              </div>
            </div>

            {/* Nexus Planet */}
            <div onClick={() => onChangePage('nexus')} className="absolute bottom-[20%] right-[0%] sm:right-[10%] z-20 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-soft dark:shadow-none dark:border dark:border-slate-700 flex items-center gap-3 w-48 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-nexus/10 flex items-center justify-center text-nexus">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Logic</div>
                <div className="font-semibold text-slate-900 dark:text-white">Nexus</div>
              </div>
            </div>

            {/* Orbiter Planet */}
            <div onClick={() => onChangePage('orbiter')} className="absolute top-[40%] right-[-10%] sm:right-[-5%] z-20 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-soft dark:shadow-none dark:border dark:border-slate-700 flex items-center gap-3 w-48 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-orbiter/10 flex items-center justify-center text-orbiter">
                <span className="material-symbols-outlined">public</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ops</div>
                <div className="font-semibold text-slate-900 dark:text-white">Orbiter</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;