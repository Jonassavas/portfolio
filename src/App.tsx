import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Chess from './pages/Chess';
import mee from './assets/mee.png';
import svFlag from './assets/sv-flag.png';
import usFlag from './assets/us-flag.png';

export default function App() {
  const [lang, setLang] = useState<'SV' | 'EN'>('SV');
  const [langDropdown, setLangDropdown] = useState(false);

  const toggleLangDropdown = () => setLangDropdown((prev) => !prev);
  const selectLang = (selected: 'SV' | 'EN') => {
    setLang(selected);
    setLangDropdown(false);
  };

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
          {['Home', 'Projects', 'Hobbies'].map((label) => (
            <Link
              key={label}
              to={
                label === 'Home'
                  ? '/'
                  : label === 'Projects'
                  ? '/projects'
                  : '/hobbies'
              }
              className="relative text-lg font-semibold px-1 py-1 cursor-pointer transition-colors duration-200 hover:text-gray-300"
            >
              {label}
              {/* Outline on hover */}
              <span className="absolute inset-0 border border-white opacity-0 rounded-md transition-opacity duration-200 hover:opacity-100 pointer-events-none"></span>
            </Link>
          ))}

          {/* Language selector */}
          <div
            className="relative cursor-pointer px-2 py-1 flex items-center gap-1 text-lg font-semibold transition-colors duration-200 hover:text-gray-300"
            onMouseEnter={() => setLangDropdown(true)}
            onMouseLeave={() => setLangDropdown(false)}
          >
            {/* Outline */}
            <span className="absolute inset-0 border border-white opacity-0 rounded-md transition-opacity duration-200 hover:opacity-100 pointer-events-none"></span>

            {/* Flag + label */}
            <img
              src={lang === 'SV' ? svFlag : usFlag}
              alt={lang}
              className="h-5 w-5 object-cover rounded-sm"
            />
            <span>{lang}</span>

            {/* Dropdown menu */}
            {langDropdown && (
              <div className="absolute top-full mt-1 right-0 bg-gray-800 border border-white rounded-md flex flex-col w-32 z-50">
                <button
                  onClick={() => selectLang('EN')}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700"
                >
                  <img src={usFlag} alt="EN" className="h-4 w-4 rounded-sm" />
                  English - EN
                </button>
                <button
                  onClick={() => selectLang('SV')}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700"
                >
                  <img src={svFlag} alt="SV" className="h-4 w-4 rounded-sm" />
                  Svenska - SV
                </button>
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
