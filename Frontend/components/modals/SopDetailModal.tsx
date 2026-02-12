import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { useSOPs } from '../../hooks/useSupabase';
import { Database } from '../../database.types';
import { FileText, Save, Edit2, X, BookOpen, Lock, Activity, Shield } from 'lucide-react';

interface SopDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    sop: Database['public']['Tables']['sops']['Row'] | null;
}

const SopDetailModal: React.FC<SopDetailModalProps> = ({ isOpen, onClose, sop }) => {
    const { updateSop } = useSOPs();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [department, setDepartment] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (sop) {
            setTitle(sop.title || '');
            setContent(sop.content_markdown || '');
            setDepartment(sop.department || 'General');
            setIsEditing(false); // Reset to view mode on open
        }
    }, [sop, isOpen]);

    const handleSave = async () => {
        if (!sop) return;
        setIsSaving(true);
        const { error } = await updateSop(sop.id, {
            title,
            content_markdown: content,
            department
        });

        if (!error) {
            setIsEditing(false);
        } else {
            console.error('Failed to update SOP:', error);
            // TODO: Add toast notification here
        }
        setIsSaving(false);
    };

    if (!sop) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Procedure' : sop.title}>
            <div className="space-y-6">

                {/* Header Meta */}
                {!isEditing && (
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400">
                        <span>Last Updated: {sop.updated_at ? new Date(sop.updated_at).toLocaleDateString() : 'N/A'}</span>
                        <span>•</span>
                        <span className="bg-stone-50 px-2 py-0.5 rounded border border-stone-100">{sop.department}</span>
                        {sop.locked && <Lock className="w-3 h-3 ml-1" />}
                    </div>
                )}

                {/* Edit Form / View Content */}
                {isEditing ? (
                    <div className="space-y-4 animate-fade-in">
                        {/* Title Input */}
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-lg font-bold text-stone-800 border-b-2 border-emerald-100 focus:border-emerald-500 outline-none py-1 bg-transparent transition-colors"
                            />
                        </div>

                        {/* Department Input */}
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Department</label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none focus:ring-2 focus:ring-emerald-100"
                            >
                                <option value="General">General</option>
                                <option value="Sales">Sales</option>
                                <option value="Operations">Operations</option>
                                <option value="Tech">Tech</option>
                                <option value="Legal">Legal</option>
                            </select>
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Content (Markdown)</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-96 p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono text-stone-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 outline-none resize-none"
                                placeholder="# Procedure Steps..."
                            />
                        </div>
                    </div>
                ) : (
                    <div className="prose prose-stone prose-sm max-w-none animate-fade-in">
                        <div className="whitespace-pre-wrap text-stone-600 leading-relaxed font-sans">
                            {sop.content_markdown || "No content available for this procedure."}
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="pt-6 border-t border-stone-100 flex justify-between items-center">

                    {/* Left: View/Edit Toggle */}
                    <div>
                        {!sop.locked && ( // Only allow editing if not locked
                            isEditing ? (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-xs font-bold text-stone-400 hover:text-stone-600 px-2 py-1"
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                >
                                    <Edit2 className="w-3 h-3" />
                                    Edit Procedure
                                </button>
                            )
                        )}
                    </div>

                    {/* Right: Close/Save */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-stone-500 hover:text-stone-800 transition-colors text-sm font-medium"
                        >
                            Close
                        </button>

                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        ) : (
                            <button
                                onClick={onClose} // Typically "Mark as Read" logic goes here
                                className="flex items-center gap-2 bg-stone-100 text-stone-600 px-5 py-2 rounded-xl text-sm font-medium hover:bg-stone-200 border border-stone-200 transition-all"
                            >
                                <BookOpen className="w-4 h-4" />
                                Done
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SopDetailModal;
