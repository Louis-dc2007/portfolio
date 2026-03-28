import React from 'react';
import Reveal from '../components/ui/Reveal';

const Experience = ({ loading, experience }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-20 md:mb-32 border-b border-brand-mint/50 dark:border-white/10 pb-8 text-brand-teal dark:text-white">Expérience.</h2>
            <div className="space-y-24 md:space-y-32">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="grid md:grid-cols-12 gap-12 items-start animate-pulse">
                            <div className="md:col-span-3 h-4 bg-[#F9F9F9] dark:bg-neutral-800 w-24"></div>
                            <div className="md:col-span-9">
                                <div className="h-10 bg-[#F9F9F9] dark:bg-neutral-800 w-3/4 mb-6"></div>
                                <div className="h-4 bg-[#E4FDE1] dark:bg-neutral-800 w-1/3 mb-8"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-full"></div>
                                    <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-5/6"></div>
                                    <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-4/6"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    experience.map((exp, index) => (
                        <Reveal key={exp.id} delay={index * 100}>
                            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
                                <div className="md:col-span-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal/50 dark:text-neutral-500 pt-2">{exp.period}</div>
                                <div className="md:col-span-9 border-l border-brand-teal/10 dark:border-white/10 pl-6 md:pl-10">
                                    <h3 className="font-serif font-bold text-3xl md:text-4xl mb-3 text-brand-teal dark:text-white">{exp.role}</h3>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue dark:text-neutral-300 mb-6">{exp.company}</p>
                                    <p className="text-lg text-brand-teal/70 dark:text-neutral-400 font-light leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && experience.length === 0 && <p className="font-serif text-2xl text-brand-teal/40 dark:text-neutral-700 font-light">Aucune expérience répertoriée.</p>}
            </div>
        </section>
    );
};

export default Experience;
