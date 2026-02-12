import React, { useState } from 'react';
import { useLeads } from '../../hooks/useSupabase';
import { ViewProps } from '../../types';
import { MoreHorizontal, Plus, Loader } from 'lucide-react';
import { Database } from '../../database.types';

type LeadRow = Database['public']['Tables']['leads']['Row'];

const CreateLeadForm = ({
    onCreate,
    onClose,
    onShowToast
}: {
    onCreate: (lead: any) => Promise<any>,
    onClose: () => void,
    onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void
}) => {
    const [company, setCompany] = useState('');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!company) return;

        setLoading(true);
        const { error } = await onCreate({
            name: company,
            estimated_value: parseFloat(value) || 0,
            status: 'Lead',
            probability: 20
        });
        setLoading(false);

        if (error) {
            console.error(error);
            onShowToast("Failed to create lead", "warning");
        } else {
            onShowToast("✨ New lead planted in the pipeline!", "success");
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Prospect Name</label>
                <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full p-2.5 rounded-lg border border-stone-200 focus:border-emerald-500 outline-none"
                    autoFocus
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Estimated Value (€)</label>
                <input
                    type="number"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="0"
                    className="w-full p-2.5 rounded-lg border border-stone-200 focus:border-emerald-500 outline-none"
                />
            </div>
            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading || !company}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {loading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
                    Add Lead
                </button>
            </div>
        </form>
    );
};

const Column = ({ title, status, leads, color }: { title: string, status: string, leads: LeadRow[], color: string }) => {
    const columnLeads = leads.filter(l => l.status === status);

    return (
        <div className="flex-1 bg-white/50 rounded-2xl border border-stone-200 flex flex-col h-[calc(100vh-12rem)] backdrop-blur-sm">
            <div className={`p-4 border-b border-stone-200 flex justify-between items-center rounded-t-2xl ${color}`}>
                <h3 className="font-bold text-sm tracking-wide text-stone-800">{title}</h3>
                <span className="text-xs bg-white px-2 py-0.5 rounded-lg text-stone-500 font-mono shadow-sm">{columnLeads.length}</span>
            </div>
            <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {columnLeads.map(lead => (
                    <div key={lead.id} className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-stone-800 text-sm font-serif">{lead.name || 'Untitled Lead'}</h4>
                            <button className="text-stone-400 hover:text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-xs text-stone-500">Prob. {lead.probability}%</span>
                            <span className="text-sm font-bold text-emerald-700 font-mono">
                                €{(lead.estimated_value || 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}

                {columnLeads.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-stone-200 rounded-xl text-stone-400 text-sm">
                        Empty
                    </div>
                )}
            </div>
        </div>
    );
}

const Growth: React.FC<ViewProps> = ({ onOpenModal, onShowToast, onCloseModal }) => {
    const { leads, loading, createLead } = useLeads();

    const totalPipeline = leads.reduce((acc, curr) => acc + (curr.estimated_value || 0), 0);

    const handleNewLead = () => {
        onOpenModal("Create New Lead", (
            <CreateLeadForm
                onCreate={createLead}
                onClose={onCloseModal}
                onShowToast={onShowToast}
            />
        ));
    };

    if (loading) {
        return <div className="p-8 text-center text-stone-500 animate-pulse">Loading pipeline...</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-emerald-950 font-serif">Growth Pipeline</h1>
                    <p className="text-stone-500 mt-1">Manage inbound and outbound opportunities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-sm">
                        <span className="text-sm text-stone-500 mr-2">Total Pipeline:</span>
                        <span className="text-lg font-bold text-emerald-700">€{totalPipeline.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={handleNewLead}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
                    >
                        <Plus className="w-4 h-4" />
                        New Lead
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
                <Column
                    title="Leads (Inbound)"
                    status="cold"
                    leads={leads}
                    color="bg-stone-50"
                />
                <Column
                    title="In Discussion"
                    status="warm"
                    leads={leads}
                    color="bg-amber-50"
                />
                <Column
                    title="Won (Signed)"
                    status="won"
                    leads={leads}
                    color="bg-emerald-50"
                />
            </div>
        </div>
    );
};

export default Growth;