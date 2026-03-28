import React from 'react';
import Reveal from '../components/ui/Reveal';
import profileImg from '../assets/img/photo_profil.jpg';

const About = () => {
    return (
        <section className="max-w-[1600px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
                <Reveal delay={0} className="w-full md:w-5/12">
                    <div className="aspect-[3/4] bg-[#F9F9F9] dark:bg-neutral-900 overflow-hidden group rounded-sm shadow-sm relative">
                        <img src={profileImg} className="absolute inset-[-5%] w-[110%] h-[110%] object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out origin-center" alt="Portrait" tabIndex="0" />
                    </div>
                </Reveal>
                <Reveal delay={200} className="w-full md:w-7/12">
                    <div className="space-y-12">
                        <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl tracking-tighter font-bold text-brand-teal dark:text-white uppercase leading-none">
                            Louis<br/>Da Costa
                        </h2>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-brand-teal dark:text-neutral-200">
                            Conception rigoureuse. <br/><span className="text-brand-blue italic">Esthétique minimale.</span>
                        </p>
                        <p className="text-lg md:text-xl font-light text-brand-teal/70 dark:text-neutral-400 leading-relaxed max-w-2xl">
                            Étudiant à l'EPITA Paris, je combine ingénierie logicielle et direction artistique pour construire des expériences numériques immersives, performantes et épurées, inspirées des codes du design retail.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default About;
