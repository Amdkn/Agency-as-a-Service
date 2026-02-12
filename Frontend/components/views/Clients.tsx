import React, { useState } from 'react';
import { useClients } from '../../hooks/useSupabase';
import { Search, Filter, MoreVertical, Phone, Mail, Box, Activity, Plus } from 'lucide-react';
import { ViewProps } from '../../types';
import ClientDetail from './ClientDetail';
import ClientModal from '../modals/ClientModal';
import { Database } from '../../database.types';

const Clients: React.FC<ViewProps> = ({ onShowToast }) => {
    const { clients, loading, getClient, refreshClients } = useClients();
    const [selectedClient, setSelectedClient] = useState<Database['public']['Tables']['clients']['Row'] | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Deep Linking: Check URL for client_id on mount
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const clientId = params.get('client_id');
        if (clientId) {
            handleOpenClient(clientId);
        }
    }, []);

    const handleOpenClient = async (clientId: string) => {
        // If we already have the client in the list, use it. Otherwise fetch it.
        // Since 'clients' might not be loaded yet when this runs (race condition with initial fetch), 
        // we'll rely on getClient which behaves independently. 
        // OPTIMIZATION: Check list first if available? For robustness, just fetch or wait.
        // To avoid complex syncing, we'll just fetch single to be safe.
        // Wait, getClient requires the hook to export it. 

        // Actually, we can just fetch it directly using the hook's getClient
        const { client, error } = await getClient(clientId);
        if (client) {
            setSelectedClient(client);
        }
    };

    const handleSelectClient = (client: Database['public']['Tables']['clients']['Row']) => {
        setSelectedClient(client);
        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.set('client_id', client.id);
        window.history.pushState({}, '', url);
    };

    const handleCloseClient = () => {
        setSelectedClient(null);
        // Clear URL
        const url = new URL(window.location.href);
        url.searchParams.delete('client_id');
        window.history.pushState({}, '', url);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-stone-400 animate-pulse font-serif">Loading partners...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in pb-10 relative">

            {selectedClient && (
                <ClientDetail
                    client={selectedClient}
                    onClose={handleCloseClient}
                    onUpdate={refreshClients}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-emerald-950 font-serif">Active Partners</h1>
                    <p className="text-stone-500 mt-1">Manage relationships and project health.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="bg-white border border-stone-200 rounded-full pl-9 pr-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 w-full md:w-64 transition-all shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => onShowToast('🌪 Filtering active clients...', 'info')}
                        className="flex items-center gap-2 bg-white border border-stone-200 text-stone-600 px-3 py-2 rounded-full text-sm hover:text-emerald-700 hover:border-emerald-200 transition-colors shadow-sm"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 ml-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="font-bold text-sm">Create Partner</span>
                    </button>
                </div>
            </div>

            {/* Client Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <div
                        key={client.id}
                        onClick={() => handleSelectClient(client)}
                        className="bg-white border border-stone-100 rounded-3xl p-6 hover:border-emerald-100 transition-all hover:shadow-soft hover:-translate-y-1 group cursor-pointer"
                    >

                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-lg font-bold text-emerald-900 shadow-inner">
                                    {client.logo_symbol || client.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-stone-800 text-lg leading-tight font-serif group-hover:text-emerald-700 transition-colors">{client.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${client.status === 'active' ? 'bg-emerald-500' :
                                            client.status === 'onboarding' ? 'bg-cyan-400 animate-pulse' :
                                                'bg-amber-500'
                                            }`}></span>
                                        <span className="text-xs text-stone-500 font-medium capitalize">{client.status}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-stone-400 hover:text-stone-600 transition-colors">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Health Indicator */}
                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                                    <Activity className="w-3 h-3" /> Project Health
                                </span>
                                <span className={`text-sm font-bold ${client.health_score > 80 ? 'text-emerald-600' :
                                    client.health_score > 50 ? 'text-amber-500' :
                                        'text-red-500'
                                    }`}>{client.health_score}%</span>
                            </div>
                            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${client.health_score > 80 ? 'bg-emerald-500' :
                                        client.health_score > 50 ? 'bg-amber-400' :
                                            'bg-red-500'
                                        }`}
                                    style={{ width: `${client.health_score}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Contact & Meta */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-stone-500">Contact</span>
                                <span className="text-stone-700 font-medium">{client.contact_name}</span>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button className="p-1.5 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-emerald-600 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-emerald-600 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-100 text-xs font-bold text-stone-500">
                                <Box className="w-3 h-3 text-stone-400" />
                                {client.tier}
                            </span>
                            <span
                                className="text-sm font-bold text-emerald-700 hover:text-emerald-500 transition-colors"
                            >
                                Manage
                            </span>
                        </div>

                    </div>
                ))}
            </div>
            {/* Modal */}
            <ClientModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    refreshClients();
                }}
            />
        </div>
    );
};

export default Clients;