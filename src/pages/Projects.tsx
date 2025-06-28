export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold">My Projects 📚</h2>
      <p className="text-lg text-gray-300">Here's a demo video of one of my projects:</p>

      <div className="w-full max-w-3xl aspect-video">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/s7HcPvTew_4?si=q9NTIU0C0wBVdM9X"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
