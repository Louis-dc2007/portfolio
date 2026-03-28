import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight, GraduationCap, Camera, Newspaper, User, Sun, Moon, MapPin } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import profileImg from '../assets/img/photo_profil.jpg';

const Home = ({ isDarkMode, setIsDarkMode, handleNav }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Paris'
            });
            setCurrentTime(timeString);
        };
        updateTime();
        const interval = setInterval(updateTime, 10000);
        return () => clearInterval(interval);
    }, []);

    const bentoItems = [
        {
            id: 'projects',
            title: 'Projets',
            desc: 'Galerie de travaux',
            icon: <ArrowRight size={24} />,
            className: 'md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2',
            order: 1
        },
        {
            id: 'experience',
            title: 'Expérience',
            desc: 'Parcours technique',
            icon: <Briefcase size={24} />,
            className: 'md:col-span-2 lg:col-span-2 row-span-1',
            order: 2
        },
        {
            id: 'about',
            title: 'À Propos',
            desc: 'Développeur & Étudiant',
            icon: <User size={24} />,
            className: 'md:col-span-1 lg:col-span-1 row-span-1',
            order: 3,
            content: null
        },
        {
            id: 'education',
            title: 'Formation',
            desc: 'Cursus académique',
            icon: <GraduationCap size={24} />,
            className: 'md:col-span-1 lg:col-span-1 row-span-1',
            order: 4
        },
        {
            id: 'photography',
            title: 'Photographie',
            desc: 'Regards extérieurs',
            icon: <Camera size={24} />,
            className: 'md:col-span-2 lg:col-span-2 row-span-1',
            order: 5
        },
        {
            id: 'journal',
            title: 'Journal',
            desc: 'Notes & Réflexions',
            icon: <Newspaper size={24} />,
            className: 'md:col-span-2 lg:col-span-2 row-span-1',
            order: 6
        }
    ];

    return (
        <section className="animate-fade-in relative min-h-screen pb-32 bg-white dark:bg-neutral-950 transition-colors duration-300">
            
            <div className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 relative z-10 pt-32 md:pt-40">
                {/* Header Actions (Pill) */}
                <div className="flex justify-start mb-24">
                    <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 px-5 py-3 rounded-full border border-neutral-100 dark:border-neutral-800 shadow-sm transition-colors">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-coral opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-coral"></span>
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-teal/60 dark:text-neutral-400 flex items-center gap-2">
                            <MapPin size={14} /> EPITA — {currentTime}
                        </span>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="mb-40 md:mb-56">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-blue mb-6">Portfolio 2026</p>
                    <div className="flex w-full overflow-hidden items-end pb-4 -mb-4">
                        <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] leading-none tracking-tight text-brand-teal dark:text-white animate-typing-sequence w-fit pr-2">
                            Futur Ingénieur.
                        </h1>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-12 auto-rows-[220px] md:auto-rows-[250px] lg:auto-rows-[280px]">
                    {bentoItems.map((item, index) => (
                        <Reveal
                            delay={index * 100}
                            key={item.id}
                            className={`group relative overflow-hidden p-8 flex flex-col justify-between transition-all duration-500 bg-[#F9F9F9] dark:bg-neutral-900 hover:bg-white dark:hover:bg-neutral-800 hover:scale-[1.05] hover:shadow-xl hover:shadow-black/5 ${item.className}`}
                        >
                            <button className="absolute inset-0 w-full h-full focus:outline-none" tabIndex="0" onClick={() => handleNav(item.id)}></button>

                            {item.content}

                            <div className="relative z-10 flex justify-between items-start pointer-events-none">
                                <div className={`text-brand-blue dark:text-white/80 transition-transform duration-500 group-hover:-translate-y-1`}>
                                    {item.icon}
                                </div>
                                <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-brand-coral pointer-events-none" size={24} />
                            </div>

                            <div className="relative z-10 pointer-events-none pt-6 mt-auto">
                                <h3 className="font-serif font-bold text-2xl lg:text-3xl xl:text-4xl mb-2 tracking-tight text-brand-teal dark:text-white transition-colors group-hover:text-brand-blue">{item.title}</h3>
                                <p className="text-[11px] md:text-xs uppercase tracking-widest text-brand-teal/60 dark:text-neutral-400 font-medium">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
