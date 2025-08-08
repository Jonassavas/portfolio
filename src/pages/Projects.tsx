import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hearthstoneImg from "../assets/hearthstone.jpg";
import hearthstoneGif from "../assets/hearthstone_gameplay.gif";
import chessKing from "../assets/W_king.png";
import videoThumb from '../assets/video_placeholder.jpg'; // placeholder

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredButtonRect, setHoveredButtonRect] = useState<DOMRect | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  const projects = [
    {
      name: "Hearthstone Clone",
      image: hearthstoneImg,
      gif: hearthstoneGif,
      link: "/hearthstone",
    },
    {
      name: "Chess Game",
      image: chessKing,
      gif: null,
      link: "/chess",
    },
    {
      name: 'YouTube Demo',
      image: videoThumb,
      link: 'https://www.youtube.com/watch?v=s7HcPvTew_4',
    },
  ];

  // On hover, store project name + button bounding rect
  const handleMouseEnter = (projectName: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if(animationTimeout.current) clearTimeout(animationTimeout.current);
    setHoveredProject(projectName);
    setAnimationDone(false);
    setHoveredButtonRect(e.currentTarget.getBoundingClientRect());
    
    // After animation duration (e.g. 350ms), set animationDone to true to show final preview
    animationTimeout.current = setTimeout(() => {
      setAnimationDone(true);
    }, 350);
  };

  // On leave, clear states and timers
  const handleMouseLeave = () => {
    if(animationTimeout.current) clearTimeout(animationTimeout.current);
    setHoveredProject(null);
    setHoveredButtonRect(null);
    setAnimationDone(false);
  };

  // Fixed preview position on right side of screen (adjust as needed)
  const previewRight = 60; // px from right edge
  const previewTop = 150;  // px from top

  // Small box size at start (button's height approx 1.5cm ~ 24px)
  const smallBoxSize = 24; // px

  // Final preview size
  const finalWidth = 400;
  const finalHeight = 225;

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
                {project.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Animated small preview box that animates from button to final preview */}
      {hoveredProject && hoveredButtonRect && !animationDone && (() => {
        // Calculate animation keyframes from hoveredButtonRect.right to final preview right edge:
        // We'll animate left and width/height + opacity
        // Starting position: hoveredButtonRect.right - smallBoxSize, top = hoveredButtonRect.top
        // Ending position: window.innerWidth - previewRight - finalWidth, top = previewTop

        const startLeft = hoveredButtonRect.right - smallBoxSize;
        const startTop = hoveredButtonRect.top;
        const endLeft = window.innerWidth - previewRight - finalWidth;
        const endTop = previewTop;

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
          >
            {(() => {
              const project = projects.find(p => p.name === hoveredProject);
              if (!project) return null;

              if (project.name === "YouTube Demo") {
                // Show thumbnail small on animation start (video won't autoplay here)
                return (
                  <img
                    src={project.image}
                    alt={`${project.name} preview thumbnail`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                );
              }
              if (project.gif) {
                return (
                  <img
                    src={project.gif}
                    alt={`${project.name} preview thumbnail`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                );
              }
              return <div className="text-gray-500 italic p-2 text-xs">No preview</div>;
            })()}
          </div>
        );
      })()}

      {/* Final fixed preview that appears after animation */}
      {hoveredProject && animationDone && (() => {
        const project = projects.find(p => p.name === hoveredProject);
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
              <div className="text-gray-500 italic p-4">No preview available</div>
            )}
          </div>
        );
      })()}

      {/* Animation keyframes */}
      <style>{`
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
