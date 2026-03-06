import React from 'react';
import Reveal from '../components/ui/Reveal';

const Projects = ({ loading, projects, scrollY }) => {
    return (
        <section className="max-w-[1600px] mx-auto px-8 py-32 animate-fade-in">
            <h2 className="font-serif text-5xl md:text-8xl tracking-tighter mb-24 border-b border-neutral-100 dark:border-white/10 pb-12 text-neutral-950 dark:text-white">Projets.</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-32">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="group animate-pulse">
                            <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 mb-8"></div>
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 w-1/4 mb-4"></div>
                            <div className="h-10 bg-neutral-200 dark:bg-neutral-800 w-3/4 mb-6"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-5/6"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    projects.map((p, index) => (
                        <Reveal key={p.id} delay={index * 100}>
                            <div className="group focus:outline-none" tabIndex="0">
                                <div className="aspect-[4/3] bg-neutral-50 dark:bg-white/5 overflow-hidden mb-8 relative">
                                    {p.image && <img
                                        src={p.image}
                                        className="absolute inset-[-10%] w-[120%] h-[120%] object-cover grayscale group-hover:grayscale-0 group-focus:grayscale-0 transition-all duration-1000 origin-center"
                                        style={{ transform: `translateY(${(-scrollY * 0.08)}px) scale(1.05)` }}
                                        alt={p.title}
                                    />}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">{p.category}</span>
                                <h3 className="font-serif text-4xl mt-4 mb-6 text-neutral-950 dark:text-white">{p.title}</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 font-light text-lg leading-relaxed">{p.description}</p>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && projects.length === 0 && <p className="font-serif text-2xl italic text-neutral-300 dark:text-neutral-700 font-light">Aucun projet exposé pour le moment.</p>}
            </div>
        </section>
    );
};

export default Projects;
