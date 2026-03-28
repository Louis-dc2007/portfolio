import React from 'react';
import Reveal from '../components/ui/Reveal';
import profileImg from '../assets/img/photo_profil.jpg';

const About = () => {
    return (
        <section className="min-h-screen animate-fade-in bg-brand-warm/20 dark:bg-neutral-950 pt-28 md:pt-36 pb-32">
            <div className="max-w-[1400px] mx-auto px-8 md:px-[120px]">
                <div className="flex items-center gap-4 mb-16 md:mb-20">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-neutral-900 dark:text-white">À Propos</h2>
                    <div className="flex-1 h-[1px] bg-brand-warm dark:bg-neutral-800"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <Reveal delay={0}>
                        <div className="aspect-[3/4] bg-white dark:bg-neutral-900 overflow-hidden rounded-2xl shadow-sm relative group">
                            <img 
                                src={profileImg} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                                alt="Portrait" 
                            />
                            {/* Gold decorative corner */}
                            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-brand-gold/50 rounded-tl-xl"></div>
                            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-brand-gold/50 rounded-br-xl"></div>
                        </div>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="space-y-8">
                            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                                Étudiant à l'EPITA Paris, je combine ingénierie logicielle et direction artistique pour construire des expériences numériques immersives, performantes et épurées.
                            </p>
                            {/* Blockquote with purple left border and rose text */}
                            <blockquote className="border-l-3 border-brand-purple pl-6 py-2">
                                <p className="font-heading italic text-xl md:text-2xl text-brand-rose dark:text-brand-rose leading-snug">
                                    "Concevoir avec rigueur, créer avec passion."
                                </p>
                            </blockquote>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                Passionné par l'informatique et le design, je développe mes compétences à travers des projets personnels variés, allant du développement de jeux vidéo à la photographie et au design web minimaliste.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['React', 'Python', 'Firebase', 'UI/UX', 'Photography'].map(skill => (
                                    <span key={skill} className="text-xs font-medium px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full border border-brand-warm dark:border-neutral-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
