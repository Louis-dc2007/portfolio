import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
            }`}>
            <div className="max-w-[1400px] mx-auto px-8 md:px-[120px] h-20 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => handleNav('home')}
                    className="font-heading font-bold text-xl tracking-tight text-neutral-900 dark:text-white hover:text-brand-purple transition-colors"
                >
                    LouisDC<span className="text-brand-purple">.</span>
                </button>

                {/* Nav Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`text-[13px] font-medium transition-colors relative ${location.pathname === '/' + item.id
                                ? 'text-brand-purple'
                                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                }`}
                        >
                            {item.label}
                            {location.pathname === '/' + item.id && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-purple rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-brand-warm dark:hover:bg-white/10 transition-all"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button
                        onClick={() => handleNav('contact')}
                        className="hidden sm:block bg-brand-rose text-white px-7 py-2.5 text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all rounded-full shadow-md shadow-brand-rose/25"
                    >
                        Me contacter
                    </button>
                    <button
                        className="lg:hidden p-2 text-neutral-700 dark:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
