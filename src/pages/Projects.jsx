import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Reveal from '../components/ui/Reveal';

const Projects = ({ loading, projects, scrollY }) => {
    return (
        <section className="max-w-[1600px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-sans font-bold text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter mb-20 md:mb-32 border-b border-brand-teal/10 pb-8 text-brand-teal dark:text-white">Collection.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-x-12 md:gap-y-24">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-[3/4] bg-[#F9F9F9] dark:bg-neutral-800 rounded-sm mb-6"></div>
                            <div className="h-3 bg-[#E4FDE1] dark:bg-neutral-800 w-1/4 mb-4"></div>
                            <div className="h-8 bg-[#F9F9F9] dark:bg-neutral-800 w-3/4 mb-4"></div>
                        </div>
                    ))
                ) : (
                    projects.map((p, index) => (
                        <Reveal key={p.id} delay={index * 100}>
                            <div className="group focus:outline-none flex flex-col h-full cursor-pointer" tabIndex="0">
                                <div className="aspect-[3/4] bg-[#F9F9F9] dark:bg-white/5 overflow-hidden mb-8 relative rounded-sm shadow-sm hover:shadow-md transition-shadow">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            className="absolute inset-[-5%] w-[110%] h-[110%] object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out origin-center"
                                            alt={p.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-brand-teal/20 text-sm uppercase tracking-widest">
                                            Visuel non disponible
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue block mb-2">{p.category}</span>
                                            <h3 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tight text-brand-teal dark:text-white">{p.title}</h3>
                                        </div>
                                        <div className="flex gap-4">
                                            {p.github && (
                                                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-brand-teal/50 hover:text-brand-coral transition-colors p-2" aria-label="Github">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {p.link && (
                                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-brand-teal/50 hover:text-brand-coral transition-colors p-2" aria-label="Lien externe">
                                                    <ExternalLink size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-lg text-brand-teal/70 dark:text-neutral-400 font-light leading-relaxed mb-8">{p.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {p.tags?.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-2 border border-brand-teal/10 dark:border-white/10 text-brand-teal/70 dark:text-neutral-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && projects.length === 0 && (
                    <div className="col-span-full text-center py-32">
                        <p className="font-sans text-2xl text-brand-teal/40 dark:text-neutral-700 font-light uppercase tracking-widest">Aucune sélection disponible.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
