import React from 'react';
import Reveal from '../components/ui/Reveal';

const Journal = ({ loading, journal, scrollY }) => {
    return (
        <section className="max-w-[1000px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-20 md:mb-32 border-b border-brand-mint/50 dark:border-white/10 pb-8 text-brand-teal dark:text-white">Journal.</h2>
            <div className="space-y-32 md:space-y-40">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="relative pl-10 md:pl-16 border-l border-neutral-100 dark:border-neutral-800 animate-pulse">
                            <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-[#F9F9F9] dark:bg-neutral-800 rounded-full"></span>
                            <div className="h-3 bg-[#E4FDE1] dark:bg-neutral-800 w-1/4 mb-6"></div>
                            <div className="h-12 bg-[#F9F9F9] dark:bg-neutral-800 w-3/4 mb-8"></div>
                            <div className="h-64 bg-neutral-100 dark:bg-neutral-800 w-full mb-10"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-full"></div>
                                <div className="h-4 bg-neutral-100 dark:bg-neutral-800 w-3/4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    journal.map((post, index) => (
                        <Reveal key={post.id} delay={index * 100}>
                            <article className="relative pl-10 md:pl-16 border-l border-brand-teal/10 hover:border-brand-teal transition-colors duration-500">
                                <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-white dark:bg-neutral-900 border border-brand-teal dark:border-white rounded-full"></span>
                                <time className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue dark:text-neutral-500 mb-6 block">{post.date}</time>
                                <h3 className="font-serif text-4xl md:text-5xl font-bold mb-8 tracking-tight text-brand-teal dark:text-white">{post.title}</h3>
                                {post.image && (
                                    <div className="mb-10 aspect-video bg-[#F9F9F9] dark:bg-white/5 overflow-hidden relative rounded-sm shadow-sm hover:shadow-md transition-shadow">
                                        <img
                                            src={post.image}
                                            className="absolute inset-[-5%] w-[110%] h-[110%] object-cover grayscale hover:grayscale-0 focus:grayscale-0 outline-none transition-transform duration-[1.5s] ease-out origin-center"
                                            style={{ transform: `scale(1.05)` }}
                                            alt={post.title}
                                            tabIndex="0"
                                        />
                                    </div>
                                )}
                                <div className="text-xl md:text-2xl text-brand-teal/80 dark:text-neutral-400 font-light leading-relaxed whitespace-pre-wrap italic">"{post.content}"</div>
                            </article>
                        </Reveal>
                    ))
                )}
                {!loading && journal.length === 0 && <p className="font-serif text-2xl text-brand-teal/40 dark:text-neutral-700 font-light">Journal vide pour le moment.</p>}
            </div>
        </section>
    );
};

export default Journal;
