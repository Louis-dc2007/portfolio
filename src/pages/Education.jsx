import React from 'react';
import Reveal from '../components/ui/Reveal';

const Education = ({ loading, education }) => {
    return (
        <section className="max-w-[1000px] mx-auto px-8 py-32 animate-fade-in">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-32 border-b border-neutral-200 dark:border-white/10 pb-12 text-neutral-950 dark:text-white">Formation.</h2>
            <div className="space-y-28">
                {loading ? (
                    Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-16 animate-pulse">
                            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 w-2/3 mb-6"></div>
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-1/3 mb-10"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-4/5"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    education.map((edu, index) => (
                        <Reveal key={edu.id} delay={index * 100}>
                            <div className="border-l-2 border-neutral-950 dark:border-white pl-16">
                                <h3 className="font-serif text-5xl mb-4 text-neutral-950 dark:text-white">{edu.school}</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8">{edu.degree} · {edu.period}</p>
                                <p className="text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{edu.description}</p>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && education.length === 0 && <p className="font-serif text-2xl italic text-neutral-300 dark:text-neutral-700 font-light">Aucune formation répertoriée.</p>}
            </div>
        </section>
    );
};

export default Education;
