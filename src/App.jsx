import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useFirestoreData } from './hooks/useFirestoreData';

// UI Components

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
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <h1 className="font-heading text-2xl font-bold animate-pulse tracking-tight text-neutral-900">LouisDC<span className="text-brand-purple">.</span></h1>
      </div>
    );
  }

  const navItems = [
    { id: 'experience', label: 'Expérience' },
    { id: 'projects', label: 'Projets' },
    { id: 'education', label: 'Formation' },
    { id: 'photography', label: 'Photographie' },
    { id: 'about', label: 'À propos' }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`}>

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

      <main className="min-h-screen" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} handleNav={handleNav} projects={projects} />} />
          <Route path="/experience" element={<Experience loading={loadingData.experience} experience={experience} />} />
          <Route path="/projects" element={<Projects loading={loadingData.projects} projects={projects} scrollY={scrollY} />} />
          <Route path="/education" element={<Education loading={loadingData.education} education={education} />} />
          <Route path="/about" element={<About />} />
          <Route path="/photography" element={<Photography loading={loadingData.photos} photos={photos} />} />
          <Route path="/contact" element={<Contact />} />
          {user && !user.isAnonymous && <Route path="/admin" element={
            <AdminConsole
              user={user}
              handleLogout={handleLogout}
              projects={projects} setProjects={setProjects}
              experience={experience} setExperience={setExperience}
              education={education} setEducation={setEducation}
              photos={photos} setPhotos={setPhotos}
            />
          } />}
        </Routes>
      </main>

      {/* Footer */}
      <footer className="py-16 md:py-20 bg-neutral-900 dark:bg-neutral-950 mt-20 border-t border-brand-gold/20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-[120px] flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h4 className="font-heading text-xl font-bold tracking-tight mb-1 text-white">LouisDC<span className="text-brand-purple">.</span></h4>
            <p className="text-xs text-neutral-500">Portfolio — Édition 2026</p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-xs text-neutral-400">
            <button onClick={() => handleNav('home')} className="hover:text-brand-teal transition-colors">Accueil</button>
            <button onClick={() => handleNav('projects')} className="hover:text-brand-teal transition-colors">Projets</button>
            <button onClick={() => handleNav('contact')} className="hover:text-brand-teal transition-colors">Contact</button>
            {user && !user.isAnonymous ? (
              <button onClick={() => handleNav('admin')} className="hover:text-brand-purple transition-colors flex items-center gap-1.5">
                <Lock size={10} /> Admin
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="hover:text-brand-purple transition-colors flex items-center gap-1.5">
                <Lock size={10} /> Admin
              </button>
            )}
            <a href="https://www.instagram.com/louis_dc07/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/louis-da-costa2007/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors">LinkedIn</a>
          </div>
          <p className="text-xs text-neutral-600">© {new Date().getFullYear()} Louis Da Costa</p>
        </div>
      </footer>
    </div>
  );
};

export default App;