import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import hearthstoneImg from "../assets/hearthstone.jpg";
import hearthstoneGif from "../assets/hearthstone_gameplay.gif";
import chessKing from "../assets/W_king.png";
import videoThumb from "../assets/video_placeholder.jpg";
import jactLogo from "../assets/jact-logo.png";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredButtonRect, setHoveredButtonRect] = useState<DOMRect | null>(null);
  const [loading, setLoading] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const loadingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const projects = [
    { name: "Hearthstone Clone", image: hearthstoneImg, gif: hearthstoneGif, link: "/hearthstone" },
    { name: "Chess Game", image: chessKing, gif: null, link: "/chess" },
    { name: "YouTube Demo", image: videoThumb, link: "https://www.youtube.com/watch?v=s7HcPvTew_4" },
    { name: "Master's Thesis - JACT", image: jactLogo, gif: null, link: "/jact" },
  ];

  const handleMouseEnter = (projectName: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);

    setHoveredProject(projectName);
    setHoveredButtonRect(e.currentTarget.getBoundingClientRect());
    setLoading(true);
    setAnimationDone(false);

    // Circle fills for 600ms, THEN preview animation runs
    loadingTimeout.current = setTimeout(() => {
      setLoading(false);
      animationTimeout.current = setTimeout(() => {
        setAnimationDone(true);
      }, 350); // animation duration
    }, 600); // loading circle duration
  };

  const handleMouseLeave = () => {
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    setHoveredProject(null);
    setHoveredButtonRect(null);
    setLoading(false);
    setAnimationDone(false);
  };

  const previewRight = 60;
  const previewTop = 150;
  const smallBoxSize = 24;
  const finalWidth = 400;
  const finalHeight = 225;

  // Only show preview when hover + animation is done
  const projectToShow = animationDone && hoveredProject ? hoveredProject : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row p-6 relative">
      {/* Left side */}
      <div className="lg:w-1/2 flex flex-col items-start z-10">
        <h2 className="text-3xl font-bold mb-6">Projects 📚</h2>

        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Link
              key={project.name}
              to={project.link}
              onMouseEnter={(e) => handleMouseEnter(project.name, e)}
              onMouseLeave={handleMouseLeave}
              className="flex items-center w-[15cm] h-[1.5cm] rounded-lg overflow-hidden shadow-lg bg-gray-800 cursor-pointer hover:scale-105 transition-transform relative"
            >
              <div
                className="h-full"
                style={{
                  width: "30%",
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  maskImage: "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
                  WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
                }}
              />
              <div className="flex-1 pl-4 text-lg font-semibold">
                {project.name.includes("JACT") ? (
                  <>
                    Master's Thesis - <em>JACT</em>
                  </>
                ) : (
                  project.name
                )}
              </div>

              {/* White circular loading indicator */}
              {loading && hoveredProject === project.name && (
                <div className="absolute right-4">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                      style={{
                        animation: "fillCircle 0.6s linear forwards",
                      }}
                    />
                  </svg>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Animated box that moves from button to preview (after loading) */}
      {hoveredProject && hoveredButtonRect && !animationDone && !loading && (() => {
        const startLeft = hoveredButtonRect.right - smallBoxSize;
        const startTop = hoveredButtonRect.top;
        return (
          <div
            style={{
              position: "fixed",
              left: startLeft,
              top: startTop,
              width: smallBoxSize,
              height: smallBoxSize,
              backgroundColor: "#1f2937",
              borderRadius: "0.5rem",
              overflow: "hidden",
              boxShadow: "0 10px 20px rgba(0,0,0,0.7)",
              zIndex: 30,
              animation: "growAndMove 350ms forwards",
            }}
          />
        );
      })()}

      {/* Final preview — only visible after loading + animation */}
      {projectToShow && (() => {
        const project = projects.find((p) => p.name === projectToShow);
        if (!project) return null;

        return (
          <div
            style={{
              position: "fixed",
              right: previewRight,
              top: previewTop,
              width: finalWidth,
              height: finalHeight,
              borderRadius: "0.5rem",
              overflow: "hidden",
              boxShadow: "0 10px 20px rgba(0,0,0,0.7)",
              backgroundColor: "#1f2937",
              zIndex: 25,
              opacity: 1,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            {project.name === "YouTube Demo" ? (
              <iframe
                width={finalWidth}
                height={finalHeight}
                src="https://www.youtube.com/embed/s7HcPvTew_4?autoplay=1&mute=1&loop=1&playlist=s7HcPvTew_4"
                title="YouTube Demo Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : project.gif ? (
              <img
                src={project.gif}
                alt={`${project.name} preview`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img
                src={project.image}
                alt={`${project.name} preview`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
        );
      })()}

      <style>{`
        @keyframes fillCircle {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes growAndMove {
          0% {
            width: ${smallBoxSize}px;
            height: ${smallBoxSize}px;
            opacity: 0.8;
            transform: translate(0, 0);
          }
          100% {
            width: ${finalWidth}px;
            height: ${finalHeight}px;
            opacity: 1;
            transform: translate(${window.innerWidth - previewRight - finalWidth - (hoveredButtonRect ? hoveredButtonRect.right - smallBoxSize : 0)}px, ${previewTop - (hoveredButtonRect ? hoveredButtonRect.top : 0)}px);
          }
        }
      `}</style>
    </div>
  );
}
