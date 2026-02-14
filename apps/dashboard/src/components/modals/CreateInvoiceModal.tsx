import React, { useState } from 'react';
import Modal from '../Modal';
import { useInvoices, useProfile } from '../../hooks/useSupabase';
import { Database } from '../../database.types';
import { DollarSign, Calendar, FileText, Loader2 } from 'lucide-react';

interface CreateInvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    client: Database['public']['Tables']['clients']['Row'];
}

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, onClose, client }) => {
    const { createInvoice } = useInvoices();
    const { profile } = useProfile();

    const [amount, setAmount] = useState<number>(0);
    const [status, setStatus] = useState<'draft' | 'paid'>('draft');
    const [issuedAt, setIssuedAt] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!profile?.tenant_id) {
            setError("System Error: Tenant ID not found. Please refresh.");
            return;
        }

        setIsSubmitting(true);

        const newInvoice: Database['public']['Tables']['invoices']['Insert'] = {
            client_id: client.id,
            tenant_id: profile.tenant_id,
            amount: amount,
            status: status,
            issued_at: new Date(issuedAt).toISOString(),
        };

        const { error: submitError } = await createInvoice(newInvoice);

        if (submitError) {
            console.error(submitError);
            setError("Failed to create invoice. Please try again.");
        } else {
            onClose();
            // Reset form
            setAmount(0);
            setStatus('draft');
            setIssuedAt(new Date().toISOString().split('T')[0]);
        }

        setIsSubmitting(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`New Invoice for ${client.name}`}>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Amount Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-600 block">Amount (USD)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-stone-400" />
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-stone-800 font-medium"
                            required
                        />
                    </div>
                </div>

                {/* Status Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-600 block">Status</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-2.5 w-5 h-5 text-stone-400" />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'draft' | 'paid')}
                            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-stone-800 font-medium appearance-none"
                        >
                            <option value="draft">Draft</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>

                {/* Issued Date */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-600 block">Issued Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-stone-400" />
                        <input
                            type="date"
                            value={issuedAt}
                            onChange={(e) => setIssuedAt(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-stone-800 font-medium"
                            required
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-stone-500 hover:bg-stone-100 rounded-xl font-medium transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || !amount}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSubmitting ? 'Creating...' : 'Create Invoice'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateInvoiceModal;
