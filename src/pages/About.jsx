import React from 'react';
import Reveal from '../components/ui/Reveal';
import profileImg from '../assets/img/photo_profil.jpg';

const About = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-8 py-32 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <Reveal delay={0}>
                    <div className="aspect-[3/4] bg-neutral-100 dark:bg-white/5 overflow-hidden">
                        <img src={profileImg} className="w-full h-full object-cover grayscale hover:grayscale-0 focus:grayscale-0 outline-none transition-all duration-1000" alt="Portrait" tabIndex="0" />
                    </div>
                </Reveal>
                <Reveal delay={200}>
                    <div className="space-y-12">
                        <h2 className="font-serif text-5xl md:text-8xl tracking-tighter italic text-neutral-950 dark:text-white">Bio.</h2>
                        <p className="text-3xl font-light leading-tight text-neutral-800 dark:text-neutral-200">Passionné par l'informatique, je développe mes compétences via l'EPITA et des projets personnels.</p>
                        <p className="text-xl font-light text-neutral-500 dark:text-neutral-400 leading-relaxed">Étudiant à l'EPITA Paris, je combine rigueur technique et curiosité créative.</p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default About;
