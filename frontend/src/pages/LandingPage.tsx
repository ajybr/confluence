import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import PartnerCarousel from "../components/PartnerCarousel";
import StackedScrollText from "../components/StackedScrollText";
import { TestimonialsSection } from "../components/Testimonials";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [showInput, setShowInput] = useState(false);

  const handleJoinClick = () => {
    setShowInput(true);
  };

  return (
    <div>
      <div className="relative max-w-full overflow-x-hidden bg-[#0f0f0f] min-h-screen z-10 mb-[250px] lg:mb-[350px] pb-50 rounded-b-4xl">
        <Appbar />
        <div className="grid justify-center grid-flow-row lg:grid-flow-col gap-25 grid-rows-2 lg:grid-rows-1 lg:w-4/5 lg:mx-auto pt-[150px] lg:px-12 lg:grid-cols-2">
          <div className="flex lg:block lg:col-span-1 flex-col justify-center items-center">
            <div className="text-transparent text-center md:w-[50%] lg:w-full lg:text-left fade-up bg-gradient-to-br from-[#ffffe0]/70 to-[#ffffe0] bg-clip-text font-krylon pl-0 font-bold text-wrap text-7xl/snug p-5">
              Where conversations come to life
            </div>
            <div className="text-[#e9e6e1] text-center lg:text-left fade-up pl-0 w-4/5 font-semibold text-wrap text-sm/normal p-2">
              Build private rooms, invite friends, and experience seamless,
              secure real-time chat—right from your browser.
            </div>
            <div className="flex pt-14 gap-10 items-center">
              <button className="group hover:shine relative bg-[#e9e6e1] p-3 cursor-pointer overflow-hidden flex items-center font-semibold max-w-fit transition-all duration-500 hover:rounded-xl hover:bg-[#ffffe0]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute left-[-24px] translate-x-4 transition-all opacity-0 duration-500 group-hover:left-[12px] group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <path
                    d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5"
                    stroke="#1C274C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Link
                  to="/me"
                  className="group-hover:pl-5 font-nebula-light shine group-hover:underline transition-all duration-500 text-[#1C274C]"
                >
                  Get Started for free
                </Link>
              </button>
              <div className="flex justify-center">
                {!showInput ? (
                  <div
                    className="hover:underline font-nebula-light p-2 pl-0 font-bold hover:text-[#ffffe0] text-[#e9e6e1] cursor-pointer"
                    onClick={handleJoinClick}
                  >
                    Join a Room?
                  </div>
                ) : (
                  <div className="relative w-full max-w-xs">
                    <input
                      className="w-full pr-24 pl-3 py-3 rounded-sm border-1 border- font-bold text-[#e9e6e1] bg-transparent"
                      type="text"
                      placeholder="Room Code"
                    />
                    <button className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-br from-[#977DFF] to-[#F2E6EE] text-black font-semibold transition-all duration-350 rounded-sm hover:rounded-none hover:bg-[#977DFF]/70">
                      Join
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative fade-up mx-3 lg:mx-0 lg:block flex col-span-1 lg:right-0 lg:w-[750px] w-fit h-[70%] lg:h-[550px] overflow-hidden rounded-t-4xl lg:rounded-tr-none bg-gradient-to-tr from-[#9796F0] to-[#FBC7D4]">
            <div className="relative w-full h-full max-w-full md:h-[400px] lg:w-[800px] lg:hover:translate-x-2 lg:h-[600px] lg:hover:translate-y-2 transition-transform ease-in-out duration-400 shadow-lg shadow-[#9796F0]">
              {/* lg:hover:-translate-y-2  transition-transform duration-300 ease-in-out"> */}
              <img
                src="/images/landingPageimg.PNG"
                alt="landingPageimg.jpeg"
                className="lg:object-cover overflow-hidden lg:object-top-left lg:w-full lg:h-full p-1 lg:p-2 lg:pt-1 lg:pl-1 rounded-4xl"
              />
              <div className="absolute bottom-0 w-full h-[3%] pointer-events-none bg-gradient-to-r from-[#9796F0] to-[#FBC7D4]" />
              <div className="absolute bottom-0 w-full h-[40%] lg:h-[50%] pointer-events-none bg-gradient-to-t from-[#9796F0] to-transparent blur" />
            </div>
          </div>{" "}
        </div>
        <PartnerCarousel />

        <StackedScrollText />
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
