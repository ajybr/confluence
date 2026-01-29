import { Link } from "react-router-dom";
import Chatbox from "../components/Chatbox";
import Sidebar from "../components/Sidebar";
import useSignOut from "../hooks/useSignOut";
import useUserStore from "../store/useUserStore";
import { useRef, useState } from "react";

const Inbox = () => {
  const user = useUserStore((state) => state.user);
  const signOutMutation = useSignOut();
  const [isHovered, setIsHovered] = useState(false);
  const username: string = user?.username ?? "User";
  const bio: string = user?.bio ?? "...";
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-[#0f0f0f] backdrop-blur-3xl">
      <div className="col-span-1 mx-2 h-screen w-full text-slate-100">
        <div className="flex justify-between items-center">
          <div className="">
            <Link
              to="/"
              className="font-extrabold fade-up ml-3 font-casselin text-3xl bg-gradient-to-r from-[#9796F0] to-[#FBC7D4] bg-clip-text text-transparent"
            >
              Confluence
            </Link>
          </div>
          <div className="flex items-center p-4">
            {/* User Profile */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {" "}
              <div className="w-10 h-10 rounded-full outline-[#9796F0] group-hover:outline-double cursor-default flex justify-center items-center font-extrabold capitalize bg-slate-400">
                {username.split("")[0].charAt(0)}
              </div>{" "}
              {/* Profile Picture */}
              {isHovered && (
                <div className="fade-up absolute outline space-x-10 outline-[#9796F0]/20 px-1 py-2 -translate-y-1/2 mt-8 right-12 translate-x-0 transition-all duration-300 ease-in-out w-fit text-center text-nowrap bg-[#1C274C]/20 text-[#e9e6e1] backdrop-blur-lg rounded-lg shadow-lg z-20 overflow-hidden">
                  <div className="w-full text-sm font-semibold px-2 py-2 text-center">
                    {username}
                  </div>
                  <div className="w-full text-xs pb-3 text-center">{bio}</div>

                  <button
                    onClick={() => signOutMutation.mutate(undefined)}
                    className="w-full font-nebula-medium text-sm font-bold text-red-300 hover:text-red-400 hover:bg-red-300/30 py-2 rounded-[inherit] cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 min-w-screen min-h-screen">
          <Sidebar />
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
