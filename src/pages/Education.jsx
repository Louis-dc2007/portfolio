import React from 'react';
import Reveal from '../components/ui/Reveal';

const Education = ({ loading, education }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-20 md:mb-32 border-b border-brand-mint/50 dark:border-white/10 pb-8 text-brand-teal dark:text-white">Formation.</h2>
            <div className="space-y-20 md:space-y-28">
                {loading ? (
                    Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="border-l-2 border-neutral-100 dark:border-neutral-800 pl-16 animate-pulse">
                            <div className="h-12 bg-[#F9F9F9] dark:bg-neutral-800 w-2/3 mb-6"></div>
                            <div className="h-4 bg-[#E4FDE1] dark:bg-neutral-800 w-1/3 mb-10"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-4/5"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    education.map((edu, index) => (
                        <Reveal key={edu.id} delay={index * 100}>
                            <div className="border-l-[3px] border-brand-teal/10 dark:border-white/20 pl-10 md:pl-16 relative">
                                <div className="absolute w-3 h-3 bg-brand-teal rounded-full -left-[7.5px] top-3"></div>
                                <h3 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-brand-teal dark:text-white">{edu.school}</h3>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue dark:text-neutral-500 mb-6">{edu.degree} · {edu.period}</p>
                                <p className="text-xl text-brand-teal/70 dark:text-neutral-400 font-light leading-relaxed">{edu.description}</p>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && education.length === 0 && <p className="font-serif text-2xl text-brand-teal/40 dark:text-neutral-700 font-light">Aucune formation répertoriée.</p>}
            </div>
        </section>
    );
};

export default Education;
