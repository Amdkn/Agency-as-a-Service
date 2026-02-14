import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-bold text-xs">A</div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">AaaS</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
              Empowering agencies with autonomous operating systems for the next decade of digital growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-icons text-xl">camera_alt</span></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-icons text-xl">alternate_email</span></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-icons text-xl">work</span></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">The Method</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Foundation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2023 AaaS Holdings Inc. All rights reserved.
          </p>
          <div className="font-mono text-xs text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded border border-slate-100 dark:border-slate-800">
            Powered by A'Space OS Kernel v1.0
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;