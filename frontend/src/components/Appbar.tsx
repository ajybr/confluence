import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="fixed z-15 left-1/2 h-[60px] w-full flex items-center max-w-[650px] transform -translate-x-1/2 rounded-full bg-indigo-400/5 backdrop-filter backdrop-blur-md px-6 top-6">
      <Link
        to="/"
        className="font-extrabold flex flex-grow font-casselin text-3xl bg-gradient-to-r from-[#9796F0] to-[#FBC7D4] bg-clip-text text-transparent"
      >
        Confluence
      </Link>
      <div className="flex items-center gap-6">
        <div className="font-semibold invisible md:visible text-[#e9e6e1]/40 text-sm flex flex-row gap-4">
          <Link to="" className="hover:text-[#ffffe0] hover:underline">
            Why us?
          </Link>
          <Link to="" className="hover:text-[#ffffe0] hover:underline">
            Privacy
          </Link>
          <Link to="" className="hover:text-[#ffffe0] hover:underline">
            Testimonials
          </Link>
        </div>
        <Link
          to="/signin"
          className="group border border-[#e9e6e1] relative overflow-hidden flex items-center font-semibold max-w-fit transition-all duration-500 hover:rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23px"
            height="23px"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-[-24px] translate-x-4 transition-all opacity-0 duration-500 group-hover:left-[8px] group-hover:translate-x-0 group-hover:opacity-100"
          >
            <path
              d="M4 12H6.5M20 12L14 6M20 12L14 18M20 12H9.5"
              stroke="#e9e6e1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="group-hover:pr-3 text-nowrap group-hover:pl-9 px-6 py-2 transition-all duration-500 text-[#e9e6e1]">
            Log in
          </div>
        </Link>
      </div>
    </div>
  );
};
