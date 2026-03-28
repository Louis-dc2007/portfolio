import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Reveal from '../components/ui/Reveal';

const Contact = () => {
    const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmitContact = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(contactData.subject || "Contact Portfolio");
        const body = encodeURIComponent(`De: ${contactData.name} (${contactData.email})\n\nMessage:\n${contactData.message}`);
        window.location.href = `mailto:louisdacosta@etik.com?subject=${subject}&body=${body}`;
    };

    return (
        <section className="max-w-[1600px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-sans text-5xl md:text-7xl lg:text-[8rem] uppercase font-bold tracking-tighter mb-16 md:mb-32 border-b border-brand-teal/10 pb-8 text-brand-teal dark:text-white">Contact.</h2>
            <div className="grid md:grid-cols-12 gap-16 md:gap-32">
                <Reveal delay={0} className="md:col-span-5 space-y-8">
                    <p className="text-lg md:text-2xl font-light text-brand-teal/70 dark:text-neutral-400 leading-relaxed max-w-sm">
                        Une question sur un projet ? Une opportunité ? N'hésitez pas à me contacter via ce formulaire.
                    </p>
                    <p className="font-sans text-xl md:text-3xl font-bold text-brand-teal dark:text-white mt-12">louisdacosta@etik.com</p>
                </Reveal>
                <Reveal delay={200} className="md:col-span-7">
                    <form onSubmit={handleSubmitContact} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <input type="text" placeholder="Nom complet" className="w-full bg-transparent border-b border-brand-teal/20 dark:border-white/20 pb-4 focus:outline-none focus:border-brand-teal dark:focus:border-white text-brand-teal dark:text-white placeholder-brand-teal/40 transition-colors uppercase text-xs md:text-sm tracking-widest font-semibold" value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} required />
                            <input type="email" placeholder="Adresse email" className="w-full bg-transparent border-b border-brand-teal/20 dark:border-white/20 pb-4 focus:outline-none focus:border-brand-teal dark:focus:border-white text-brand-teal dark:text-white placeholder-brand-teal/40 transition-colors uppercase text-xs md:text-sm tracking-widest font-semibold" value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} required />
                        </div>
                        <input type="text" placeholder="Sujet" className="w-full bg-transparent border-b border-brand-teal/20 dark:border-white/20 pb-4 focus:outline-none focus:border-brand-teal dark:focus:border-white text-brand-teal dark:text-white placeholder-brand-teal/40 transition-colors uppercase text-xs md:text-sm tracking-widest font-semibold" value={contactData.subject} onChange={(e) => setContactData({ ...contactData, subject: e.target.value })} required />
                        <textarea placeholder="Votre message" className="w-full bg-transparent border-b border-brand-teal/20 dark:border-white/20 pb-4 focus:outline-none h-32 resize-none text-brand-teal dark:text-white placeholder-brand-teal/40 transition-colors text-lg font-light" value={contactData.message} onChange={(e) => setContactData({ ...contactData, message: e.target.value })} required />
                        <button type="submit" className="flex items-center justify-center gap-4 bg-brand-coral text-white dark:text-white px-12 py-5 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-[#d94b57] transition-all rounded-sm w-full md:w-auto">
                            Envoyer le message <Send size={16} />
                        </button>
                    </form>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
