import { useEffect } from "react";
import "./PartnerCarousel.css"; // 👈 we'll use this for custom CSS

const PartnerCarousel = () => {
  useEffect(() => {
    const container = document.getElementById("scroll-track");
    const handleMouseEnter = () => container?.classList.add("paused");
    const handleMouseLeave = () => container?.classList.remove("paused");
    container?.addEventListener("mouseenter", handleMouseEnter);
    container?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container?.removeEventListener("mouseenter", handleMouseEnter);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const parodyApps = [
    { name: "SnapYak", logo: "📸" },
    { name: "Facegram", logo: "📷" },
    { name: "Twiddler", logo: "🐦" },
    { name: "TokTik", logo: "🎵" },
    { name: "Chatter", logo: "💬" },
    { name: "Netflips", logo: "🎬" },
    { name: "Grinderz", logo: "🔥" },
    { name: "PinTree", logo: "📌" },
    { name: "Spootify", logo: "🎧" },
    { name: "Slackr", logo: "💼" },
  ];

  return (
    <div className="opacity-50 my-10 lg:mt-40 overflow-hidden w-full bg-[#0f0f0f] lg:py-4">
      <div id="scroll-track" className="scrolling-track">
        {[...parodyApps, ...parodyApps].map((app, idx) => (
          <div key={idx} className="app-tile">
            <div className="text-lg lg:text-3xl">{app.logo}</div>
            <span>{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCarousel;
