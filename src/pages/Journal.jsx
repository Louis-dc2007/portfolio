import React from 'react';
import Reveal from '../components/ui/Reveal';

const Journal = ({ loading, journal, scrollY }) => {
    return (
        <section className="max-w-[800px] mx-auto px-8 py-32 animate-fade-in">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-24 border-b border-neutral-100 dark:border-white/10 pb-12 text-neutral-950 dark:text-white">Journal.</h2>
            <div className="space-y-40">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="relative pl-16 border-l border-neutral-200 dark:border-neutral-800 animate-pulse">
                            <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-full"></span>
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 w-1/4 mb-6"></div>
                            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 w-3/4 mb-8"></div>
                            <div className="h-64 bg-neutral-200 dark:bg-neutral-800 w-full mb-10"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-3/4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    journal.map((post, index) => (
                        <Reveal key={post.id} delay={index * 100}>
                            <article className="relative pl-16 border-l border-neutral-100 hover:border-neutral-950 transition-colors duration-500">
                                <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-white border border-neutral-950 rounded-full"></span>
                                <time className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6 block">{post.date}</time>
                                <h3 className="font-serif text-5xl mb-8 tracking-tighter">{post.title}</h3>
                                {post.image && (
                                    <div className="mb-10 aspect-video bg-neutral-50 overflow-hidden relative">
                                        <img
                                            src={post.image}
                                            className="absolute inset-[-10%] w-[120%] h-[120%] object-cover grayscale hover:grayscale-0 focus:grayscale-0 outline-none transition-all duration-1000 origin-center"
                                            style={{ transform: `translateY(${(-scrollY * 0.08)}px) scale(1.05)` }}
                                            alt={post.title}
                                            tabIndex="0"
                                        />
                                    </div>
                                )}
                                <div className="text-2xl text-neutral-500 font-light leading-relaxed whitespace-pre-wrap italic">"{post.content}"</div>
                            </article>
                        </Reveal>
                    ))
                )}
                {!loading && journal.length === 0 && <p className="font-serif text-2xl italic text-neutral-300 font-light">Journal vide pour le moment.</p>}
            </div>
        </section>
    );
};

export default Journal;
