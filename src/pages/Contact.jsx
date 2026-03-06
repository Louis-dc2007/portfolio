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
        <section className="max-w-[800px] mx-auto px-8 py-32 animate-fade-in">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-24 border-b border-neutral-100 dark:border-white/10 pb-12 text-neutral-950 dark:text-white">Écrivez-moi.</h2>
            <div className="grid md:grid-cols-12 gap-16">
                <Reveal delay={0} className="md:col-span-5 space-y-8">
                    <p className="text-xl font-light text-neutral-500 dark:text-neutral-400 leading-relaxed italic">
                        Une question sur un projet ? N'hésitez pas à me contacter via ce formulaire.
                    </p>
                    <p className="font-serif text-lg text-neutral-950 dark:text-white">louisdacosta@etik.com</p>
                </Reveal>
                <Reveal delay={200} className="md:col-span-7">
                    <form onSubmit={handleSubmitContact} className="space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <input type="text" placeholder="Nom" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-3 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} required />
                            <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-3 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} required />
                        </div>
                        <input type="text" placeholder="Objet" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-3 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={contactData.subject} onChange={(e) => setContactData({ ...contactData, subject: e.target.value })} required />
                        <textarea placeholder="Message" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-3 focus:outline-none h-32 text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={contactData.message} onChange={(e) => setContactData({ ...contactData, message: e.target.value })} required />
                        <button type="submit" className="flex items-center gap-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all">
                            Envoyer le message <Send size={16} />
                        </button>
                    </form>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
