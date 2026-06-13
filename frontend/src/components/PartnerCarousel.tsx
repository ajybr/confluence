import { useEffect, ComponentType, SVGProps } from "react";
import { SiSnapchat, SiFacebook, SiX, SiTiktok, SiDiscord, SiNetflix, SiTinder, SiPinterest, SiSpotify, SiMattermost } from "@icons-pack/react-simple-icons";
import "./PartnerCarousel.css";

const iconComponents: { name: string; Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }> }[] = [
  { name: "SnapYak", Icon: SiSnapchat },
  { name: "Facegram", Icon: SiFacebook },
  { name: "Twiddler", Icon: SiX },
  { name: "TokTik", Icon: SiTiktok },
  { name: "Chatter", Icon: SiDiscord },
  { name: "Netflips", Icon: SiNetflix },
  { name: "Grinderz", Icon: SiTinder },
  { name: "PinTree", Icon: SiPinterest },
  { name: "Spootify", Icon: SiSpotify },
  { name: "Slackr", Icon: SiMattermost },
];

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

  return (
    <div className="opacity-50   overflow-hidden w-full bg-[#0f0f0f] lg:mb-10">
      <div id="scroll-track" className="scrolling-track">
        {[...iconComponents, ...iconComponents].map((app, idx) => (
          <div key={idx} className="app-tile">
            <app.Icon size={28} color="#e9e6e1" className="text-lg lg:text-3xl" />
            <span>{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCarousel;
