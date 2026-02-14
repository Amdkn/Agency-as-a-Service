import React from 'react';

const SolarisPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-background-dark min-h-screen">
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-solaris/5 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-solaris-accent/10 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Creative OS v2.4 Live
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8">
              Domptez le <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solaris to-solaris-accent">Chaos Créatif</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              Pour les Agences qui vendent de l'image, pas du temps.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-solaris rounded-xl hover:bg-orange-700 transition-all shadow-glow hover:shadow-lg hover:-translate-y-0.5">
                Démarrer Solaris
                <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
          
          {/* Visual Component: Kanban */}
          <div className="relative w-full max-w-6xl mx-auto mt-8">
            <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-solaris">view_kanban</span>
                  Production Pipeline
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClSHkUbTzvL8qf9L43U5JEnGru1-CxdEVk8vq078ZvZuWRlriwVx2kbxESgVdJWl86pTOPanHRYg3AhGeBrQdPbwTVG7nO5PezDFi6Iyg3HBZzB-h3EWaJV4GDyUT_pHn0g3DEBf6z7QtwJd4euJtYIzszazBqoRga1ZkxCdfMqcbA-GTqh0schEx49qCa3Vyt-U-n5_-omhsY6VftGiBIIP2vXEz8Qfvdoi6Xh4GL1dzH-MBcdNNmMfvqj0RPEexW7VfqzOKB3Hc"/>
                    <img alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpQ34JLzIPh09NlFSHnsODaDG3xU-xwRrsL9o-w_rmSE4SIRlGNWcFHdS_7Bh3K00sxNyadunGiGtn9FLPQKXQ8lh3obq6BeB75SP8HsgAINRKRRf847OKvl1lpq6J6Vg4PdB-HAKiheuP36_on1ch7JAaNn86EnBho3cwGzo1okjFSdDvcg4fWOO9CkAruwp8FDc0xNPO7K5NAG-uFLvCtUiC7CNJc4JKerm2xT2KDziUALLq3OsbJGopkug70ywVfylDEGWbSZM"/>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-500 font-medium">+4</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4 no-scrollbar">
                {/* Column 1 */}
                <div className="min-w-[280px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Concept Phase</span>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full">3</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
                      <div className="h-32 rounded-lg bg-gray-100 mb-3 overflow-hidden relative">
                        <img alt="Moodboard" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHgshlsUEhZxTxyIVDGIkg_Ptp3okU3loPnW_PKVg5mK9nwuuFRNbfW-oMLLtpXAYg368UlaqZlpW4EqUCUl40HK6EPIMZTPJzue2aomI45Qh2JHNJpfxuJn6kDhDNL32FYzhRVpLfloSo0VFQ6qmDyYem1XRetSwORwpWP-8U5Tpn2xWSJmN21rN-ZXG6Bc_vz8-q0ErEMAlVTQPsRN8WZsGIjWoblvL20tjg4oKIDhQnpTOrQHU5BTdkUFFsYNT5fxgjm0RA7RQ"/>
                        <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/50 px-2 py-1 rounded text-[10px] font-bold uppercase backdrop-blur-sm">Branding</div>
                      </div>
                      <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-1">Neo-Tokyo Moodboard</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-xs text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> 2d left
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Column 2 */}
                <div className="min-w-[280px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Production</span>
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-2 py-0.5 rounded-full">2</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-l-4 border-l-solaris border-y-slate-100 border-r-slate-100 dark:border-y-slate-700 dark:border-r-slate-700 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
                      <div className="h-40 rounded-lg bg-gray-100 mb-3 overflow-hidden relative group">
                        <img alt="Tech" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj_XO7sJjJ5idrIavaSXuPsK3YfvVaTo91psF5wTXD-w5j2naXzCSXSmT0fu1ufk4D0CEGmvNmJRH-jNvHaGRKR7sdJnUsesUkr4mOIObdJ3BoXHxu6LHHReY0fBgLZiYe2ZS0Xfv8peunIYdbvjFO3LCFZ2nCz_TbQQCYaALpUnHP3o7oyvGYZTthJ0S8_MiXBocFswcA-KB1VgNi1dWCjHx-WLNAg5IcVZuLVyxaGMejIiGBlduowDqx39_V585QUgRXWO_-2GM"/>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-white text-3xl">play_circle</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-1">Product Launch Teaser 4K</h4>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-400">Rendering...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="min-w-[280px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Review</span>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">1</span>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-y-[-4px]">
                            <div className="h-24 rounded-lg bg-gray-100 mb-3 overflow-hidden relative">
                                <img alt="Review" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV1_0l6mXxyAj3gtTzMlOl0MtPgF8YdFQXxrHgfHRHTQjT2dhX2bglTNakjN18sYSaQb5og4nJ9EiDkHE925P1mPgRSgkI93mljTIl8PgZFYATt2X7EHzgS4_1obCL9D8W6VeZQcvA55s2Mou8Hk6-AEdhyUTfAs03FzGPcvWbo8nu2WXIn-mlm14Q66oRtNltc2154FEGOUMJtN8pVApUc_K7_yWwL8-Bs-zWYvUL1gadKTc1InIK-Rsfuq_zH7KQxXARjOCyDuc"/>
                                <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
                                    <span className="material-symbols-outlined text-[14px] block">check</span>
                                </div>
                            </div>
                            <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-1">Annual Report v2</h4>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-light dark:bg-surface-dark" id="sectors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">L'OS pour chaque verticale créative</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Solaris s'adapte à votre modèle d'agence pour fluidifier les opérations spécifiques à votre métier.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Agency */}
                <div className="group relative bg-white dark:bg-background-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-80 flex flex-col justify-end p-8 border border-slate-100 dark:border-slate-800">
                    <div className="absolute inset-0">
                        <img alt="Agency" className="w-full h-full object-cover opacity-20 group-hover:opacity-10 transition-opacity duration-700 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7MhTXzimJSbo6MXdkGghL7mks1td5IZ4vl3GkXlthGQjxcHyl62j_gZ-FVJzargxIxGU-qH61zmyX7BNsq3JSOmSMY3tdTr1q9zou_Zy05_tfnVyssxe2MRPVY32ovGwGr56vlDRKxSweF_jej9MMLQlTIGIMCCMRGXHbEh9XhpHlS0BS5WdYC-N1nsZOrdMoOO9xSo4Rc4atroccKHFST0cDbTGtAiac7sYSy3XvRZpiZBdsbGPgVduo19vJ4ni-BWNfCD3RI6k"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background-dark dark:via-background-dark/80"></div>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-solaris/10 rounded-lg flex items-center justify-center text-solaris mb-4">
                            <span className="material-symbols-outlined">design_services</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Solaris Agency</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Branding & UX Design</p>
                    </div>
                </div>

                {/* Media */}
                <div className="group relative bg-white dark:bg-background-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-80 flex flex-col justify-end p-8 border border-slate-100 dark:border-slate-800">
                    <div className="absolute inset-0">
                        <img alt="Media" className="w-full h-full object-cover opacity-20 group-hover:opacity-10 transition-opacity duration-700 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbCPsoDDQNdHsOj7NKWasKD8KyYoxDUZe8Ux-rJedJAbw02ihI1lKvKRaakfNRBDtDokcXnb8A5AdtqOOow2-5-CX4SCdhFWdNLCuWYbC07h2F20qIJxuxnQJULo24d5I7JPKlJVHDl1qNs7G067QHyhkFBldeSEP_n83BRGAkqwhk5KBQQ4tBGKw1hVPCXhkSJP1y0JovnJ8ekC3vfRdjVlID6P5geJD_W0ALrIAI1IJ5fcOmT1r_CeGUREYfHY_Gj1rRHAgrEhg"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background-dark dark:via-background-dark/80"></div>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-solaris-accent/10 rounded-lg flex items-center justify-center text-yellow-600 dark:text-solaris-accent mb-4">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Solaris Media</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Ads & Growth</p>
                    </div>
                </div>

                {/* Studio */}
                <div className="group relative bg-white dark:bg-background-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-80 flex flex-col justify-end p-8 border border-slate-100 dark:border-slate-800">
                    <div className="absolute inset-0">
                        <img alt="Studio" className="w-full h-full object-cover opacity-20 group-hover:opacity-10 transition-opacity duration-700 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7ItAkJ0I5zPQMGI5krSgS3Uc3lzfC_5NnmqhJiyJrph6-oA_aPPQ_zwRFRmstCuscibyA55vlGJuOYu-0PKpJnmxAigWIchri9bF20lnHd_BoqbE-dU5x2NxUWfHYIqvfBqs_0ziBhdzmaoxfR1tEHulCknYJLexOlSGOmqZwyBz3tqyHJpE7oXomwfTGDNJwvfecBtJewBX8UuSgzUE47wxFrH5L12pcQnN4ESXJpthqPLKvpkh4g1NzhvqREmX6DvohNYbZcYM"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background-dark dark:via-background-dark/80"></div>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-solaris/10 rounded-lg flex items-center justify-center text-solaris mb-4">
                            <span className="material-symbols-outlined">video_camera_back</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Solaris Studio</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Production & UGC</p>
                    </div>
                </div>

                {/* Event */}
                <div className="group relative bg-white dark:bg-background-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-80 flex flex-col justify-end p-8 border border-slate-100 dark:border-slate-800">
                    <div className="absolute inset-0">
                        <img alt="Event" className="w-full h-full object-cover opacity-20 group-hover:opacity-10 transition-opacity duration-700 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE9gQKIZszS6Y5FPCQ4W1Yi3u_E7594gY58I_B1ZAIDXIpslNHrqxPQyX5orB13QR6AyOOwnWcVRURkfErx2tJNac42aXclkSP0cMqvsDlAMrbjhA_0YBbXnQaK5wtNaMFztMzMv98ic3dt4dRT0xdPrgYvK1Tani0kMftLTnd4xD3_tPxNF7oKejJzgyP5eHYbLd7X5c1sz5dXnxY6CYt8U74xZU08arzPwItV6FB86YQ1Pha9BicToV6vKgesl409TbLd9fPU3o"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background-dark dark:via-background-dark/80"></div>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-solaris-accent/10 rounded-lg flex items-center justify-center text-yellow-600 dark:text-solaris-accent mb-4">
                            <span className="material-symbols-outlined">festival</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Solaris Event</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Experiential & Live</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-surface-light dark:bg-background-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 dark:bg-surface-dark rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-solaris/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
                <span className="material-symbols-outlined text-solaris text-5xl mb-6 relative z-10">rocket_launch</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Prêt à changer d'échelle ?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                    <button className="px-8 py-4 bg-solaris text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-solaris/25">
                        Démarrer Solaris
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-slate-600 text-white rounded-xl font-medium hover:bg-white/10 transition-colors">
                        Voir la Démo
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default SolarisPage;