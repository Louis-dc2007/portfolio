import React from 'react';
import { Briefcase, ArrowRight, GraduationCap, Camera, Newspaper, User } from 'lucide-react';
import Reveal from '../components/ui/Reveal';

const Home = ({ isDarkMode, setIsDarkMode, handleNav }) => {
    // E-commerce categories style navigation
    const categories = [
        {
            id: 'projects',
            title: 'Projets',
            desc: 'Découvrir la collection',
            icon: <ArrowRight size={32} strokeWidth={1} />
        },
        {
            id: 'experience',
            title: 'Expérience',
            desc: 'Parcours professionnel',
            icon: <Briefcase size={32} strokeWidth={1} />
        },
        {
            id: 'about',
            title: 'À Propos',
            desc: 'Vision & Profil',
            icon: <User size={32} strokeWidth={1} />
        },
        {
            id: 'education',
            title: 'Formation',
            desc: 'Cursus académique',
            icon: <GraduationCap size={32} strokeWidth={1} />
        },
        {
            id: 'photography',
            title: 'Photographie',
            desc: 'Sélection visuelle',
            icon: <Camera size={32} strokeWidth={1} />
        },
        {
            id: 'journal',
            title: 'Journal',
            desc: 'Articles et notes',
            icon: <Newspaper size={32} strokeWidth={1} />
        }
    ];

    return (
        <section className="animate-fade-in relative min-h-screen pb-32 bg-white dark:bg-neutral-950 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 relative z-10 pt-32 md:pt-40">
                {/* Hero Section */}
                <div className="mb-32 md:mb-48 flex flex-col items-center text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-blue mb-8">Édition 2026</p>
                    <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter text-brand-teal dark:text-white mb-10 leading-none">
                        Louis Da Costa
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl text-brand-teal/70 dark:text-neutral-400 font-light leading-relaxed mb-12">
                        Futur ingénieur. Conception minimale et performances de haut niveau.
                    </p>
                    <button 
                        onClick={() => handleNav('contact')} 
                        className="bg-brand-coral text-white dark:text-white px-12 py-5 text-[11px] md:text-sm font-semibold uppercase tracking-[0.2em] hover:bg-[#d94b57] transition-colors rounded-sm flex items-center justify-center w-full md:w-auto mx-auto"
                    >
                        Me contacter
                    </button>
                </div>

                {/* E-commerce category grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-16 md:gap-y-24">
                    {categories.map((cat, index) => (
                        <Reveal delay={index * 100} key={cat.id}>
                            <div 
                                className="group cursor-pointer focus:outline-none flex flex-col h-full"
                                tabIndex="0"
                                onClick={() => handleNav(cat.id)}
                            >
                                {/* Imaged/Icon Block */}
                                <div className="aspect-[4/3] md:aspect-[3/2] bg-[#F9F9F9] dark:bg-neutral-900 border border-brand-teal/5 dark:border-white/5 flex items-center justify-center mb-8 relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-sm">
                                    <div className="text-brand-blue dark:text-neutral-500 group-hover:text-brand-coral transition-colors duration-500 z-10 transform group-hover:scale-110">
                                        {cat.icon}
                                    </div>
                                    <div className="absolute inset-0 bg-brand-teal/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                {/* Texts strictly below the block */}
                                <div className="text-left">
                                    <h3 className="font-sans font-bold text-3xl md:text-4xl uppercase tracking-tighter text-brand-teal dark:text-white mb-3 group-hover:text-brand-blue transition-colors duration-300">{cat.title}</h3>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal/50 dark:text-neutral-500">{cat.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
