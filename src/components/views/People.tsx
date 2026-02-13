import React, { useMemo } from 'react';
import { usePeople } from '../../hooks/useSupabase';
import { ROLE_ALLOCATIONS } from '../../constants';
import { ViewProps } from '../../types';
import { Users, Shield, Cpu, Zap, AlertCircle } from 'lucide-react';

const People: React.FC<ViewProps> = ({ onOpenModal }) => {
    const { people, loading } = usePeople();

    // Sort people: AI agents first (for Justice League vibe), then humans
    const sortedPeople = useMemo(() => {
        return [...people].sort((a, b) => {
            if (a.is_ai === b.is_ai) return 0;
            return a.is_ai ? -1 : 1;
        });
    }, [people]);

    const handleMemberClick = (member: any) => {
        onOpenModal(member.full_name, (
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl shadow-sm ${member.is_ai
                        ? 'bg-purple-50 border border-purple-100 text-purple-600'
                        : 'bg-stone-50 border border-stone-100 text-stone-600'
                        }`}>
                        {member.avatar_url ? (
                            <img src={member.avatar_url} alt={member.full_name} className="w-full h-full rounded-3xl object-cover" />
                        ) : (
                            member.is_ai ? '🤖' : '👤'
                        )}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold font-serif text-emerald-950">{member.full_name}</h3>
                        <p className="text-stone-500 font-medium">{member.job_title || member.role}</p>
                        {member.is_ai && (
                            <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-bold uppercase bg-purple-50 text-purple-600 border border-purple-100">
                                <Cpu className="w-3 h-3 mr-1" /> AI Agent
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                    <h4 className="font-bold text-sm mb-3 text-stone-700 uppercase tracking-widest">Bio & Directive</h4>
                    <p className="text-stone-600 text-md leading-relaxed font-serif italic">
                        "{member.bio || "Ready to serve the ecosystem."}"
                    </p>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-stone-200 p-4 rounded-2xl">
                        <span className="text-xs font-bold text-stone-400 uppercase">Role</span>
                        <div className="mt-1 font-medium text-stone-800">{member.role}</div>
                    </div>
                    <div className="bg-white border border-stone-200 p-4 rounded-2xl">
                        <span className="text-xs font-bold text-stone-400 uppercase">Status</span>
                        <div className="mt-1 font-medium text-emerald-600 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Active
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    if (loading) {
        return <div className="p-8 text-center text-stone-500 animate-pulse">Loading directory...</div>;
    }

    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-emerald-950 font-serif">Team & Capacity</h1>
                    <p className="text-stone-500 mt-1">Resource planning for Humans and AI Agents.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs text-stone-600 font-medium">System Healthy</span>
                </div>
            </div>

            {/* Section A: Team Capacity */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium text-emerald-900 flex items-center gap-2 font-serif">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Capacity Load
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedPeople.map((member) => {
                        // Mock load for now until "My Pulse" is implemented
                        const load = Math.floor(Math.random() * 40) + 40; // 40-80%

                        return (
                            <div
                                key={member.id}
                                onClick={() => handleMemberClick(member)}
                                className="bg-white border border-stone-200 p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-200 hover:shadow-xl transition-all shadow-md shadow-stone-200/50 cursor-pointer transform hover:-translate-y-1"
                            >

                                {/* Type Badge */}
                                <div className="absolute top-4 right-4">
                                    {member.is_ai ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-50 text-purple-600 border border-purple-100">
                                            <Cpu className="w-3 h-3 mr-1" /> AI Agent
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-500 border border-stone-200">
                                            Human
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${member.is_ai
                                        ? 'bg-purple-50 border border-purple-100 text-purple-600'
                                        : 'bg-stone-50 border border-stone-100 text-stone-600'
                                        }`}>
                                        {member.avatar_url ? (
                                            <img src={member.avatar_url} alt={member.full_name} className="w-full h-full rounded-2xl object-cover" />
                                        ) : (
                                            member.is_ai ? '🤖' : '👤'
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-stone-800 text-lg font-serif">{member.full_name}</h3>
                                        <p className="text-xs text-stone-500 font-medium">{member.job_title || member.role}</p>
                                    </div>
                                </div>

                                {/* Bio / Quote */}
                                <div className="mb-4">
                                    <p className="text-xs text-stone-400 italic line-clamp-2">"{member.bio || 'Ready to serve.'}"</p>
                                </div>

                                {/* Load Bar */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Estimated Load</span>
                                        <div className="flex items-center gap-1.5">
                                            {load > 90 && <AlertCircle className="w-3 h-3 text-amber-500" />}
                                            <span className={`text-sm font-bold ${load > 90 ? 'text-amber-600' :
                                                load > 70 ? 'text-amber-500' :
                                                    'text-emerald-600'
                                                }`}>{load}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 shadow-sm ${load > 90 ? 'bg-amber-500' :
                                                load > 70 ? 'bg-amber-400' :
                                                    'bg-emerald-500'
                                                }`}
                                            style={{ width: `${load}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Section B: Role Distribution */}
            <section className="space-y-4 pt-4">
                <h2 className="text-lg font-medium text-emerald-900 flex items-center gap-2 font-serif">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    Role Distribution
                </h2>
                <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden max-w-2xl shadow-md shadow-stone-200/50">
                    <table className="w-full text-left text-sm text-stone-500">
                        <thead className="bg-stone-50 text-xs uppercase font-bold text-stone-400">
                            <tr>
                                <th className="px-6 py-4">Domain</th>
                                <th className="px-6 py-4">Owner</th>
                                <th className="px-6 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {ROLE_ALLOCATIONS.map((role) => (
                                <tr key={role.id} className="hover:bg-emerald-50/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-stone-700 font-serif">{role.domain}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-600 border border-stone-200">
                                                {role.ownerAvatar}
                                            </div>
                                            <span className="font-medium text-stone-600">{role.ownerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wide">
                                            Covered
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
};

export default People;