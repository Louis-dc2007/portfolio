import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useFirestoreData } from './hooks/useFirestoreData';

// UI Components
import CustomCursor from './components/ui/CustomCursor';

// Layout Components
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';

// Auth Components
import LoginModal from './components/auth/LoginModal';

// Pages
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Education from './pages/Education';
import About from './pages/About';
import Photography from './pages/Photography';
import Journal from './pages/Journal';
import Contact from './pages/Contact';
import AdminConsole from './pages/admin/AdminConsole';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication
  const { user, isLoadingAuth, logoutAdmin } = useAuth();

  // Firestore Data
  const {
    projects, setProjects,
    journal, setJournal,
    experience, setExperience,
    education, setEducation,
    photos, setPhotos,
    loadingData
  } = useFirestoreData();

  // UI States
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode class toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/');
  };

  const handleNav = (id) => {
    navigate(id === 'home' ? '/' : `/${id}`);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 bg-[#FDFCF8] flex items-center justify-center">
        <h1 className="font-serif text-3xl animate-pulse tracking-tighter">LouisDC.</h1>
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
    <div className={`min-h-screen font-sans selection:bg-brand-teal selection:text-white dark:selection:bg-white dark:selection:text-brand-teal transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-white text-brand-teal'}`}>
      <CustomCursor />

      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />

      <Navbar
        location={location}
        handleNav={handleNav}
        navItems={navItems}
        user={user}
        setShowLogin={setShowLogin}
        handleLogout={handleLogout}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <MobileMenu
        isMenuOpen={isMenuOpen}
        handleNav={handleNav}
        navItems={navItems}
        user={user}
      />

      <main className={`${location.pathname !== '/' ? 'pt-24' : ''} min-h-screen`} key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} handleNav={handleNav} />} />
          <Route path="/experience" element={<Experience loading={loadingData.experience} experience={experience} />} />
          <Route path="/projects" element={<Projects loading={loadingData.projects} projects={projects} scrollY={scrollY} />} />
          <Route path="/education" element={<Education loading={loadingData.education} education={education} />} />
          <Route path="/about" element={<About />} />
          <Route path="/photography" element={<Photography loading={loadingData.photos} photos={photos} />} />
          <Route path="/journal" element={<Journal loading={loadingData.journal} journal={journal} scrollY={scrollY} />} />
          <Route path="/contact" element={<Contact />} />
          {user && !user.isAnonymous && <Route path="/admin" element={
            <AdminConsole
              user={user}
              handleLogout={handleLogout}
              projects={projects} setProjects={setProjects}
              journal={journal} setJournal={setJournal}
              experience={experience} setExperience={setExperience}
              education={education} setEducation={setEducation}
              photos={photos} setPhotos={setPhotos}
            />
          } />}
        </Routes>
      </main>

      <footer className="py-24 border-t border-brand-mint/30 dark:border-white/5 mt-20 bg-[#F9F9F9] dark:bg-neutral-900">
        <div className="max-w-[1400px] mx-auto px-10 md:px-[120px] flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-4xl font-bold tracking-tight mb-2 text-brand-bordeaux dark:text-white">LouisDC.</h4>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal/60 dark:text-neutral-500">LDC — Portfolio</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal/80 dark:text-neutral-500">
            <button onClick={() => handleNav('home')} className="hover:text-brand-blue dark:hover:text-white transition-colors">Accueil</button>
            <button onClick={() => handleNav('contact')} className="hover:text-brand-blue dark:hover:text-white transition-colors">Me contacter</button>
            {user && !user.isAnonymous ? (
              <button onClick={() => handleNav('admin')} className="hover:text-brand-coral transition-colors flex items-center gap-2">
                <Lock size={12} /> Console Admin
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="hover:text-brand-blue dark:hover:text-white transition-colors flex items-center gap-2">
                <Lock size={12} /> Accès Admin
              </button>
            )}
            <a href="https://www.instagram.com/louis_dc07/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue dark:hover:text-white transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/louis-da-costa2007/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue dark:hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-bordeaux/80 dark:text-neutral-600">© {new Date().getFullYear()} — Propriété de Louis D.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;