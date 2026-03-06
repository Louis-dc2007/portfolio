import React from 'react';
import Reveal from '../components/ui/Reveal';

const Experience = ({ loading, experience }) => {
    return (
        <section className="max-w-[1000px] mx-auto px-8 py-32 animate-fade-in">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-32 border-b border-neutral-200 dark:border-white/10 pb-12 text-neutral-950 dark:text-white">Expérience.</h2>
            <div className="space-y-32">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="grid md:grid-cols-12 gap-12 items-start animate-pulse">
                            <div className="md:col-span-3 h-4 bg-neutral-200 dark:bg-neutral-800 w-24"></div>
                            <div className="md:col-span-9">
                                <div className="h-10 bg-neutral-200 dark:bg-neutral-800 w-3/4 mb-6"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-1/3 mb-8"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-full"></div>
                                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-5/6"></div>
                                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-4/6"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    experience.map((exp, index) => (
                        <Reveal key={exp.id} delay={index * 100}>
                            <div className="grid md:grid-cols-12 gap-12 items-start">
                                <div className="md:col-span-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 pt-2">{exp.period}</div>
                                <div className="md:col-span-9">
                                    <h3 className="font-serif text-4xl mb-4 text-neutral-950 dark:text-white">{exp.role}</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-neutral-300 mb-6">{exp.company}</p>
                                    <p className="text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && experience.length === 0 && <p className="font-serif text-2xl italic text-neutral-300 dark:text-neutral-700 font-light">Aucune expérience répertoriée.</p>}
            </div>
        </section>
    );
};

export default Experience;
