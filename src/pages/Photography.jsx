import React from 'react';
import Reveal from '../components/ui/Reveal';

const Photography = ({ loading, photos }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-20 md:mb-32 border-b border-brand-mint/50 dark:border-white/10 pb-8 text-brand-teal dark:text-white">Photographie.</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="mb-8 w-full bg-[#F9F9F9] dark:bg-neutral-800 animate-pulse rounded-sm" style={{ height: `${300 + ((i * 73) % 200)}px` }}></div>
                    ))
                ) : (
                    photos.map((photo, index) => (
                        <Reveal key={photo.id} delay={(index % 3) * 100}>
                            <div className="group relative overflow-hidden bg-[#F9F9F9] dark:bg-white/5 border border-brand-teal/5 dark:border-white/5 focus:outline-none rounded-sm shadow-sm hover:shadow-md transition-shadow" tabIndex="0">
                                <img src={photo.image} className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 group-focus:grayscale-0 transition-all duration-1000 ease-out" alt={photo.caption} />
                                {photo.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal dark:text-white text-center">{photo.caption}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && photos.length === 0 && <p className="font-serif text-2xl text-brand-teal/40 dark:text-neutral-700 font-light">Galerie vide.</p>}
            </div>
        </section>
    );
};

export default Photography;
