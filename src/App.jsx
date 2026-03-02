import React, { useState, useEffect } from 'react';
import {
  Github, Linkedin, ArrowRight, X,
  Lock, Plus, Trash2, LogOut, Newspaper, Briefcase,
  GraduationCap, User, Home
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
  serverTimestamp,
  query,
  orderBy
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [projects, setProjects] = useState([]);
  const [journal, setJournal] = useState([]);

  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', image: '' });
  const [newPost, setNewPost] = useState({ title: '', content: '' });

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

    const unsubProjects = onSnapshot(
      collection(db, 'artifacts', portfolioId, 'public', 'data', 'projects'),
      (snapshot) => {
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    const unsubJournal = onSnapshot(
      collection(db, 'artifacts', portfolioId, 'public', 'data', 'journal'),
      (snapshot) => {
        const sortedJournal = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setJournal(sortedJournal);
      }
    );

    return () => {
      unsubProjects();
      unsubJournal();
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

  const addProject = async (e) => {
    e.preventDefault();
    if (!user || user.isAnonymous) return;
    await addDoc(collection(db, 'artifacts', portfolioId, 'public', 'data', 'projects'), {
      ...newProject,
      createdAt: serverTimestamp()
    });
    setNewProject({ title: '', category: '', description: '', image: '' });
  };

  const addJournalEntry = async (e) => {
    e.preventDefault();
    if (!user || user.isAnonymous) return;
    await addDoc(collection(db, 'artifacts', portfolioId, 'public', 'data', 'journal'), {
      ...newPost,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      createdAt: serverTimestamp()
    });
    setNewPost({ title: '', content: '' });
  };

  const deleteItem = async (col, id) => {
    if (!user || user.isAnonymous) return;
    await deleteDoc(doc(db, 'artifacts', portfolioId, 'public', 'data', col, id));
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-neutral-200 border-t-neutral-950 rounded-full animate-spin"></div>
          <span className="font-serif text-2xl tracking-tighter">Louis D.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white">

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white p-12 border border-neutral-200 shadow-2xl max-w-md w-full relative animate-fade-in-up">
            <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 transition-colors">
              <X size={24} />
            </button>
            <h2 className="font-serif text-4xl mb-8 flex items-center gap-4 tracking-tighter">
              <Lock size={28} /> Administration
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" placeholder="admin@portfolio.com" required />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all">Se connecter</button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-8 h-24 flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="font-serif text-3xl font-bold tracking-tighter hover:opacity-70 transition-opacity">Louis.</button>

          <div className="hidden lg:flex items-center space-x-10 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            {[
              { id: 'projects', label: 'Projets', icon: <Briefcase size={12} /> },
              { id: 'journal', label: 'Journal', icon: <Newspaper size={12} /> },
              { id: 'experience', label: 'Parcours', icon: <GraduationCap size={12} /> },
              { id: 'about', label: 'Bio', icon: <User size={12} /> }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 hover:text-neutral-950 transition-colors ${activeTab === tab.id ? 'text-neutral-950 border-b border-neutral-950 pb-1' : ''}`}>
                {tab.label}
              </button>
            ))}
            {user && !user.isAnonymous && (
              <button onClick={() => setActiveTab('admin')} className={`flex items-center gap-2 ${activeTab === 'admin' ? 'text-rose-600' : 'text-neutral-400 hover:text-rose-600 transition-colors'}`}>
                <Lock size={12} /> Console
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            {(!user || user.isAnonymous) ? (
              <button onClick={() => setShowLogin(true)} className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 hover:text-neutral-950 transition-colors underline underline-offset-8">Accès</button>
            ) : (
              <button onClick={handleLogout} className="text-neutral-400 hover:text-rose-600 transition-colors"><LogOut size={20} /></button>
            )}
            <a href="mailto:louis@epita.fr" className="bg-neutral-950 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all hidden sm:block">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 min-h-screen">

        {/* Home Section */}
        {activeTab === 'home' && (
          <section className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row overflow-hidden animate-fade-in-up">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-32 py-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-10 inline-flex items-center gap-4">
                <span className="w-12 h-px bg-neutral-950"></span> EPITA Ingénierie
              </p>
              <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tighter mb-12">Code &<br />Pureté.</h1>
              <div className="flex gap-6 items-center">
                <button onClick={() => setActiveTab('projects')} className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest bg-neutral-950 text-white px-10 py-5 hover:bg-neutral-800 transition-all">
                  Portfolio <ArrowRight size={18} />
                </button>
                <div className="flex gap-4 text-neutral-400">
                  <a href="#" className="hover:text-neutral-950 transition-colors"><Github size={20} /></a>
                  <a href="#" className="hover:text-neutral-950 transition-colors"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 h-full bg-neutral-50 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000" alt="Hero" />
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <section className="max-w-[1600px] mx-auto px-8 py-32 animate-fade-in-up">
            <header className="mb-24 border-b border-neutral-100 pb-12 flex justify-between items-end">
              <div>
                <h2 className="font-serif text-8xl tracking-tighter mb-4">Projets.</h2>
                <p className="text-neutral-400 text-sm tracking-widest uppercase font-bold">Sélection de travaux académiques & personnels</p>
              </div>
              <p className="text-xs font-serif italic text-neutral-300">Total: {projects.length}</p>
            </header>

            {projects.length === 0 ? (
              <div className="py-40 text-center border-2 border-dashed border-neutral-100 rounded-3xl">
                <Briefcase size={48} className="mx-auto text-neutral-100 mb-6" />
                <p className="text-neutral-400 font-serif text-2xl">La galerie est en cours d'actualisation.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-40">
                {projects.map(p => (
                  <div key={p.id} className="group">
                    <div className="overflow-hidden bg-neutral-50 mb-10 aspect-[5/4] relative shadow-sm">
                      <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={p.title} />
                      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 text-[10px] font-bold text-white uppercase tracking-widest border border-white/30">{p.category}</div>
                    </div>
                    <h3 className="font-serif text-5xl mb-6 group-hover:translate-x-4 transition-transform duration-500">{p.title}</h3>
                    <p className="text-neutral-500 font-light leading-relaxed text-lg max-w-md">{p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Journal Section */}
        {activeTab === 'journal' && (
          <section className="max-w-[1000px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-7xl tracking-tighter mb-24 flex items-center gap-6">Journal.</h2>
            <div className="space-y-40">
              {journal.map(post => (
                <article key={post.id} className="border-l-2 border-neutral-100 pl-16 hover:border-neutral-950 transition-colors duration-700 group">
                  <time className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8 block">{post.date}</time>
                  <h3 className="font-serif text-6xl mb-10 tracking-tighter group-hover:text-neutral-700 transition-colors">{post.title}</h3>
                  <div className="text-2xl text-neutral-500 font-light leading-relaxed whitespace-pre-wrap">{post.content}</div>
                </article>
              ))}
              {journal.length === 0 && (
                <p className="text-center text-neutral-300 py-20 font-serif text-2xl italic font-light">Le journal est encore vierge.</p>
              )}
            </div>
          </section>
        )}

        {/* Experience & Education */}
        {activeTab === 'experience' && (
          <section className="max-w-[1200px] mx-auto px-8 py-32 animate-fade-in-up">
            <h2 className="font-serif text-7xl tracking-tighter mb-24">Parcours Académique.</h2>
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="space-y-16">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-b border-neutral-100 pb-4 flex items-center gap-4">
                  <GraduationCap size={16} /> Formation
                </h3>
                <div className="space-y-12">
                  <div className="group">
                    <p className="text-xs font-bold text-neutral-900 mb-2">2023 — Présent</p>
                    <h4 className="font-serif text-3xl mb-4">EPITA</h4>
                    <p className="text-neutral-500 font-light text-lg italic">Cycle Préparatoire Intégré</p>
                    <p className="text-neutral-400 mt-4 leading-relaxed font-light">Apprentissage des fondamentaux de l'informatique, mathématiques appliquées et algorithmique rigoureuse.</p>
                  </div>
                  <div className="group opacity-60">
                    <p className="text-xs font-bold text-neutral-900 mb-2">2023</p>
                    <h4 className="font-serif text-3xl mb-4">Baccalauréat Général</h4>
                    <p className="text-neutral-500 font-light text-lg italic">Spécialités Mathématiques & NSI</p>
                    <p className="text-neutral-400 mt-4 leading-relaxed font-light">Mention Très Bien. Premier contact approfondi avec la programmation et la logique système.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-16">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-b border-neutral-100 pb-4 flex items-center gap-4">
                  <Briefcase size={16} /> Compétences
                </h3>
                <div className="grid grid-cols-2 gap-8 text-[11px] font-bold uppercase tracking-widest">
                  <div className="p-6 border border-neutral-100 hover:border-neutral-950 transition-colors">C / C++</div>
                  <div className="p-6 border border-neutral-100 hover:border-neutral-950 transition-colors">Python</div>
                  <div className="p-6 border border-neutral-100 hover:border-neutral-950 transition-colors">Algorithms</div>
                  <div className="p-6 border border-neutral-100 hover:border-neutral-950 transition-colors">Systems</div>
                  <div className="p-6 border border-neutral-100 hover:border-neutral-950 transition-colors">React</div>
                  <div className="p-6 border border-neutral-100 hover:border-neutral-950 transition-colors">Firebase</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bio Section */}
        {activeTab === 'about' && (
          <section className="max-w-[1400px] mx-auto px-8 py-32 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row gap-24 items-center">
              <div className="w-full lg:w-2/5 aspect-[4/5] bg-neutral-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale brightness-90" alt="Louis Portrait" />
              </div>
              <div className="w-full lg:w-3/5 space-y-12">
                <h2 className="font-serif text-8xl tracking-tighter">Louis D.</h2>
                <div className="space-y-8 text-2xl font-light leading-relaxed text-neutral-600">
                  <p>Étudiant à l'EPITA, passionné par la résolution de problèmes complexes et l'esthétique du code. Mon approche de l'ingénierie est guidée par la recherche de la simplicité et de l'efficience.</p>
                  <p>Au-delà du terminal, je m'intéresse à l'architecture et à la photographie de rue, des disciplines qui nourrissent ma vision de la composition et de la structure dans le logiciel.</p>
                </div>
                <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest border-b border-neutral-950 pb-2 hover:opacity-50 transition-opacity">Télécharger CV / Portfolio PDF</button>
              </div>
            </div>
          </section>
        )}

        {/* Admin Console */}
        {activeTab === 'admin' && user && !user.isAnonymous && (
          <section className="max-w-[1400px] mx-auto px-8 py-32 animate-fade-in-up bg-neutral-50/50 min-h-screen">
            <header className="mb-20">
              <h2 className="font-serif text-6xl tracking-tighter mb-4 flex items-center gap-6 text-rose-600"><Lock size={40} /> Console Admin</h2>
              <p className="text-neutral-400 font-bold uppercase text-[11px] tracking-widest">Gestionnaire de contenu en temps réel</p>
            </header>

            <div className="grid lg:grid-cols-2 gap-20">
              {/* Projects Form */}
              <div className="space-y-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200 pb-4">Nouveau Projet</h3>
                <form onSubmit={addProject} className="space-y-6 bg-white p-10 border border-neutral-200 shadow-sm">
                  <input type="text" placeholder="Titre" className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                  <input type="text" placeholder="Catégorie (ex: Python, Web)" className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })} required />
                  <textarea placeholder="Description détaillée" className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent h-32" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required />
                  <input type="text" placeholder="URL de l'image (Unsplash)" className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })} required />
                  <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 flex items-center justify-center gap-3">
                    <Plus size={16} /> Publier le projet
                  </button>
                </form>
                <div className="space-y-3">
                  {projects.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-5 bg-white border border-neutral-100 hover:border-neutral-300 transition-colors group">
                      <div>
                        <p className="font-serif text-lg">{p.title}</p>
                        <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">{p.category}</p>
                      </div>
                      <button onClick={() => deleteItem('projects', p.id)} className="text-neutral-200 hover:text-rose-600 p-2"><Trash2 size={20} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journal Form */}
              <div className="space-y-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200 pb-4">Note Journal</h3>
                <form onSubmit={addJournalEntry} className="space-y-6 bg-white p-10 border border-neutral-200 shadow-sm">
                  <input type="text" placeholder="Titre de la note" className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} required />
                  <textarea placeholder="Exprimez une réflexion..." className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-neutral-950 bg-transparent h-64" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} required />
                  <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 flex items-center justify-center gap-3">
                    <Plus size={16} /> Enregistrer la note
                  </button>
                </form>
                <div className="space-y-3">
                  {journal.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-5 bg-white border border-neutral-100 hover:border-neutral-300 transition-colors">
                      <div>
                        <p className="font-serif text-lg">{post.title}</p>
                        <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">{post.date}</p>
                      </div>
                      <button onClick={() => deleteItem('journal', post.id)} className="text-neutral-200 hover:text-rose-600 p-2"><Trash2 size={20} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-4xl font-bold tracking-tighter mb-4">Louis.</h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 max-w-[200px]">Conception logicielle & Design éditorial</p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            <button onClick={() => setActiveTab('home')} className="hover:text-neutral-950 transition-colors">Accueil</button>
            <button onClick={() => setActiveTab('projects')} className="hover:text-neutral-950 transition-colors">Projets</button>
            <button onClick={() => setActiveTab('journal')} className="hover:text-neutral-950 transition-colors">Journal</button>
            <a href="#" className="hover:text-neutral-950 transition-colors">LinkedIn</a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300">© {new Date().getFullYear()} — EPITA Paris</p>
        </div>
      </footer>
    </div>
  );
};

export default App;