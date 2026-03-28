import React from 'react';
import Reveal from '../components/ui/Reveal';

const Projects = ({ loading, projects, scrollY }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-16 md:mb-24 border-b border-brand-mint/50 dark:border-white/10 pb-8 text-brand-teal dark:text-white">Projets.</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-24 md:gap-y-32">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="group animate-pulse">
                            <div className="aspect-[4/3] bg-[#F9F9F9] dark:bg-neutral-800 mb-8 rounded-sm"></div>
                            <div className="h-3 bg-[#E4FDE1] dark:bg-neutral-800 w-1/4 mb-4"></div>
                            <div className="h-10 bg-neutral-200 dark:bg-neutral-800 w-3/4 mb-6"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-5/6"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    projects.map((p, index) => (
                        <Reveal key={p.id} delay={index * 100}>
                            <div className="group focus:outline-none cursor-pointer" tabIndex="0">
                                <div className="aspect-[4/3] bg-[#F9F9F9] dark:bg-white/5 overflow-hidden mb-8 relative rounded-sm shadow-sm hover:shadow-md transition-shadow">
                                    {p.image && <img
                                        src={p.image}
                                        className="absolute inset-[-5%] w-[110%] h-[110%] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 group-focus:grayscale-0 transition-transform duration-[1.5s] ease-out origin-center"
                                        alt={p.title}
                                    />}
                                </div>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue dark:text-neutral-500">{p.category}</span>
                                <h3 className="font-serif font-bold text-3xl md:text-4xl mt-3 mb-4 text-brand-teal dark:text-white transition-colors group-hover:text-brand-blue">{p.title}</h3>
                                <p className="text-brand-teal/70 dark:text-neutral-400 font-light text-lg leading-relaxed">{p.description}</p>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && projects.length === 0 && <p className="font-serif text-2xl text-brand-teal/40 dark:text-neutral-700 font-light">Aucun projet exposé pour le moment.</p>}
            </div>
        </section>
    );
};

export default Projects;
