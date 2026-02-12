import React, { useState, useEffect } from 'react';
import { Database } from '../../database.types';
import { X, Mail, Phone, Globe, Calendar, DollarSign, Award, Clock } from 'lucide-react';
import { useInvoices, useClients } from '../../hooks/useSupabase';
import CreateInvoiceModal from '../modals/CreateInvoiceModal';
import ClientModal from '../modals/ClientModal';

interface ClientDetailProps {
    client: Database['public']['Tables']['clients']['Row'];
    onClose: () => void;
    onUpdate?: () => void;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ client: initialClient, onClose, onUpdate }) => {
    const { getInvoicesByClient } = useInvoices();
    const { updateClient, getClient } = useClients();

    // Local state to handle updates immediately within this view
    const [client, setClient] = useState(initialClient);
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loadingInvoices, setLoadingInvoices] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        setClient(initialClient);
    }, [initialClient]);

    useEffect(() => {
        if (client?.id) {
            loadInvoices();
        }
    }, [client?.id]);

    const loadInvoices = async () => {
        setLoadingInvoices(true);
        const { invoices } = await getInvoicesByClient(client.id);
        if (invoices) setInvoices(invoices);
        setLoadingInvoices(false);
    };

    const handleArchive = async () => {
        if (window.confirm('Are you sure you want to archive this partner? They will be moved to the Archived list.')) {
            const { data, error } = await updateClient(client.id, { status: 'archived' });
            if (!error && data) {
                setClient(prev => ({ ...prev, status: 'archived' }));
                onUpdate?.();
                onClose();
            }
        }
    };

    const refreshClient = async () => {
        const { client: updatedClient } = await getClient(client.id);
        if (updatedClient) {
            setClient(updatedClient);
            onUpdate?.();
        }
    };

    if (!client) return null;

    const initials = client.name ? client.name.substring(0, 2).toUpperCase() : '??';
    const status = client.status ? client.status.toUpperCase() : 'UNKNOWN';
    const tier = client.tier || 'Standard';

    return (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
            <div className="w-full max-w-2xl bg-white h-full shadow-2xl p-8 overflow-y-auto animate-slide-in-right">

                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Partner Details</span>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Profile Header */}
                <div className="flex items-start gap-6 mb-10">
                    <div className="w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl font-bold text-emerald-900 shadow-inner">
                        {client.logo_symbol || initials}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-stone-800 font-serif mb-2">{client.name || 'Unnamed Client'}</h1>
                        <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${client.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                client.status === 'onboarding' ? 'bg-cyan-100 text-cyan-800 border-cyan-200' :
                                    'bg-amber-100 text-amber-800 border-amber-200'
                                }`}>
                                {status}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200 flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {tier}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                        <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">
                            <DollarSign className="w-4 h-4" /> Total Revenue
                        </div>
                        <div className="text-2xl font-bold text-stone-800">
                            ${client.total_revenue?.toLocaleString() || '0'}
                        </div>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                        <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">
                            <Clock className="w-4 h-4" /> Last Interaction
                        </div>
                        <div className="text-xl font-medium text-stone-800">
                            {client.last_interaction ? new Date(client.last_interaction).toLocaleDateString() : 'Never'}
                        </div>
                    </div>
                </div>

                {/* Tabs / Sections */}
                <div className="space-y-8">

                    {/* Contact Info */}
                    <section>
                        <h3 className="text-lg font-bold text-emerald-950 font-serif mb-4 flex items-center gap-2">
                            Contact Information
                        </h3>
                        <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 font-bold uppercase">Email</p>
                                    <p className="text-stone-800 font-medium">{client.email || 'No email provided'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 font-bold uppercase">Phone</p>
                                    <p className="text-stone-800 font-medium">{client.phone || '—'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 font-bold uppercase">Website</p>
                                    <p className="text-stone-800 font-medium">{client.website || '—'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Invoices Section */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-emerald-950 font-serif flex items-center gap-2">
                                Billing & Invoices
                            </h3>
                            <button
                                onClick={() => setIsInvoiceModalOpen(true)}
                                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors"
                            >
                                + Create Invoice
                            </button>
                        </div>

                        <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm space-y-4">
                            {loadingInvoices ? (
                                <div className="text-center py-4 text-stone-400">Loading invoices...</div>
                            ) : invoices.length === 0 ? (
                                <div className="text-center py-8 text-stone-400 italic bg-stone-50 rounded-xl border border-dashed border-stone-200">
                                    No invoices found for this client.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {invoices.map(inv => (
                                        <div key={inv.id} className="flex justify-between items-center p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-100">
                                            <div>
                                                <p className="font-bold text-stone-800">${inv.amount.toLocaleString()}</p>
                                                <p className="text-xs text-stone-400">{inv.issued_at ? new Date(inv.issued_at).toLocaleDateString() : 'No Date'}</p>
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                                inv.status === 'sent' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                    'bg-stone-100 text-stone-600 border-stone-200'
                                                }`}>
                                                {inv.status ? inv.status.toUpperCase() : 'DRAFT'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                </div>

                {/* Footer Actions */}
                <div className="mt-12 flex gap-4">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-emerald-200 shadow-lg"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handleArchive}
                        className="flex-1 bg-stone-100 text-stone-600 py-3 rounded-xl font-bold hover:bg-stone-200 transition-colors"
                    >
                        Archive Partner
                    </button>
                </div>

                {/* Modals */}
                <CreateInvoiceModal
                    isOpen={isInvoiceModalOpen}
                    onClose={() => {
                        setIsInvoiceModalOpen(false);
                        loadInvoices();
                    }}
                    client={client}
                />

                <ClientModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        refreshClient();
                    }}
                    client={client}
                />
            </div>
        </div>
    );
};

export default ClientDetail;
