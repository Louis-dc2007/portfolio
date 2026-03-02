import React, { useState, useEffect } from 'react';
import {
  Github, Linkedin, ArrowRight, X,
  Lock, Plus, Trash2, LogOut, Newspaper, Briefcase,
  GraduationCap, User, Camera, Menu, Send, Upload, Image as ImageIcon
} from 'lucide-react';

// Firebase Imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInAnonymously
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

// --- CONFIGURATION FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyD5D0ScIwI-uE2rb5kW6E8Vyf1UhlgOlco",
  authDomain: "portfolio-3ee26.firebaseapp.com",
  projectId: "portfolio-3ee26",
  storageBucket: "portfolio-3ee26.firebasestorage.app",
  messagingSenderId: "654908808933",
  appId: "1:654908808933:web:2e7e0f5d47c7aa9bb9be0c",
  measurementId: "G-DPZC88V0F9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const portfolioId = "portfolio-louis";

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Data States
  const [projects, setProjects] = useState([]);
  const [journal, setJournal] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Admin Forms States
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', image: '' });
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newExp, setNewExp] = useState({ company: '', role: '', period: '', description: '' });
  const [newEdu, setNewEdu] = useState({ school: '', degree: '', period: '', description: '' });
  const [newPhoto, setNewPhoto] = useState({ image: '', caption: '' });

  // Contact Form State
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    const initAuth = async () => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser && !currentUser.isAnonymous) {
          setUser(currentUser);
        } else {
          setUser(null);
          if (!currentUser) {
            signInAnonymously(auth).catch((err) => console.error("Auth Anonyme:", err));
          }
        }
        setIsLoading(false);
      });
      return unsubscribe;
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const setupListener = (collectionName, setter) => {
      return onSnapshot(
        collection(db, 'artifacts', portfolioId, 'public', 'data', collectionName),
        (snapshot) => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
          setter(data);
        },
        (error) => console.error(`Erreur sur ${collectionName}:`, error)
      );
    };

    const unsubProjects = setupListener('projects', setProjects);
    const unsubJournal = setupListener('journal', setJournal);
    const unsubExp = setupListener('experience', setExperience);
    const unsubEdu = setupListener('education', setEducation);
    const unsubPhotos = setupListener('photos', setPhotos);

    return () => {
      unsubProjects();
      unsubJournal();
      unsubExp();
      unsubEdu();
      unsubPhotos();
    };
  }, [isLoading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
      setActiveTab('admin');
    } catch (error) {
      alert("Erreur d'authentification");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setActiveTab('home');
  };

  const handleNav = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleFileUpload = (e, setter, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addDocToFirestore = async (col, data, resetter, initialData) => {
    if (!user || user.isAnonymous) return;
    try {
      await addDoc(collection(db, 'artifacts', portfolioId, 'public', 'data', col), {
        ...data,
        createdAt: serverTimestamp()
      });
      resetter(initialData);
    } catch (err) {
      console.error("Erreur d'ajout:", err);
    }
  };

  const deleteItem = async (col, id) => {
    if (!user || user.isAnonymous) return;
    try {
      await deleteDoc(doc(db, 'artifacts', portfolioId, 'public', 'data', col, id));
    } catch (err) {
      console.error("Erreur de suppression:", err);
    }
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(contactData.subject || "Contact depuis le Portfolio");
    const body = encodeURIComponent(`Nom: ${contactData.name}\nEmail: ${contactData.email}\n\nMessage:\n${contactData.message}`);
    const mailtoLink = `mailto:louisdacosta@etik.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <h1 className="font-serif text-3xl animate-pulse tracking-tighter">Louis.</h1>
      </div>
    );
  }

  const navItems = [
    { id: 'experience', label: 'Expérience' },
    { id: 'projects', label: 'Projets' },
    { id: 'education', label: 'Formation' },
    { id: 'photography', label: 'Photographie' },
    { id: 'journal', label: 'Journal' },
    { id: 'about', label: 'À propos' }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white">

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white p-10 border border-neutral-200 shadow-2xl max-w-md w-full relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 transition-colors">
              <X size={24} />
            </button>
            <h2 className="font-serif text-4xl mb-8 flex items-center gap-4 tracking-tighter">
              <Lock size={28} /> Admin
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" placeholder="Email" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" placeholder="Mot de passe" required />
              <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest">Entrer</button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-8 h-24 flex items-center justify-between">
          <button onClick={() => handleNav('home')} className="font-serif text-3xl font-bold tracking-tighter">Louis.</button>

          <div className="hidden lg:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`hover:text-neutral-950 transition-colors ${activeTab === item.id ? 'text-neutral-950 border-b border-neutral-950' : ''}`}
              >
                {item.label}
              </button>
            ))}
            {user && !user.isAnonymous && (
              <button onClick={() => handleNav('admin')} className="text-rose-600">Console</button>
            )}
          </div>

          <div className="flex items-center gap-6">
            {!user || user.isAnonymous ? (
              <button onClick={() => setShowLogin(true)} className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-neutral-300 hover:text-neutral-950 underline underline-offset-8">Accès</button>
            ) : (
              <button onClick={handleLogout} className="text-neutral-400 hover:text-rose-600"><LogOut size={20} /></button>
            )}
            <button onClick={() => handleNav('contact')} className="bg-neutral-950 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all">Me contacter</button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} lg:hidden pt-24`}>
        <div className="flex flex-col justify-center px-12 h-full space-y-8">
          <button onClick={() => handleNav('home')} className="text-left font-serif text-5xl tracking-tighter">Accueil.</button>
          {navItems.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)} className="text-left font-serif text-5xl tracking-tighter text-neutral-400">{item.label}.</button>
          ))}
          <button onClick={() => handleNav('contact')} className="text-left font-serif text-5xl tracking-tighter text-neutral-400">Contact.</button>
          {user && !user.isAnonymous && <button onClick={() => handleNav('admin')} className="text-left font-serif text-5xl tracking-tighter text-rose-600">Admin.</button>}
        </div>
      </div>

      <main className="pt-24 min-h-screen">

        {/* Home Section */}
        {activeTab === 'home' && (
          <section className="animate-fade-in-up">
            <div className="max-w-[1400px] mx-auto px-8 py-20">
              <div className="mb-32">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8">EPITA — Cycle Préparatoire</p>
                <h1 className="font-serif text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tighter mb-12 italic">L'Art de la Logique.</h1>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 border border-neutral-100">
                {[
                  { id: 'experience', title: 'Expérience', desc: 'Mon parcours technique', icon: <Briefcase size={20} /> },
                  { id: 'projects', title: 'Projets', desc: 'Galerie de travaux', icon: <ArrowRight size={20} /> },
                  { id: 'education', title: 'Formation', desc: 'Cursus académique', icon: <GraduationCap size={20} /> },
                  { id: 'photography', title: 'Photographie', desc: 'Regards extérieurs', icon: <Camera size={20} /> },
                  { id: 'journal', title: 'Journal', desc: 'Notes & Réflexions', icon: <Newspaper size={20} /> },
                  { id: 'about', title: 'À Propos', desc: 'Ma vision du code', icon: <User size={20} /> }
                ].map((room) => (
                  <button
                    key={room.id}
                    onClick={() => handleNav(room.id)}
                    className="group bg-white p-12 text-left hover:bg-neutral-950 hover:text-white transition-all duration-500"
                  >
                    <div className="mb-12 opacity-40 group-hover:opacity-100 transition-opacity">{room.icon}</div>
                    <h3 className="font-serif text-4xl mb-4 tracking-tighter">{room.title}</h3>
                    <p className="text-xs uppercase tracking-widest opacity-40 group-hover:opacity-60">{room.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Expérience Section */}
        {activeTab === 'experience' && (
          <section className="max-w-[1000px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-7xl tracking-tighter mb-24 border-b border-neutral-200 pb-12">Expérience.</h2>
            <div className="space-y-24">
              {experience.map(exp => (
                <div key={exp.id} className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 pt-2">{exp.period}</div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-4xl mb-2">{exp.role}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-950 mb-4">{exp.company}</p>
                    <p className="text-xl text-neutral-500 font-light leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
              {experience.length === 0 && <p className="font-serif text-2xl italic text-neutral-300">Aucune expérience répertoriée.</p>}
            </div>
          </section>
        )}

        {/* Projets Section */}
        {activeTab === 'projects' && (
          <section className="max-w-[1600px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-8xl tracking-tighter mb-24 border-b border-neutral-100 pb-12">Projets.</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-32">
              {projects.map(p => (
                <div key={p.id} className="group">
                  <div className="aspect-[4/3] bg-neutral-50 overflow-hidden mb-8">
                    <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.title} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{p.category}</span>
                  <h3 className="font-serif text-4xl mt-4 mb-6">{p.title}</h3>
                  <p className="text-neutral-500 font-light text-lg leading-relaxed">{p.description}</p>
                </div>
              ))}
              {projects.length === 0 && <p className="font-serif text-2xl italic text-neutral-300">Aucun projet exposé pour le moment.</p>}
            </div>
          </section>
        )}

        {/* Formation Section */}
        {activeTab === 'education' && (
          <section className="max-w-[1000px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-7xl tracking-tighter mb-24 border-b border-neutral-200 pb-12">Formation.</h2>
            <div className="space-y-20">
              {education.map(edu => (
                <div key={edu.id} className="border-l-2 border-neutral-950 pl-12">
                  <h3 className="font-serif text-5xl mb-2">{edu.school}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">{edu.degree} · {edu.period}</p>
                  <p className="text-xl text-neutral-500 font-light leading-relaxed">{edu.description}</p>
                </div>
              ))}
              {education.length === 0 && <p className="font-serif text-2xl italic text-neutral-300">Aucune formation répertoriée.</p>}
            </div>
          </section>
        )}

        {/* À Propos Section */}
        {activeTab === 'about' && (
          <section className="max-w-[1200px] mx-auto px-8 py-32 animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden grayscale">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Portrait" />
              </div>
              <div className="space-y-12">
                <h2 className="font-serif text-8xl tracking-tighter italic">Bio.</h2>
                <p className="text-3xl font-light leading-tight text-neutral-800">Passionné par la structure et l'élégance algorithmique, je conçois le code comme une architecture invisible.</p>
                <p className="text-xl font-light text-neutral-500 leading-relaxed">Étudiant à l'EPITA Paris, je combine rigueur technique et curiosité créative.</p>
              </div>
            </div>
          </section>
        )}

        {/* Photographie Section */}
        {activeTab === 'photography' && (
          <section className="max-w-[1400px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-7xl tracking-tighter mb-24 border-b border-neutral-100 pb-12">Photographie.</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative overflow-hidden bg-neutral-100 border border-neutral-100">
                  <img src={photo.image} className="w-full grayscale hover:grayscale-0 transition-all duration-1000" alt={photo.caption} />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] font-bold uppercase tracking-widest">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
              {photos.length === 0 && <p className="font-serif text-2xl italic text-neutral-300">Galerie vide.</p>}
            </div>
          </section>
        )}

        {/* Journal Section */}
        {activeTab === 'journal' && (
          <section className="max-w-[800px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-7xl tracking-tighter mb-24 border-b border-neutral-100 pb-12">Journal.</h2>
            <div className="space-y-32">
              {journal.map(post => (
                <article key={post.id} className="relative pl-16 border-l border-neutral-100 hover:border-neutral-950 transition-colors duration-500">
                  <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-white border border-neutral-950 rounded-full"></span>
                  <time className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6 block">{post.date}</time>
                  <h3 className="font-serif text-5xl mb-8 tracking-tighter">{post.title}</h3>
                  <div className="text-2xl text-neutral-500 font-light leading-relaxed whitespace-pre-wrap italic">"{post.content}"</div>
                </article>
              ))}
              {journal.length === 0 && <p className="font-serif text-2xl italic text-neutral-300">Journal vide pour le moment.</p>}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <section className="max-w-[800px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-7xl tracking-tighter mb-24 border-b border-neutral-100 pb-12">Contact.</h2>
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-5 space-y-8">
                <p className="text-xl font-light text-neutral-500 leading-relaxed italic">
                  Une question sur un projet ? N'hésitez pas à me contacter via ce formulaire.
                </p>
                <p className="font-serif text-lg">louisdacosta@etik.com</p>
              </div>
              <div className="md:col-span-7">
                <form onSubmit={handleSubmitContact} className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <input type="text" placeholder="Nom" className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950" value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} required />
                    <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950" value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} required />
                  </div>
                  <input type="text" placeholder="Objet" className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950" value={contactData.subject} onChange={(e) => setContactData({ ...contactData, subject: e.target.value })} required />
                  <textarea placeholder="Message" className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none h-32" value={contactData.message} onChange={(e) => setContactData({ ...contactData, message: e.target.value })} required />
                  <button type="submit" className="flex items-center gap-4 bg-neutral-950 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all">
                    Envoyer le message <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Console Admin Section */}
        {activeTab === 'admin' && user && !user.isAnonymous && (
          <section className="max-w-[1200px] mx-auto px-8 py-32 animate-fade-in-up pb-60">
            <header className="mb-20 border-b border-rose-100 pb-8 flex justify-between items-center">
              <h2 className="font-serif text-6xl tracking-tighter text-rose-600 flex items-center gap-4"><Lock size={40} /> Console</h2>
              <button onClick={handleLogout} className="text-neutral-400 hover:text-rose-600 font-bold text-[10px] uppercase tracking-widest border border-neutral-100 px-4 py-2">Déconnexion</button>
            </header>

            <div className="grid lg:grid-cols-2 gap-x-20 gap-y-32">

              {/* Projets Admin */}
              <div className="space-y-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Gérer les Projets</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addDocToFirestore('projects', newProject, setNewProject, { title: '', category: '', description: '', image: '' });
                  }}
                  className="space-y-6 bg-neutral-50 p-10"
                >
                  <input type="text" placeholder="Titre" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                  <input type="text" placeholder="Catégorie" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })} required />
                  <textarea placeholder="Description" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none h-24" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required />

                  {/* Upload Image Projet */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 p-8 hover:border-neutral-950 transition-colors cursor-pointer bg-white">
                    {newProject.image ? (
                      <img src={newProject.image} className="max-h-32 mb-2" alt="Aperçu" />
                    ) : (
                      <Upload size={24} className="text-neutral-300 mb-2" />
                    )}
                    <span className="text-[10px] font-bold uppercase">Image du projet (PC)</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setNewProject, 'image')} />
                  </label>

                  <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest">Publier Projet</button>
                </form>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {projects.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-white border border-neutral-100">
                      <span className="font-serif truncate mr-4">{p.title}</span>
                      <button onClick={() => deleteItem('projects', p.id)} className="text-rose-600 flex-shrink-0"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journal Admin */}
              <div className="space-y-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Gérer le Journal</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addDocToFirestore('journal', newPost, setNewPost, { title: '', content: '' });
                  }}
                  className="space-y-6 bg-neutral-50 p-10"
                >
                  <input type="text" placeholder="Titre de la note" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} required />
                  <textarea placeholder="Réflexion..." className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none h-44" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} required />
                  <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest">Enregistrer Note</button>
                </form>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {journal.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-white border border-neutral-100">
                      <span className="font-serif truncate mr-4">{post.title}</span>
                      <button onClick={() => deleteItem('journal', post.id)} className="text-rose-600 flex-shrink-0"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expérience Admin */}
              <div className="space-y-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Gérer les Expériences</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addDocToFirestore('experience', newExp, setNewExp, { company: '', role: '', period: '', description: '' });
                  }}
                  className="space-y-6 bg-neutral-50 p-10"
                >
                  <input type="text" placeholder="Entreprise" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} required />
                  <input type="text" placeholder="Rôle" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} required />
                  <input type="text" placeholder="Période (ex: 2023 - 2024)" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newExp.period} onChange={e => setNewExp({ ...newExp, period: e.target.value })} required />
                  <textarea placeholder="Détails..." className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none h-24" value={newExp.description} onChange={e => setNewExp({ ...newExp, description: e.target.value })} required />
                  <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest">Ajouter Expérience</button>
                </form>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {experience.map(exp => (
                    <div key={exp.id} className="flex items-center justify-between p-4 bg-white border border-neutral-100">
                      <span className="font-serif truncate mr-4">{exp.role} @ {exp.company}</span>
                      <button onClick={() => deleteItem('experience', exp.id)} className="text-rose-600 flex-shrink-0"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formation Admin */}
              <div className="space-y-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Gérer les Formations</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addDocToFirestore('education', newEdu, setNewEdu, { school: '', degree: '', period: '', description: '' });
                  }}
                  className="space-y-6 bg-neutral-50 p-10"
                >
                  <input type="text" placeholder="École" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newEdu.school} onChange={e => setNewEdu({ ...newEdu, school: e.target.value })} required />
                  <input type="text" placeholder="Diplôme" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newEdu.degree} onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })} required />
                  <input type="text" placeholder="Période" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newEdu.period} onChange={e => setNewEdu({ ...newEdu, period: e.target.value })} required />
                  <textarea placeholder="Détails..." className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none h-24" value={newEdu.description} onChange={e => setNewEdu({ ...newEdu, description: e.target.value })} required />
                  <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest">Ajouter Formation</button>
                </form>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {education.map(edu => (
                    <div key={edu.id} className="flex items-center justify-between p-4 bg-white border border-neutral-100">
                      <span className="font-serif truncate mr-4">{edu.degree} @ {edu.school}</span>
                      <button onClick={() => deleteItem('education', edu.id)} className="text-rose-600 flex-shrink-0"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photographie Admin */}
              <div className="space-y-10 lg:col-span-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Gérer la Galerie Photo</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addDocToFirestore('photos', newPhoto, setNewPhoto, { image: '', caption: '' });
                  }}
                  className="bg-neutral-50 p-10 grid md:grid-cols-2 gap-10"
                >
                  <div className="space-y-6">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 p-12 hover:border-neutral-950 transition-colors cursor-pointer bg-white">
                      {newPhoto.image ? (
                        <img src={newPhoto.image} className="w-full max-h-40 object-contain mb-4" alt="Aperçu" />
                      ) : (
                        <Upload size={32} className="text-neutral-300 mb-2" />
                      )}
                      <span className="text-[10px] font-bold uppercase">Sélectionner un fichier</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setNewPhoto, 'image')} />
                    </label>
                    <input type="text" placeholder="Légende (Optionnel)" className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none" value={newPhoto.caption} onChange={e => setNewPhoto({ ...newPhoto, caption: e.target.value })} />
                    <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest">Ajouter à la galerie</button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 overflow-y-auto max-h-[400px]">
                    {photos.map(photo => (
                      <div key={photo.id} className="relative aspect-square border border-neutral-100 group">
                        <img src={photo.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0" alt="Galerie" />
                        <button onClick={() => deleteItem('photos', photo.id)} className="absolute top-1 right-1 bg-white p-1 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </form>
              </div>

            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-neutral-100 mt-20 bg-neutral-50/50">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-3xl font-bold tracking-tighter mb-4">Louis.</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">EPITA Paris — Portfolio</p>
          </div>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            <button onClick={() => handleNav('home')} className="hover:text-neutral-950 transition-colors">Accueil</button>
            <a href="#" className="hover:text-neutral-950 transition-colors">GitHub</a>
            <a href="#" className="hover:text-neutral-950 transition-colors">LinkedIn</a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">© {new Date().getFullYear()} — Propriété de Louis D.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;