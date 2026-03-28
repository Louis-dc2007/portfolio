import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Reveal from '../components/ui/Reveal';

const Contact = () => {
    const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmitContact = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(contactData.subject || "Contact Portfolio");
        const body = encodeURIComponent(`De: ${contactData.name} (${contactData.email})\n\nMessage:\n${contactData.message}`);
        window.location.href = `mailto:contact@louisdacosta.fr?subject=${subject}&body=${body}`;
    };

    const inputClasses = "w-full bg-brand-warm/30 dark:bg-neutral-900 border border-brand-warm dark:border-neutral-800 px-5 py-4 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple/50 rounded-xl transition-all";

    return (
        <section className="max-w-[1400px] mx-auto px-8 md:px-[120px] py-16 md:py-32 pt-28 md:pt-36 animate-fade-in bg-white dark:bg-neutral-950">
            <div className="flex items-center gap-4 mb-16 md:mb-20">
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-neutral-900 dark:text-white">Contact</h2>
                <div className="flex-1 h-[1px] bg-brand-warm dark:bg-neutral-800"></div>
            </div>
            <div className="grid md:grid-cols-12 gap-12 md:gap-20">
                <Reveal delay={0} className="md:col-span-5 space-y-6">
                    <p className="text-base font-light text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Une question sur un projet ? Une opportunité de collaboration ? N'hésitez pas à me contacter.
                    </p>
                    <div className="bg-brand-warm/30 dark:bg-neutral-900 p-6 rounded-2xl border border-brand-warm dark:border-neutral-800">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Email</p>
                        <p className="font-heading font-bold text-lg text-neutral-900 dark:text-white">contact@louisdacosta.fr</p>
                    </div>
                </Reveal>
                <Reveal delay={200} className="md:col-span-7">
                    <form onSubmit={handleSubmitContact} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input type="text" placeholder="Nom" className={inputClasses} value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} required />
                            <input type="email" placeholder="Email" className={inputClasses} value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} required />
                        </div>
                        <input type="text" placeholder="Sujet" className={inputClasses} value={contactData.subject} onChange={(e) => setContactData({ ...contactData, subject: e.target.value })} required />
                        <textarea placeholder="Votre message" className={`${inputClasses} h-36 resize-none`} value={contactData.message} onChange={(e) => setContactData({ ...contactData, message: e.target.value })} required />
                        <button type="submit" className="flex items-center justify-center gap-3 bg-brand-rose text-white px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider hover:bg-brand-rose/90 transition-all rounded-full shadow-sm hover:shadow-lg hover:shadow-brand-rose/20 w-full md:w-auto">
                            Envoyer <Send size={14} />
                        </button>
                    </form>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
