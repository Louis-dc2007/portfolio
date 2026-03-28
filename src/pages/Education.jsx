import React from 'react';
import Reveal from '../components/ui/Reveal';

const Education = ({ loading, education }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-8 md:px-[120px] py-16 md:py-32 pt-28 md:pt-36 animate-fade-in bg-white dark:bg-neutral-950">
            <div className="flex items-center gap-4 mb-16 md:mb-20">
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-neutral-900 dark:text-white">Formation</h2>
                <div className="flex-1 h-[1px] bg-brand-warm dark:bg-neutral-800"></div>
            </div>
            <div className="space-y-8 md:space-y-10">
                {loading ? (
                    Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="border-l-2 border-brand-warm pl-8 animate-pulse space-y-3">
                            <div className="h-6 bg-brand-warm w-2/3 rounded"></div>
                            <div className="h-4 bg-brand-warm/60 w-1/3 rounded"></div>
                            <div className="h-4 bg-brand-warm/40 w-full rounded"></div>
                        </div>
                    ))
                ) : (
                    education.map((edu, index) => (
                        <Reveal key={edu.id} delay={index * 80}>
                            <div className="group border-l-2 border-brand-purple/30 hover:border-brand-purple pl-8 md:pl-10 transition-colors duration-300 py-2">
                                <h3 className="font-heading font-bold text-xl md:text-2xl text-neutral-900 dark:text-white tracking-tight mb-2">{edu.school}</h3>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="text-xs font-medium text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">{edu.degree}</span>
                                    <span className="text-xs text-neutral-400">{edu.period}</span>
                                </div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{edu.description}</p>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && education.length === 0 && <p className="text-base text-neutral-400 font-light">Aucune formation répertoriée.</p>}
            </div>
        </section>
    );
};

export default Education;
