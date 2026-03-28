import React from 'react';

const MobileMenu = ({ isMenuOpen, handleNav, navItems, user }) => {
    return (
        <div className={`fixed inset-0 bg-[#FDFCF8] dark:bg-neutral-950 z-[60] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} lg:hidden pt-24`}>
            <div className="flex flex-col justify-center px-12 h-full space-y-8">
                <button onClick={() => handleNav('home')} className="text-left font-serif text-5xl tracking-tighter text-neutral-950 dark:text-white">Accueil.</button>
                {navItems.map(item => (
                    <button key={item.id} onClick={() => handleNav(item.id)} className="text-left font-serif text-5xl tracking-tighter text-neutral-400 dark:text-neutral-600 dark:hover:text-white transition-colors">{item.label}.</button>
                ))}
                <button onClick={() => handleNav('contact')} className="text-left font-serif text-5xl tracking-tighter text-neutral-400 dark:text-neutral-600 dark:hover:text-white transition-colors">Contact.</button>
            </div>
        </div>
    );
};

export default MobileMenu;
