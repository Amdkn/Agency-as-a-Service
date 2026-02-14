import React, { useState } from 'react';
import { useTasks, useSOPs } from '../../hooks/useSupabase';
import { supabase } from '../../lib/supabase';
import { Check, Calendar, ExternalLink, Filter } from 'lucide-react';
import { ViewProps } from '../../types';

const Tasks: React.FC<ViewProps> = ({ onShowToast }) => {
    const { tasks, loading, refreshTasks } = useTasks();
    const { sops } = useSOPs(); // Fetch SOPs for the dropdown
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [selectedSopId, setSelectedSopId] = useState<string>('');
    const [isCreating, setIsCreating] = useState(false);

    const toggleTask = async (id: string, currentStatus: string | null) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

        // Optimistic update could be done here, but for now we'll wait for Supabase
        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            onShowToast("❌ Failed to update task", "error");
        } else {
            if (newStatus === 'completed') onShowToast("✅ Task completed!", "success");
            refreshTasks();
        }
    };

    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) return;

        setIsCreating(true);
        // Get current tenant_id from existing tasks or context would be better, 
        // but typically RLS handles tenant assignment if default or trigger is set.
        // However, our schema says tenant_id is NOT NULL. 
        // We rely on the backend trigger or handle it here if we had the tenant_id.
        // For now, let's assume the backend/RLS handles it or we fetch it.
        // Actually, 'tasks' table requires tenant_id. Supabase client might not auto-inject it 
        // unless we have a robust RLS/Trigger setup.
        // Let's try inserting without it if there's a default, otherwise we need to fetch user's tenant.
        // The schema had: tenant_id uuid references public.tenants not null.

        // We need to fetch the current user's tenant_id.
        // Ideally pass it from a context. For now, let's fetch it or let the database handle it if set up.
        // Based on the schema provided earlier: "id uuid references auth.users not null primary key" for profiles.
        // And profiles has tenant_id.

        // Let's do a quick fetch of the user profile to get tenant_id if we don't have it.
        // OR better, assuming the user is logged in, we can select it.

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch profile to get tenant_id
        const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('id', user.id).single();

        if (!profile) {
            onShowToast("❌ Error: Profile not found", "error");
            setIsCreating(false);
            return;
        }

        const { error } = await supabase.from('tasks').insert({
            title: newTaskTitle,
            tenant_id: profile.tenant_id,
            status: 'todo',
            due_date: new Date().toISOString(),
            sop_id: selectedSopId || null, // Link the SOP
        });

        if (error) {
            console.error(error);
            onShowToast("❌ Failed to create task", "error");
        } else {
            onShowToast("✨ Task created!", "success");
            setNewTaskTitle('');
            setSelectedSopId(''); // Reset selection
            refreshTasks();
        }
        setIsCreating(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCreateTask();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-stone-400 animate-pulse font-serif">Loading tasks...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-emerald-950 font-serif">My Day</h1>
                    <p className="text-stone-500 mt-1">Focus on execution. No noise.</p>
                </div>
                <button className="flex items-center space-x-2 text-sm text-stone-500 hover:text-emerald-700 bg-white border border-stone-200 hover:border-emerald-200 px-4 py-2 rounded-full shadow-sm transition-all">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Quick Add Section */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new task..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-stone-800 placeholder-stone-400"
                />

                {/* SOP Selector */}
                <select
                    value={selectedSopId}
                    onChange={(e) => setSelectedSopId(e.target.value)}
                    className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 text-stone-600 focus:ring-emerald-500 focus:border-emerald-500 max-w-[150px]"
                >
                    <option value="">No Procedure</option>
                    {sops.map(sop => (
                        <option key={sop.id} value={sop.id}>{sop.title}</option>
                    ))}
                </select>

                <button
                    onClick={handleCreateTask}
                    disabled={isCreating || !newTaskTitle.trim()}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                >
                    {isCreating ? 'Adding...' : '+ Add'}
                </button>
            </div>

            <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-soft">
                {/* List Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-stone-100 bg-stone-50 text-xs font-bold text-stone-400 uppercase tracking-wider">
                    <div className="col-span-1 text-center">Done</div>
                    <div className="col-span-5">Task Name</div>
                    <div className="col-span-3">Linked SOP</div>
                    <div className="col-span-3 text-right">Action</div>
                </div>

                {/* List Body */}
                <div className="divide-y divide-stone-50">
                    {tasks.map((task) => {
                        const isCompleted = task.status === 'completed';
                        const dueDate = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date';
                        const isToday = task.due_date && new Date(task.due_date).toDateString() === new Date().toDateString();

                        return (
                            <div key={task.id} className={`grid grid-cols-12 gap-4 p-4 items-center group transition-colors ${isCompleted ? 'bg-stone-50/50' : 'hover:bg-emerald-50/30'}`}>

                                {/* Checkbox */}
                                <div className="col-span-1 flex justify-center">
                                    <button
                                        onClick={() => toggleTask(task.id, task.status)}
                                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isCompleted
                                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                            : 'border-stone-300 hover:border-emerald-400 bg-white'
                                            }`}
                                    >
                                        {isCompleted && <Check className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* Task Name */}
                                <div className="col-span-5">
                                    <p className={`text-sm font-medium ${isCompleted ? 'text-stone-400 line-through decoration-stone-300' : 'text-stone-800'}`}>
                                        {task.title}
                                    </p>
                                    <div className="flex items-center mt-1 text-xs text-stone-500">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        <span className={isToday ? "text-amber-600 font-bold" : ""}>
                                            {isToday ? "Today" : dueDate}
                                        </span>
                                    </div>
                                </div>

                                {/* Linked SOP */}
                                <div className="col-span-3">
                                    {task.sops ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            {task.sops.title}
                                        </span>
                                    ) : (
                                        <span className="text-xs text-stone-400 italic">No procedure</span>
                                    )}
                                </div>

                                {/* Project */}
                                <div className="col-span-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                                        {task.projects?.name || 'General'}
                                    </span>
                                </div>

                                {/* Action */}
                                <div className="col-span-3 flex justify-end">
                                    {task.sop_id ? (
                                        <button className="flex items-center px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors">
                                            <ExternalLink className="w-3 h-3 mr-1.5" />
                                            Open SOP
                                        </button>
                                    ) : (
                                        <span className="text-xs text-stone-300 italic">No SOP linked</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State / Add Task Placeholder */}
                <div className="p-3 bg-stone-50 border-t border-stone-100 text-center">
                    <div className="relative">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isCreating}
                            placeholder="+ Add quick task (Press Enter)"
                            className="w-full py-2 px-4 bg-transparent text-sm text-stone-600 placeholder-stone-400 border border-dashed border-stone-200 rounded-xl hover:border-emerald-300 focus:border-emerald-500 focus:ring-0 transition-all outline-none text-center"
                        />
                        {isCreating && (
                            <div className="absolute right-3 top-2.5">
                                <span className="animate-spin h-4 w-4 border-2 border-emerald-500 rounded-full border-t-transparent block"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;