import { useEffect, useRef } from "react";

const MovingBackground = () => {
  const groupRef = useRef<SVGGElement | null>(null);
  useEffect(() => {
    const svgWidth = 700;
    const svgHeight = 900;
    const radius = 100;

    const circles =
      groupRef.current?.querySelectorAll<SVGCircleElement>("circle");
    if (!circles) return;

    const states = Array.from(circles).map(() => ({
      cx: Math.random() * (svgWidth - 2 * radius) + radius,
      cy: Math.random() * (svgHeight - 2 * radius) + radius,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
    }));

    const animate = () => {
      states.forEach((state, i) => {
        state.cx += state.dx;
        state.cy += state.dy;

        if (state.cx <= radius || state.cx >= svgWidth - radius) state.dx *= -1;
        if (state.cy <= radius || state.cy >= svgHeight - radius)
          state.dy *= -1;

        const circle = circles[i];
        if (circle) {
          circle.setAttribute("cx", state.cx.toString());
          circle.setAttribute("cy", state.cy.toString());
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);
  return (
    <svg
      id="canvas"
      viewBox="0 0 900 700"
      className="fixed"
      preserveAspectRatio="xMidYMid meet"
    >
      <filter
        id="blur1"
        x="-10%"
        y="-10%"
        width="120%"
        height="120%"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        ></feBlend>
        <feGaussianBlur
          stdDeviation="161"
          result="effect1_foregroundBlur"
        ></feGaussianBlur>
      </filter>
      <g filter="url(#blur1)" ref={groupRef} id="circlesGroup">
        <circle r="257" fill="#2d1c7f"></circle>
        <circle r="257" fill="#2d1c7f"></circle>
        <circle r="257" fill="#7546e8"></circle>
        <circle r="257" fill="#c8b3f6"></circle>
        <circle r="257" fill="#b0a9e5"></circle>
        <circle r="257" fill="#0d0e20"></circle>
      </g>
    </svg>
  );
};
export default MovingBackground;
