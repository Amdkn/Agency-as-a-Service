import React, { useState } from 'react';
import { useSOPs } from '../../hooks/useSupabase';
import { Lock, FileText, UserPlus, Target, Terminal, LogOut, ShieldAlert, Search, BookOpen } from 'lucide-react';
import { ViewProps } from '../../types';
import SopDetailModal from '../modals/SopDetailModal';

const IconMap: Record<string, any> = {
    UserPlus, Target, FileText, Terminal, LogOut, ShieldAlert
};

const SopLibrary: React.FC<ViewProps> = ({ onOpenModal, onShowToast }) => {
    const { sops, loading } = useSOPs();
    const [selectedSop, setSelectedSop] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenSop = (sop: any) => {
        setSelectedSop(sop);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSop(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-stone-400 animate-pulse font-serif">Loading library...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-emerald-950 font-serif">SOP Library</h1>
                    <p className="text-stone-500 mt-1">Standard Operating Procedures. The "Brain" of your agency.</p>
                </div>
                <div className="relative group">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search procedures..."
                        className="bg-white border border-stone-200 rounded-full pl-9 pr-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 w-64 shadow-sm transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sops.map((sop) => {
                    const Icon = IconMap[sop.icon_name] || FileText;
                    return (
                        <div key={sop.id} className="group relative bg-white border border-stone-100 rounded-3xl p-6 hover:border-emerald-100 transition-all hover:shadow-soft hover:-translate-y-1">
                            {/* Lock Badge */}
                            <div className="absolute top-5 right-5 text-stone-300">
                                {sop.locked && <Lock className="w-4 h-4" />}
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center mb-4 border border-stone-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                                <Icon className="w-6 h-6 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                            </div>

                            <h3 className="text-lg font-bold text-stone-800 mb-2 font-serif">{sop.title}</h3>

                            <div className="flex items-center space-x-2 mb-6">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded-lg border border-stone-100">
                                    {sop.department}
                                </span>
                            </div>

                            <button
                                onClick={() => handleOpenSop(sop)}
                                className="w-full py-2.5 rounded-xl border border-stone-200 text-sm font-bold text-stone-500 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all flex items-center justify-center"
                            >
                                Read Procedure
                            </button>
                        </div>
                    )
                })}
            </div>

            <SopDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                sop={selectedSop}
            />
        </div>
    );
};

export default SopLibrary;