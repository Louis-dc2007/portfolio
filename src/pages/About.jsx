import React from 'react';
import Reveal from '../components/ui/Reveal';
import profileImg from '../assets/img/photo_profil.jpg';

const About = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                <Reveal delay={0}>
                    <div className="aspect-[3/4] bg-[#F9F9F9] dark:bg-neutral-900 overflow-hidden group">
                        <img src={profileImg} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Portrait" tabIndex="0" />
                    </div>
                </Reveal>
                <Reveal delay={200}>
                    <div className="space-y-12">
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold text-brand-teal dark:text-white">Bio.</h2>
                        <p className="text-2xl md:text-3xl font-light leading-tight text-brand-blue dark:text-neutral-200">Passionné par l'informatique, je développe mes compétences via l'EPITA et des projets personnels.</p>
                        <p className="text-lg md:text-xl font-light text-brand-teal/70 dark:text-neutral-400 leading-relaxed">Étudiant à l'EPITA Paris, je combine rigueur technique et curiosité créative pour construire des expériences numériques immersives et minimalistes.</p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default About;
