import { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Chess from './pages/Chess';
import mee from './assets/mee.png';
import svFlag from './assets/sv-flag.png';
import usFlag from './assets/us-flag.png';

export default function App() {
  const [lang, setLang] = useState<'SV' | 'EN'>('EN');
  const [langDropdown, setLangDropdown] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [gracePeriod, setGracePeriod] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const selectLang = (selected: 'SV' | 'EN') => {
    setLang(selected);
    setLangDropdown(false);
  };

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Grace period logic after dropdown opens
  useEffect(() => {
    if (langDropdown) {
      setGracePeriod(true);
      const timeout = setTimeout(() => setGracePeriod(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [langDropdown]);

  // Close dropdown when leaving after grace period
  useEffect(() => {
    if (!gracePeriod && langDropdown && !hovering) {
      const timeout = setTimeout(() => setLangDropdown(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [hovering, gracePeriod, langDropdown]);

  const navItems: { label: string; path: string }[] = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Hobbies', path: '/hobbies' },
  ];

  const languages: { code: 'EN' | 'SV'; label: string; flag: string }[] = [
    { code: 'EN', label: 'English - EN', flag: usFlag },
    { code: 'SV', label: 'Svenska - SV', flag: svFlag },
  ];

  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col">
      {/* 🔝 Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-gray-800 relative">
        {/* Top-left clickable box */}
        <Link
          to="/"
          className="flex items-center gap-2 p-2 bg-gray-800 rounded-md cursor-pointer"
        >
          <img
            src={mee}
            alt="Portrait"
            className="h-8 w-8 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold text-white transition-colors duration-200 hover:text-gray-300">
            Jonas Sävås
          </h1>
        </Link>

        {/* Navigation buttons */}
        <nav className="flex gap-6 items-center relative">
          {navItems.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                className={`relative text-lg font-semibold px-3 py-1 cursor-pointer rounded-md transition-all duration-200
                  ${
                    isActive
                      ? 'text-white border border-white bg-gray-700 cursor-default'
                      : 'text-gray-300 border border-transparent hover:border-white hover:text-white'
                  }`}
              >
                {label}
              </Link>
            );
          })}

          {/* Language selector */}
          <div
            ref={buttonRef}
            className="relative cursor-pointer px-3 py-1 flex items-center gap-1 text-lg font-semibold rounded-md transition-all duration-200
                       hover:text-white hover:border-white border border-transparent"
            onClick={() => setLangDropdown((prev) => !prev)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Flag + label */}
            <img
              src={lang === 'SV' ? svFlag : usFlag}
              alt={lang}
              className="h-5 w-5 object-cover rounded-sm"
            />
            <span>{lang}</span>

            {/* Dropdown menu */}
            {langDropdown && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-1 right-0 bg-gray-800 border border-white rounded-md flex flex-col w-44 z-50 shadow-lg animate-fadeIn"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                {languages.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    onClick={() => selectLang(code)}
                    className="flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-700 transition-colors"
                  >
                    <div
                      className={`h-3 w-3 rounded-full border border-white flex-shrink-0 ${
                        lang === code ? 'bg-white' : ''
                      }`}
                    />
                    <img src={flag} alt={code} className="h-4 w-4 rounded-sm" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* 🧱 Main content area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/chess" element={<Chess />} />
          <Route path="/hobbies" element={<div>Hobbies page</div>} />
        </Routes>
      </main>
    </div>
  );
}
