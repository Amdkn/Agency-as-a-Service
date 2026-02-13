import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { useClients } from '../../hooks/useSupabase';
import { Database } from '../../database.types';
import { supabase } from '../../lib/supabase';
import { User, Mail, Phone, Globe, Briefcase, Activity, Save } from 'lucide-react';

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    client?: Database['public']['Tables']['clients']['Row'] | null;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, client }) => {
    const { createClient, updateClient } = useClients();
    const [name, setName] = useState('');
    const [contactName, setContactName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [tier, setTier] = useState('Standard');
    const [status, setStatus] = useState('active');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (client) {
            setName(client.name || '');
            setContactName(client.contact_name || '');
            setEmail(client.email || '');
            setPhone(client.phone || '');
            setWebsite(client.website || '');
            setTier(client.tier || 'Standard');
            setStatus(client.status || 'active');
        } else {
            // Reset for create mode
            setName('');
            setContactName('');
            setEmail('');
            setPhone('');
            setWebsite('');
            setTier('Standard');
            setStatus('active');
        }
    }, [client, isOpen]);

    const handleSave = async () => {
        if (!name.trim()) return;
        setIsSaving(true);

        try {
            let tenantId = client?.tenant_id;

            if (!tenantId) {
                // Fetch current user's tenant_id for new client
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('tenant_id')
                        .eq('id', user.id)
                        .single();
                    tenantId = profile?.tenant_id;
                }
            }

            if (!tenantId) {
                console.error("Could not resolve tenant_id");
                // In a real app we might show an error or fallback
                // For now, if we fail to get tenant_id, we can't create
                setIsSaving(false);
                return;
            }

            const clientData = {
                name,
                contact_name: contactName,
                email,
                phone,
                website,
                tier,
                status
            };

            let result;
            if (client) {
                result = await updateClient(client.id, clientData);
            } else {
                result = await createClient({
                    ...clientData,
                    tenant_id: tenantId
                });
            }

            if (!result.error) {
                onClose();
            } else {
                console.error('Failed to save client:', result.error);
            }
        } catch (err) {
            console.error("Unexpected error saving client:", err);
        }
        setIsSaving(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={client ? 'Edit Partner Profile' : 'Add New Partner'}
        >
            <div className="space-y-6">
                {/* Core Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Company Name</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                                placeholder="e.g. Acme Corp"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Status</label>
                            <div className="relative">
                                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all appearance-none bg-white"
                                >
                                    <option value="active">Active</option>
                                    <option value="onboarding">Onboarding</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Tier</label>
                            <select
                                value={tier}
                                onChange={(e) => setTier(e.target.value)}
                                className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all appearance-none bg-white font-medium"
                            >
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                                <option value="VIP">VIP</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                    <h4 className="text-sm font-bold text-emerald-950 font-serif">Contact Details</h4>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Point of Contact</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                                placeholder="e.g. John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                                placeholder="john@acme.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="+1 234..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Website</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <input
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="acme.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !name}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save Partner'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ClientModal;
