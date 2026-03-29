import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import profileImg from '../assets/img/photo_profil.jpg';

const About = ({ handleNav }) => {
    return (
        <section className="min-h-screen animate-fade-in bg-brand-warm/20 dark:bg-neutral-950 pt-28 md:pt-36 pb-32">
            <div className="max-w-[1400px] mx-auto px-8 md:px-[120px]">
                <div className="flex items-center gap-4 mb-16 md:mb-20">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-neutral-900 dark:text-white">À Propos</h2>
                    <div className="flex-1 h-[1px] bg-brand-warm dark:bg-neutral-800"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 md:gap-20 items-start">
                    <Reveal delay={0}>
                        <div className="w-full max-w-[320px] mx-auto aspect-[3/4] bg-white dark:bg-neutral-900 overflow-hidden rounded-2xl shadow-sm relative group">
                            <img
                                src={profileImg}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                                alt="Louis Da Costa"
                            />
                            <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-brand-gold/50 rounded-tl-xl"></div>
                            <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-brand-gold/50 rounded-br-xl"></div>
                        </div>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                                Passionné par l'informatique, je suis actuellement en classe préparatoire à l'EPITA Paris, où je construis les bases de mon futur métier d'ingénieur en informatique.
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                En parallèle de mes études, la photographie est une passion à part entière qui me permet d'exprimer ma créativité et de développer mon œil artistique.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-2">
                                {['Python', 'React-TS', 'Photographie', 'Classe préparatoire', 'C'].map(skill => (
                                    <span key={skill} className="text-xs font-medium px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full border border-brand-warm dark:border-neutral-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Links & CTA */}
                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-brand-warm dark:border-neutral-800">
                                <a href="https://www.instagram.com/louis_dc07/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-purple transition-colors">
                                    <Instagram size={18} /> Instagram
                                </a>
                                <a href="https://www.linkedin.com/in/louis-da-costa2007/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-purple transition-colors">
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                                <button onClick={() => handleNav('contact')} className="flex items-center gap-2 bg-brand-rose text-white px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all rounded-full shadow-md shadow-brand-rose/25 ml-auto">
                                    <Mail size={14} /> Me contacter
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
