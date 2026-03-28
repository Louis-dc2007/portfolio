import React from 'react';
import { ArrowRight, Briefcase, GraduationCap, Camera, User, Sparkles } from 'lucide-react';
import Reveal from '../components/ui/Reveal';

const Home = ({ isDarkMode, setIsDarkMode, handleNav, projects }) => {
    const featuredProject = projects && projects.length > 0 ? projects[0] : null;

    const categories = [
        { id: 'projects', title: 'Projets', desc: 'Mes réalisations', icon: <ArrowRight size={22} strokeWidth={2} />, bg: 'bg-brand-purple', text: 'text-white' },
        { id: 'experience', title: 'Expérience', desc: 'Mon parcours', icon: <Briefcase size={22} strokeWidth={2} />, bg: 'bg-brand-teal', text: 'text-white' },
        { id: 'education', title: 'Formation', desc: 'Mon cursus', icon: <GraduationCap size={22} strokeWidth={2} />, bg: 'bg-brand-gold', text: 'text-white' },
        { id: 'about', title: 'À Propos', desc: 'Qui suis-je', icon: <User size={22} strokeWidth={2} />, bg: 'bg-brand-rose', text: 'text-white' },
        { id: 'photography', title: 'Photo', desc: 'Ma galerie', icon: <Camera size={22} strokeWidth={2} />, bg: 'bg-brand-purple', text: 'text-white' },
    ];

    return (
        <section className="animate-fade-in min-h-screen bg-white dark:bg-neutral-950 pt-28 md:pt-36 pb-32">
            <div className="max-w-[1400px] mx-auto px-8 md:px-[120px]">

                {/* ── Hero Section ── */}
                <div className="mb-20 md:mb-32">
                    <Reveal delay={0}>
                        <div className="inline-flex items-center gap-2 bg-brand-purple text-white text-xs font-semibold px-5 py-2 rounded-full mb-8 shadow-lg shadow-brand-purple/20">
                            <Sparkles size={14} />
                            Portfolio 2026
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="font-heading font-bold text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.08] tracking-tight text-neutral-900 dark:text-white mb-6">
                            Futur Ingénieur,<br/>
                            <span className="bg-gradient-to-r from-brand-purple to-brand-teal bg-clip-text text-transparent">créateur</span> d'expériences<br/>numériques.
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-lg mb-10">
                            Étudiant à l'EPITA Paris, passionné par le développement logiciel et le design minimaliste.
                        </p>
                    </Reveal>
                    <Reveal delay={300}>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => handleNav('contact')} className="bg-brand-rose text-white px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all rounded-full shadow-lg shadow-brand-rose/30">
                                Me contacter
                            </button>
                            <button onClick={() => handleNav('projects')} className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all rounded-full shadow-lg shadow-neutral-900/20">
                                Voir mes projets
                            </button>
                        </div>
                    </Reveal>
                </div>

                {/* ── Featured Project (Full-width) ── */}
                {featuredProject && (
                    <Reveal delay={400}>
                        <div 
                            className="group mb-20 md:mb-32 cursor-pointer relative overflow-hidden rounded-3xl"
                            onClick={() => handleNav('projects')}
                            tabIndex="0"
                        >
                            <div className="aspect-[16/7] md:aspect-[21/9] overflow-hidden relative bg-brand-warm dark:bg-neutral-800">
                                {featuredProject.image ? (
                                    <img 
                                        src={featuredProject.image} 
                                        alt={featuredProject.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-brand-purple via-brand-teal to-brand-gold flex items-center justify-center">
                                        <span className="text-white text-sm uppercase tracking-widest font-bold">Projet Vedette</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                                    <span className="inline-block bg-brand-gold text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-md">{featuredProject.category || 'Projet vedette'}</span>
                                    <h3 className="font-heading font-bold text-2xl md:text-4xl text-white tracking-tight drop-shadow-lg">{featuredProject.title}</h3>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* ── Category Grid — Bold colored cards ── */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                    {categories.map((cat, index) => (
                        <Reveal delay={index * 60} key={cat.id}>
                            <button 
                                onClick={() => handleNav(cat.id)}
                                className="group w-full text-left p-6 md:p-8 rounded-2xl border-2 border-brand-warm dark:border-neutral-800 hover:border-transparent transition-all duration-300 flex flex-col justify-between min-h-[130px] md:min-h-[160px] bg-white dark:bg-neutral-900 hover:shadow-xl relative overflow-hidden"
                            >
                                {/* Colored bg on hover */}
                                <div className={`absolute inset-0 ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                                
                                <div className="relative z-10">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cat.bg} ${cat.text} mb-4 shadow-md group-hover:bg-white group-hover:text-neutral-900 transition-all duration-300`}>
                                        {cat.icon}
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="font-heading font-bold text-base md:text-lg text-neutral-900 dark:text-white group-hover:text-white tracking-tight transition-colors duration-300">{cat.title}</h3>
                                    <p className="text-xs text-neutral-400 group-hover:text-white/70 mt-1 transition-colors duration-300">{cat.desc}</p>
                                </div>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
