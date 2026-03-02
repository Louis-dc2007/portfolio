import React, { useState, useEffect } from 'react';
import { BookOpen, Github, Linkedin, ArrowRight, Menu, X, Lock, Plus, Trash2, Edit2 } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowLogin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    { id: 'experience', label: 'Expérience' },
    { id: 'projects', label: 'Projets' },
    { id: 'education', label: 'Formation' },
    { id: 'about', label: 'À propos' },
    { id: 'photography', label: 'Photographie' },
    { id: 'journal', label: 'Journal' }
  ];

  const projects = [
    {
      id: 1,
      title: "Simulation d'Automates",
      category: "C / Algorithmique",
      description: "Moteur de résolution et de simulation d'automates finis déterministes. Une approche mathématique de la théorie des langages.",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Analyse de Données",
      category: "Python / Data",
      description: "Traitement par lots et analyse colorimétrique complexe. Génération de modèles prédictifs basés sur des données brutes.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const photos = [
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800"
  ];

  const journalEntries = [
    {
      id: 1,
      date: "02 Mars 2026",
      content: "Aujourd'hui, j'ai implémenté un nouvel algorithme de tri. La complexité est bien meilleure que la version précédente. C'est fascinant de voir l'impact d'une structure de données adaptée.",
      image: null
    },
    {
      id: 2,
      date: "28 Février 2026",
      content: "Session photo argentique dans les rues de Paris ce matin. La lumière d'hiver est dure, très contrastée, parfaite pour le style que je recherche actuellement. Début du développement ce soir.",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
      setActiveTab('admin');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white">

      <div className={`fixed inset-0 bg-neutral-950 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="overflow-hidden">
          <h1 className="text-white font-serif text-5xl md:text-7xl tracking-tighter animate-pulse">
            Portfolio.
          </h1>
        </div>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[90] flex items-center justify-center">
          <div className="bg-white p-8 border border-neutral-200 shadow-2xl max-w-md w-full relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-950"
            >
              <X size={20} />
            </button>
            <h2 className="font-serif text-3xl mb-6 flex items-center gap-3">
              <Lock size={24} /> Accès Réservé
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-neutral-200 py-2 focus:outline-none focus:border-neutral-950 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neutral-950 text-white py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
              >
                Déverrouiller
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
          <button
            onClick={() => handleNavClick('home')}
            className="font-serif text-3xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
          >
            Portfolio.
          </button>

          <div className="hidden lg:flex space-x-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-neutral-950 transition-colors py-2 ${activeTab === item.id ? 'text-neutral-950 border-b border-neutral-950' : ''}`}
              >
                {item.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`hover:text-neutral-950 transition-colors py-2 text-rose-600 ${activeTab === 'admin' ? 'border-b border-rose-600' : ''}`}
              >
                Admin
              </button>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {isAdmin && (
              <button onClick={handleLogout} className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-950">
                Déconnexion
              </button>
            )}
            <a href="mailto:contact@exemple.com" className="px-6 py-3 border border-neutral-950 text-neutral-950 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-950 hover:text-white transition-all duration-500 rounded-none">
              Contact
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-neutral-950"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} lg:hidden pt-24 flex flex-col`}>
        <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left font-serif text-5xl tracking-tighter text-neutral-400 hover:text-neutral-950 transition-colors"
          >
            Accueil.
          </button>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left font-serif text-5xl tracking-tighter transition-colors ${activeTab === item.id ? 'text-neutral-950' : 'text-neutral-400 hover:text-neutral-950'}`}
            >
              {item.label}.
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left font-serif text-5xl tracking-tighter transition-colors text-rose-600`}
            >
              Admin.
            </button>
          )}
        </div>
        <div className="p-8 border-t border-neutral-200">
          <a href="mailto:contact@exemple.com" className="block w-full text-center py-4 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-[0.2em]">
            Me contacter
          </a>
        </div>
      </div>

      <main className="pt-24 min-h-screen">
        {activeTab === 'home' && (
          <section className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 relative z-10">
              <div className="animate-fade-in-up">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 mb-8 border-l border-neutral-950 pl-4">
                  EPITA — Cycle Préparatoire
                </p>
                <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter mb-8">
                  L'Art de<br />la Logique.
                </h1>
                <p className="text-lg text-neutral-600 max-w-md font-light leading-relaxed mb-12">
                  Conception logicielle et architecture système. Une approche rigoureuse et esthétique de l'ingénierie informatique.
                </p>
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => handleNavClick('projects')}
                    className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] hover:text-neutral-500 transition-colors"
                  >
                    Découvrir <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-1/2 h-full bg-neutral-100 relative overflow-hidden p-8 pb-0">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                alt="Architecture"
                className="w-full h-full object-cover grayscale contrast-125 object-top"
              />
            </div>
          </section>
        )}

        {activeTab === 'experience' && (
          <section className="max-w-[1000px] mx-auto px-6 py-32 animate-fade-in-up">
            <h2 className="font-serif text-5xl lg:text-7xl tracking-tighter mb-24 border-b border-neutral-200 pb-12">Expérience.</h2>
            <div className="space-y-24">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 pt-2">
                  2023 — Présent
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-3xl mb-4 text-neutral-950">Projets Académiques Intensifs</h3>
                  <p className="text-neutral-600 font-light leading-relaxed text-lg mb-6">
                    Développement de solutions logicielles dans le cadre de la classe préparatoire. Focalisation sur l'optimisation, la gestion de la mémoire et l'architecture algorithmique.
                  </p>
                  <div className="flex gap-4">
                    <span className="text-xs border border-neutral-200 px-3 py-1 text-neutral-500">Algorithmique</span>
                    <span className="text-xs border border-neutral-200 px-3 py-1 text-neutral-500">C</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 pt-2">
                  2022 — 2023
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-3xl mb-4 text-neutral-950">Initiation Développement</h3>
                  <p className="text-neutral-600 font-light leading-relaxed text-lg">
                    Premiers scripts Python et découverte de la logique de programmation. Création de petits outils d'automatisation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'education' && (
          <section className="max-w-[1000px] mx-auto px-6 py-32 animate-fade-in-up">
            <h2 className="font-serif text-5xl lg:text-7xl tracking-tighter mb-24 border-b border-neutral-200 pb-12">Formation.</h2>
            <div className="space-y-20">
              <div className="group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="font-serif text-4xl text-neutral-950 group-hover:pl-4 transition-all duration-300">EPITA</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mt-2 md:mt-0">2023 — Présent</span>
                </div>
                <p className="text-xl font-light text-neutral-600 border-l border-neutral-950 pl-6 ml-1 mt-6">
                  Cycle Préparatoire. Formation d'ingénieur en intelligence informatique.
                  Spécialisation en algorithmique, architecture des ordinateurs et mathématiques fondamentales.
                </p>
              </div>

              <div className="group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="font-serif text-4xl text-neutral-950 group-hover:pl-4 transition-all duration-300">Lycée Général</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mt-2 md:mt-0">Obtenu en 2023</span>
                </div>
                <p className="text-xl font-light text-neutral-600 border-l border-neutral-200 pl-6 ml-1 mt-6">
                  Baccalauréat Scientifique. Spécialités Mathématiques et Physique-Chimie. Mention Très Bien.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'about' && (
          <section className="max-w-[1400px] mx-auto px-6 py-32 animate-fade-in-up">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-5xl lg:text-7xl tracking-tighter mb-12">À<br />propos.</h2>
                <div className="flex gap-6">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="p-4 border border-neutral-200 hover:border-neutral-950 transition-colors">
                    <Github size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-4 border border-neutral-200 hover:border-neutral-950 transition-colors">
                    <Linkedin size={20} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-16">
                <div className="space-y-6">
                  <p className="text-xl text-neutral-800 leading-relaxed font-light">
                    Actuellement en première année de classe préparatoire à l'EPITA, mon quotidien est rythmé par la rigueur mathématique et la conception bas niveau.
                  </p>
                  <p className="text-xl text-neutral-800 leading-relaxed font-light">
                    Je conçois le code non pas seulement comme un outil fonctionnel, mais comme une architecture qui se doit d'être élégante, lisible et performante. La créativité que j'exerce en photographie nourrit ma vision de l'ingénierie : un équilibre entre technique pure et composition visuelle.
                  </p>
                  <button className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] border-b border-neutral-950 pb-2 mt-8 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                    Curriculum Vitae <BookOpen size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section className="max-w-[1400px] mx-auto px-6 py-32 animate-fade-in-up">
            <div className="flex justify-between items-end mb-20 border-b border-neutral-200 pb-12">
              <h2 className="font-serif text-5xl lg:text-7xl tracking-tighter">Sélection<br />de Projets.</h2>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 hidden md:block">
                Archive 2023-2024
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
              {projects.map(project => (
                <div key={project.id} className="group cursor-pointer">
                  <div className="overflow-hidden bg-neutral-100 mb-8 aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-3xl tracking-tight text-neutral-950 mb-4 group-hover:underline decoration-1 underline-offset-4">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'photography' && (
          <section className="max-w-[1400px] mx-auto px-6 py-32 animate-fade-in-up">
            <div className="flex justify-between items-end mb-20 border-b border-neutral-200 pb-12">
              <h2 className="font-serif text-5xl lg:text-7xl tracking-tighter">Galerie<br />Photographique.</h2>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 hidden md:block">
                Tirages 35mm & Numérique
              </p>
            </div>

            <div className="columns-1 md:columns-2 gap-8 space-y-8">
              {photos.map((photo, index) => (
                <div key={index} className="break-inside-avoid relative group cursor-crosshair">
                  <img
                    src={photo}
                    alt={`Photographie ${index + 1}`}
                    className="w-full h-auto object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'journal' && (
          <section className="max-w-[800px] mx-auto px-6 py-32 animate-fade-in-up">
            <div className="flex justify-between items-end mb-20 border-b border-neutral-200 pb-12">
              <h2 className="font-serif text-5xl lg:text-7xl tracking-tighter">Journal.</h2>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 hidden md:block">
                Notes & Réflexions
              </p>
            </div>

            <div className="space-y-24">
              {journalEntries.map(entry => (
                <article key={entry.id} className="relative pl-8 md:pl-16 border-l border-neutral-200">
                  <span className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 bg-neutral-950 rounded-full"></span>
                  <time className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 block mb-6">
                    {entry.date}
                  </time>
                  <p className="text-xl text-neutral-800 leading-relaxed font-light mb-8 font-serif italic">
                    "{entry.content}"
                  </p>
                  {entry.image && (
                    <div className="overflow-hidden bg-neutral-100 aspect-video mt-8">
                      <img
                        src={entry.image}
                        alt="Illustration du journal"
                        className="w-full h-full object-cover grayscale contrast-125"
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'admin' && isAdmin && (
          <section className="max-w-[1000px] mx-auto px-6 py-32 animate-fade-in-up">
            <h2 className="font-serif text-5xl tracking-tighter mb-16 border-b border-neutral-200 pb-8">Tableau de Bord.</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <button className="flex flex-col items-center justify-center p-8 border border-neutral-200 hover:border-neutral-950 transition-colors group">
                <Plus size={32} strokeWidth={1} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Nouveau Projet</span>
              </button>
              <button className="flex flex-col items-center justify-center p-8 border border-neutral-200 hover:border-neutral-950 transition-colors group">
                <Plus size={32} strokeWidth={1} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Ajouter Photo</span>
              </button>
              <button className="flex flex-col items-center justify-center p-8 border border-neutral-200 hover:border-neutral-950 transition-colors group">
                <Plus size={32} strokeWidth={1} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Note Journal</span>
              </button>
            </div>

            <div className="space-y-16">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-200 pb-2">Projets Existants</h3>
                <ul className="space-y-4">
                  {projects.map(p => (
                    <li key={p.id} className="flex items-center justify-between p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                      <span className="font-serif text-xl">{p.title}</span>
                      <div className="flex gap-4">
                        <button className="text-neutral-400 hover:text-neutral-950"><Edit2 size={18} /></button>
                        <button className="text-neutral-400 hover:text-rose-600"><Trash2 size={18} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="py-12 border-t border-neutral-200 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          <p>© {new Date().getFullYear()} — EPITA</p>
          <p className="mt-4 md:mt-0">Design Éditorial</p>
        </div>
      </footer>
    </div>
  );
};

export default App;