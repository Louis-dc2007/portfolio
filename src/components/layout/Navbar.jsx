import React from 'react';
import { LogOut, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({
    location,
    handleNav,
    navItems,
    user,
    setShowLogin,
    handleLogout,
    isDarkMode,
    setIsDarkMode,
    isMenuOpen,
    setIsMenuOpen
}) => {
    if (location.pathname === '/') return null;

    return (
        <nav className="fixed top-0 w-full bg-[#FDFCF8]/80 dark:bg-neutral-950/80 backdrop-blur-xl z-50 border-b border-neutral-100 dark:border-white/5">
            <div className="max-w-[1600px] mx-auto px-8 h-24 flex items-center justify-between">
                <button onClick={() => handleNav('home')} className="font-serif text-3xl font-bold tracking-tighter text-neutral-950 dark:text-white">LouisDC.</button>

                <div className="hidden lg:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`hover:text-neutral-950 dark:hover:text-white transition-colors ${location.pathname === '/' + item.id ? 'text-neutral-950 dark:text-white border-b border-neutral-950 dark:border-white' : ''}`}
                        >
                            {item.label}
                        </button>
                    ))}
                    {user && !user.isAnonymous && (
                        <button onClick={() => handleNav('admin')} className="text-rose-600 font-bold">Console</button>
                    )}
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    {!user || user.isAnonymous ? (
                        <button onClick={() => setShowLogin(true)} className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-neutral-300 hover:text-neutral-950 dark:hover:text-white underline underline-offset-8">Accès</button>
                    ) : (
                        <button onClick={handleLogout} className="text-neutral-400 hover:text-rose-600"><LogOut size={20} /></button>
                    )}
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => handleNav('contact')} className="hidden sm:block bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all">Me contacter</button>
                    <button className="lg:hidden p-2 text-neutral-950 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
