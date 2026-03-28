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
        <section className="max-w-[1400px] mx-auto px-10 md:px-[120px] py-16 md:py-32 pt-32 md:pt-40 animate-fade-in bg-white dark:bg-neutral-950">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-16 md:mb-24 border-b border-brand-mint/50 dark:border-white/10 pb-8 text-brand-teal dark:text-white">Écrivez-moi.</h2>
            <div className="grid md:grid-cols-12 gap-16 md:gap-24">
                <Reveal delay={0} className="md:col-span-5 space-y-8">
                    <p className="text-xl font-light text-brand-teal/70 dark:text-neutral-400 leading-relaxed">
                        Une question sur un projet ? Une opportunité ? N'hésitez pas à me contacter via ce formulaire.
                    </p>
                    <p className="font-serif text-lg font-semibold text-brand-teal dark:text-white">louisdacosta@etik.com</p>
                </Reveal>
                <Reveal delay={200} className="md:col-span-7">
                    <form onSubmit={handleSubmitContact} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                            <input type="text" placeholder="Nom" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-4 focus:outline-none focus:border-brand-teal dark:focus:border-white text-brand-teal dark:text-white placeholder-brand-teal/40 dark:placeholder-neutral-600 transition-colors" value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} required />
                            <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-4 focus:outline-none focus:border-brand-teal dark:focus:border-white text-brand-teal dark:text-white placeholder-brand-teal/40 dark:placeholder-neutral-600 transition-colors" value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} required />
                        </div>
                        <input type="text" placeholder="Objet" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-4 focus:outline-none focus:border-brand-teal dark:focus:border-white text-brand-teal dark:text-white placeholder-brand-teal/40 dark:placeholder-neutral-600 transition-colors" value={contactData.subject} onChange={(e) => setContactData({ ...contactData, subject: e.target.value })} required />
                        <textarea placeholder="Message" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-4 focus:outline-none h-40 resize-none text-brand-teal dark:text-white placeholder-brand-teal/40 dark:placeholder-neutral-600 transition-colors" value={contactData.message} onChange={(e) => setContactData({ ...contactData, message: e.target.value })} required />
                        <button type="submit" className="flex items-center gap-4 bg-brand-coral text-white dark:text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#d94b57] transition-all rounded-sm mt-8">
                            Envoyer le message <Send size={18} />
                        </button>
                    </form>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
