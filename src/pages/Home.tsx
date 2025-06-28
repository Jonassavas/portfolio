import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-4">
      <h1 className="text-4xl font-bold">Tailwind is working! 🚀</h1>
      <Link to="/projects">
        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Go to Projects 📚
        </button>
      </Link>
    </div>
  );
}
