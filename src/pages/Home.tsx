import aboutMeText from "../data/aboutMe";
import meeImage from "../assets/mee.png"; // adjust path if needed

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-6 max-w-5xl mx-auto text-left lg:flex-row lg:items-start">
      <div className="lg:w-1/2">
        <h2 className="text-4xl font-bold mb-4">Welcome to my portfolio 👋</h2>
        <p className="text-lg text-gray-300 mb-8">Explore my work and projects!</p>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-start gap-6">
          <img
            src={meeImage}
            alt="Me"
            className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-4">About Me</h3>
            <p className="text-gray-300 whitespace-pre-line">{aboutMeText}</p>
          </div>
        </section>
      </div>
      {/* You can add more content on the right here later */}
    </div>
  );
}
