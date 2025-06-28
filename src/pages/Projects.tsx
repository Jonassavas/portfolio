import { Link } from 'react-router-dom';

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-4">
      <h1 className="text-4xl font-bold">Projects 📚</h1>
      <p>Here you’ll list your cool stuff!</p>
      <Link to="/">
        <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
