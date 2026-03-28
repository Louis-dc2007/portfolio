import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ showLogin, setShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginAdmin } = useAuth();
    const navigate = useNavigate();

    if (!showLogin) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginAdmin(email, password);
            setShowLogin(false);
            navigate('/admin');
        } catch {
            alert("Identifiants incorrects");
        }
    };

    return (
        <div className="fixed inset-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <div className="bg-white dark:bg-neutral-900 p-10 border border-neutral-200 dark:border-neutral-800 shadow-2xl max-w-md w-full relative">
                <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
                    <X size={24} />
                </button>
                <h2 className="font-heading text-4xl mb-8 flex items-center gap-4 tracking-tighter text-neutral-950 dark:text-white">
                    <Lock size={28} /> Admin
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-neutral-200 dark:border-white/20 py-3 focus:outline-none focus:border-neutral-950 dark:focus:border-white bg-transparent text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b border-neutral-200 dark:border-white/20 py-3 focus:outline-none focus:border-neutral-950 dark:focus:border-white bg-transparent text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" placeholder="Mot de passe" required />
                    <button type="submit" className="w-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">Entrer</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
