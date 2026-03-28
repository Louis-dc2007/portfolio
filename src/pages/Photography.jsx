import React from 'react';
import Reveal from '../components/ui/Reveal';

const Photography = ({ loading, photos }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-8 md:px-[120px] py-16 md:py-32 pt-28 md:pt-36 animate-fade-in bg-white dark:bg-neutral-950">
            <div className="flex items-center gap-4 mb-16 md:mb-20">
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-neutral-900 dark:text-white">Photographie</h2>
                <div className="flex-1 h-[1px] bg-brand-warm dark:bg-neutral-800"></div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="w-full bg-brand-warm/40 dark:bg-neutral-800 animate-pulse rounded-2xl" style={{ height: `${250 + ((i * 73) % 200)}px` }}></div>
                    ))
                ) : (
                    photos.map((photo, index) => (
                        <Reveal key={photo.id} delay={(index % 3) * 60}>
                            <div className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid" tabIndex="0">
                                <img 
                                    src={photo.image} 
                                    className="w-full group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                                    alt={photo.caption} 
                                />
                                {/* Purple gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    {photo.caption && (
                                        <p className="text-white text-xs font-medium tracking-wider uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {photo.caption}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && photos.length === 0 && <p className="text-base text-neutral-400 font-light">Aucun visuel disponible.</p>}
            </div>
        </section>
    );
};

export default Photography;
