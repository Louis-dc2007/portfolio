import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/ui/Reveal';

const Home = ({ isDarkMode, setIsDarkMode, handleNav, projects }) => {
    // Top 3 featured projects for the lookbook
    const featuredProjects = projects ? projects.slice(0, 3) : [];

    return (
        <section className="animate-fade-in relative min-h-screen pb-32 bg-white dark:bg-neutral-950 transition-colors duration-300">
            
            <div className="max-w-[1600px] mx-auto px-10 md:px-[120px] py-16 md:py-32 relative z-10 pt-32 md:pt-40">
                {/* Hero Minimalist (La Redoute aesthetic: huge typography, clean space) */}
                <div className="mb-40 md:mb-64 flex flex-col items-center text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-blue mb-8">Portfolio 2026</p>
                    <h1 className="font-sans font-bold text-[18vw] md:text-[14rem] leading-none tracking-tighter text-brand-teal dark:text-white mb-12 uppercase break-words w-full">
                        Ingénieur
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl text-brand-teal/70 dark:text-neutral-400 font-light leading-relaxed">
                        Conception et développement d'expériences numériques immersives, performantes et minimalistes.
                    </p>
                    <button 
                        onClick={() => handleNav('contact')} 
                        className="mt-16 bg-brand-coral text-white dark:text-white px-12 py-5 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-[#d94b57] transition-colors rounded-sm flex items-center justify-center min-w-[200px]"
                    >
                        Me contacter
                    </button>
                </div>

                {/* Featured Projects / "La Collection" */}
                {featuredProjects.length > 0 && (
                    <div className="mb-40">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-brand-teal/10 pb-8 gap-6 md:gap-0">
                            <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter text-brand-teal dark:text-white">Sélection</h2>
                            <button onClick={() => handleNav('projects')} className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue hover:text-brand-coral transition-colors flex items-center gap-3 group">
                                Tout voir <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                            {featuredProjects.map((p, index) => (
                                <Reveal key={p.id || index} delay={index * 100}>
                                    <div 
                                        className="group cursor-pointer focus:outline-none flex flex-col h-full" 
                                        onClick={() => handleNav('projects')}
                                        tabIndex="0"
                                    >
                                        <div className="aspect-[3/4] bg-[#F9F9F9] dark:bg-white/5 overflow-hidden mb-8 relative rounded-sm">
                                            {p.image ? (
                                                <img
                                                    src={p.image}
                                                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out origin-center"
                                                    alt={p.title}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-brand-teal/20 text-sm uppercase tracking-widest">
                                                    Visuel non disponible
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-auto">
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue block mb-3">{p.category}</span>
                                            <h3 className="font-sans font-bold text-2xl md:text-3xl text-brand-teal dark:text-white uppercase tracking-tight">{p.title}</h3>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
