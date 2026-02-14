import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Decorative background blurs */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-solaris/10 rounded-full blur-3xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to automate your agency?</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
            Join the operational revolution. Stop managing people, start managing systems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
              Start Free Audit
            </button>
            <button className="px-8 py-3 bg-transparent border border-slate-600 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;