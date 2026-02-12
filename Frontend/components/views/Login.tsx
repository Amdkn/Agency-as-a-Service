import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Leaf, ArrowRight, Loader } from 'lucide-react';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (error) throw error;
                setMessage('Registration successful! Please check your email for confirmation (or sign in if auto-confirmed).');
                setIsSignUp(false); // Switch back to login for them to try
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-stone-100">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                        <Leaf className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-emerald-950">Genesis Garden</h1>
                    <p className="text-stone-500 mt-2 text-center">
                        {isSignUp ? 'Join the sovereign workspace.' : 'Enter your credentials to access the sovereign workspace.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-lg">
                        {message}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 focus:outline-none transition-all"
                                placeholder="Amadeus (Architect)"
                                required={isSignUp}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 focus:outline-none transition-all"
                            placeholder="amadeus@genesis.local"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 focus:outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                {isSignUp ? 'Create Account' : 'Sign In'}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError(null);
                            setMessage(null);
                        }}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium underline-offset-2 hover:underline focus:outline-none"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Create one'}
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                    <p className="text-xs text-stone-400">
                        Authorized Personnel Only. <br />
                        System ID: GNS-LOCAL-01
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
