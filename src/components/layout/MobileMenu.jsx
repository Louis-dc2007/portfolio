import React from 'react';

const MobileMenu = ({ isMenuOpen, handleNav, navItems, user }) => {
    return (
        <div className={`fixed inset-0 bg-white dark:bg-neutral-950 z-[60] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} lg:hidden pt-24`}>
            <div className="flex flex-col justify-center px-10 h-full space-y-6">
                <button onClick={() => handleNav('home')} className="text-left font-heading text-4xl font-bold tracking-tight text-neutral-900 dark:text-white hover:text-brand-purple transition-colors">Accueil</button>
                {navItems.map(item => (
                    <button key={item.id} onClick={() => handleNav(item.id)} className="text-left font-heading text-4xl font-bold tracking-tight text-neutral-400 dark:text-neutral-600 hover:text-brand-purple dark:hover:text-white transition-colors">{item.label}</button>
                ))}
                <div className="pt-6 border-t border-brand-warm dark:border-neutral-800">
                    <button onClick={() => handleNav('contact')} className="bg-brand-rose text-white px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider rounded-full hover:bg-brand-rose/90 transition-all shadow-sm">
                        Me contacter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
