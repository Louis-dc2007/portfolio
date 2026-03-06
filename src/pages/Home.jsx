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
        <section className="animate-fade-in relative min-h-screen pb-32">

            {/* Background Marquee */}
            <div className="absolute top-[220px] md:top-[280px] lg:top-[320px] left-0 w-full overflow-hidden opacity-5 dark:opacity-10 pointer-events-none -z-10 select-none flex whitespace-nowrap">
                <div className="custom-animate-marquee flex items-center">
                    <span className="font-sans font-bold text-[10rem] md:text-[15rem] leading-none uppercase tracking-tighter shrink-0">
                        LOUIS DA COSTA — PORTFOLIO — LOUIS DA COSTA — PORTFOLIO — LOUIS DA COSTA — PORTFOLIO —&nbsp;
                    </span>
                    <span className="font-sans font-bold text-[10rem] md:text-[15rem] leading-none uppercase tracking-tighter shrink-0">
                        LOUIS DA COSTA — PORTFOLIO — LOUIS DA COSTA — PORTFOLIO — LOUIS DA COSTA — PORTFOLIO —&nbsp;
                    </span>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-8 py-8 md:py-20 relative z-10">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-24">
                    <div className="flex items-center gap-3 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md px-4 py-2 rounded-none border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                            <MapPin size={12} /> EPITA — {currentTime}
                        </span>
                    </div>

                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md p-3 rounded-none border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Hero Section */}
                <div className="mb-72">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8">Portfolio 2026</p>
                    <div className="flex w-full overflow-hidden items-end pb-4 -mb-4">
                        <h1 className="font-serif text-[12vw] sm:text-[4.5rem] md:text-7xl lg:text-[10rem] 2xl:text-[11rem] leading-[1] tracking-tighter text-neutral-950 dark:text-white animate-typing-sequence w-fit pr-2">
                            Futur Ingénieur.
                        </h1>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[250px]">
                    {bentoItems.map((item, index) => (
                        <Reveal
                            delay={index * 100}
                            key={item.id}
                            className={`group relative overflow-hidden rounded-none p-6 lg:p-8 flex flex-col justify-between transition-all duration-500 cursor-none border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:scale-[0.98] ${item.className}`}
                        >
                            <button className="absolute inset-0 w-full h-full cursor-none focus:outline-none" tabIndex="0" onClick={() => handleNav(item.id)}></button>

                            {item.content}

                            <div className="relative z-10 flex justify-between items-start pointer-events-none">
                                <div className={`p-3 md:p-4 rounded-none backdrop-blur-md bg-neutral-100/50 dark:bg-black/20`}>
                                    {item.icon}
                                </div>
                                <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none" size={24} />
                            </div>

                            <div className="relative z-10 pointer-events-none">
                                <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl mb-1 lg:mb-2 tracking-tighter">{item.title}</h3>
                                <p className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-60 font-medium">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
