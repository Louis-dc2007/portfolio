import React from 'react';
import Reveal from '../components/ui/Reveal';

const Experience = ({ loading, experience }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-8 md:px-[120px] py-16 md:py-32 pt-28 md:pt-36 animate-fade-in bg-white dark:bg-neutral-950">
            <div className="flex items-center gap-4 mb-16 md:mb-20">
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-neutral-900 dark:text-white">Expériences</h2>
                <div className="flex-1 h-[1px] bg-brand-warm dark:bg-neutral-800"></div>
            </div>
            <div className="space-y-10 md:space-y-14">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-6 animate-pulse">
                            <div className="w-24 h-7 bg-brand-warm rounded-full shrink-0"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-brand-warm w-2/3 rounded"></div>
                                <div className="h-4 bg-brand-warm/60 w-1/3 rounded"></div>
                                <div className="h-4 bg-brand-warm/40 w-full rounded"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    experience.map((exp, index) => (
                        <Reveal key={exp.id} delay={index * 80}>
                            <div className="group flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 md:p-8 rounded-2xl hover:bg-brand-warm/20 dark:hover:bg-neutral-900 transition-all duration-300 -mx-6 md:-mx-8">
                                {/* Date badge: Gold text on warm bg */}
                                <div className="shrink-0">
                                    <span className="inline-block bg-brand-gold/15 text-brand-gold text-[11px] font-semibold px-4 py-1.5 rounded-full tracking-wide">
                                        {exp.period}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading font-bold text-xl md:text-2xl text-neutral-900 dark:text-white tracking-tight mb-1">{exp.role}</h3>
                                    <p className="text-sm font-semibold text-brand-rose mb-3">{exp.company}</p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{exp.description}</p>
                                </div>
                                {/* Subtle purple dot accent */}
                                <div className="hidden md:block w-2 h-2 rounded-full bg-brand-purple/40 group-hover:bg-brand-purple transition-colors mt-3 shrink-0"></div>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && experience.length === 0 && <p className="text-base text-neutral-400 font-light">Aucune expérience répertoriée.</p>}
            </div>
        </section>
    );
};

export default Experience;
