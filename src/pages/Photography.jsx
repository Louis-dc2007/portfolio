import React from 'react';
import Reveal from '../components/ui/Reveal';

const Photography = ({ loading, photos }) => {
    return (
        <section className="max-w-[1400px] mx-auto px-8 py-32 animate-fade-in">
            <h2 className="font-serif break-words text-5xl md:text-7xl tracking-tighter mb-24 border-b border-neutral-100 dark:border-white/10 pb-12 text-neutral-950 dark:text-white">Photographie.</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="mb-8 w-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" style={{ height: `${300 + ((i * 73) % 200)}px` }}></div>
                    ))
                ) : (
                    photos.map((photo, index) => (
                        <Reveal key={photo.id} delay={(index % 3) * 100}>
                            <div className="group relative overflow-hidden bg-neutral-100 dark:bg-white/5 border border-neutral-100 dark:border-white/5 focus:outline-none" tabIndex="0">
                                <img src={photo.image} className="w-full grayscale group-hover:grayscale-0 group-focus:grayscale-0 transition-all duration-1000" alt={photo.caption} />
                                {photo.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-950 dark:text-white">{photo.caption}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))
                )}
                {!loading && photos.length === 0 && <p className="font-serif text-2xl italic text-neutral-300 dark:text-neutral-700 font-light">Galerie vide.</p>}
            </div>
        </section>
    );
};

export default Photography;
