import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Chess from './pages/Chess';
import mee from './assets/mee.png'; // <-- Import your image

export default function App() {
  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col">
      {/* 🔝 Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-2">
          <img src={mee} alt="Portrait" className="h-8 w-8 rounded-full object-cover" />
          <h1 className="text-2xl font-bold">Jonas Sävås</h1>
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline text-sm">
            Home
          </Link>
          <Link to="/projects" className="hover:underline text-sm">
            Projects
          </Link>
        </nav>
      </header>

      {/* 🧱 Main content area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/chess" element={<Chess />} />
        </Routes>
      </main>
    </div>
  );
}
