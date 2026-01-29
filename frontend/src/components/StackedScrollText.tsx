import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackedScrollText() {
  const sectionRef = useRef(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // long enough to allow each step
          scrub: true,
          pin: true,
        },
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { y: "350%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1, ease: "power3.out" },
          i, // staggers them one after another
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[100vh] relative flex flex-col justify-center tracking-wide lg:tracking-wider font-krylon rounded-4xl overflow-hidden leading-10 lg:leading-20 bg-cover bg-center items-center bg-[#0f0f0f] text-[#e9e6e1] font-bold  text-3xl lg:text-5xl"
      style={{ backgroundImage: "url('/images/last-supper.jpg')" }}
    >
      {" "}
      <div className="absolute inset-0 bg-black/80 blur-3xl" />
      {[
        "Join 20,000+ users",
        "already using Confluence.",
        "No downloads. No installations. Just instant conversations.",
      ].map((text, i) => (
        <div
          key={i}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          className={`overflow-hidden will-change-transform w-full text-center ${
            i === 2 ? "text-sm lg:text-lg opacity-55 font-semibold" : ""
          }`}
        >
          <div>{text}</div>
        </div>
      ))}
    </section>
  );
}
