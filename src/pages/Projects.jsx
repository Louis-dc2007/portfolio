import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Reveal from '../components/ui/Reveal';

const Projects = ({ loading, projects, scrollY }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-8 md:px-[120px] py-16 md:py-32 pt-28 md:pt-36 animate-fade-in bg-white dark:bg-neutral-950">
            <div className="flex items-center gap-4 mb-16 md:mb-20">
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-neutral-900 dark:text-white">Projets</h2>
                <div className="flex-1 h-[1px] bg-brand-warm dark:bg-neutral-800"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="animate-pulse rounded-2xl overflow-hidden bg-brand-warm/30">
                            <div className="aspect-[4/3]"></div>
                            <div className="p-6 space-y-3">
                                <div className="h-4 w-16 bg-brand-warm rounded-full"></div>
                                <div className="h-6 bg-brand-warm w-3/4 rounded"></div>
                                <div className="h-4 bg-brand-warm/60 w-full rounded"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    projects.map((project, index) => (
                        <Reveal key={project.id} delay={index * 60}>
                            <div className="group rounded-2xl overflow-hidden bg-brand-warm/20 dark:bg-neutral-900 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 border border-transparent hover:border-brand-warm dark:hover:border-neutral-700" tabIndex="0">
                                {/* Image with purple overlay on hover */}
                                <div className="aspect-[4/3] bg-brand-warm/40 dark:bg-neutral-800 overflow-hidden relative">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                            alt={project.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">Visuel non disponible</div>
                                    )}
                                    <div className="absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/10 transition-colors duration-500"></div>
                                </div>
                                <div className="p-5 md:p-6">
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-rose block mb-2">{project.category}</span>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white tracking-tight">{project.title}</h3>
                                        <div className="flex gap-2 shrink-0 ml-3">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-brand-purple transition-colors" aria-label="Github">
                                                    <Github size={15} />
                                                </a>
                                            )}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-brand-purple transition-colors" aria-label="Lien">
                                                    <ExternalLink size={15} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags?.map(tag => (
                                            <span key={tag} className="text-[10px] font-medium px-2.5 py-1 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-full border border-brand-warm/50 dark:border-neutral-700">
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
                    <div className="col-span-full text-center py-20">
                        <p className="text-base text-neutral-400 font-light">Aucun projet disponible.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
