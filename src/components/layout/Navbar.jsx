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
        <nav className="fixed top-0 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md z-50 shadow-sm transition-all duration-300">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-[120px] h-24 flex items-center justify-between">
                {/* Logo */}
                <button 
                    onClick={() => handleNav('home')} 
                    className="font-serif text-3xl font-bold tracking-tighter text-brand-teal dark:text-white"
                >
                    LouisDC.
                </button>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center space-x-12 text-sm font-sans tracking-wide text-brand-teal dark:text-neutral-300">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`hover:text-brand-blue dark:hover:text-white transition-colors relative ${
                                location.pathname === '/' + item.id 
                                ? 'text-brand-teal dark:text-white font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-brand-teal dark:after:bg-white' 
                                : 'text-brand-teal/80 dark:text-neutral-400'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)} 
                        className="text-brand-teal/70 hover:text-brand-teal dark:text-neutral-400 dark:hover:text-white transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button 
                        onClick={() => handleNav('contact')} 
                        className="hidden sm:block bg-brand-coral text-white dark:text-white px-8 py-3 text-[13px] font-semibold uppercase tracking-wide hover:bg-[#d94b57] transition-all rounded-sm"
                    >
                        Me contacter
                    </button>
                    <button 
                        className="lg:hidden p-2 text-brand-teal dark:text-white" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
