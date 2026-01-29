import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HidePasswordIcon, ShowPasswordIcon } from "../utils/PasswordIcons";
import useToast from "../hooks/useToast";
import useAuthMutation from "../mutations/useAuthMutation";
import useUserStore from "../store/useUserStore";

type AuthMode = "signin" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("Hey there, I'm ");
  const { showToast } = useToast();
  const [bioTouched, setBioTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const authMutation = useAuthMutation();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!bioTouched && mode === "signup") {
      setBio(`Hey there, I'm ${username}`);
    }
  }, [username, bioTouched, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showToast(`Username and Password are required.`, "error");
      return;
    }
    authMutation.mutate(
      { username, password, bio, mode },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setUser({
              id: data.user.id,
              username: data.user.username,
              bio: data.user.bio,
            });
            showToast(
              mode === "signin"
                ? `Welcome back, ${username}.`
                : `Signed up as ${username}`,
              "success",
            );
            navigate("/me");
          } else {
            showToast(`Something went wrong. Please try again.`, "error");
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const errorMsg = error.response?.data?.errMes ?? "Unknown error";
            showToast(errorMsg, "error");
          } else {
            showToast("Unexpected error", "error");
          }
        },
      },
    );
  };

  return (
    <div className="">
      <Link
        to="/"
        className="font-extrabold absolute top-4 left-8 font-casselin text-3xl bg-gradient-to-r from-[#9796F0] to-[#FBC7D4] bg-clip-text text-transparent"
      >
        Confluence
      </Link>
      <div className="flex h-screen justify-center items-center">
        <div className=" bg-[#0f0f0f]/30 text-[#e9e6e1] backdrop-blur-md w-full z-10 max-w-md mx-auto p-4 border border-[#0f0f0f]/20 rounded-xl shadow-xl">
          {/* 🔵 Loading bar */}
          {/* {authMutation.isPending && ( */}
          {/*   <div className="absolute overflow-hidden top-0 left-0 h-1 w-full bg-[#0d0e20] animate-loading" /> */}
          {/* )} */}

          <h2 className="font-nebula-light text-3xl text-[#e9e6e1] w-full text-center font-semibold mb-8 p-2 capitalize">
            {mode}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="text-base tracking-tightest space-y-4"
          >
            <div className="font-nebula-book flex flex-col-reverse">
              <input
                type="text"
                placeholder="Username"
                value={username}
                disabled={authMutation.isPending}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                className="peer w-full font-nebula-light border-b border-b-[#0f0f0f] relative placeholder:absolute outline-none p-2 placeholder:duration-500 focus:placeholder:pt-10"
              ></input>
              <span className="pl-2  duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                Username
              </span>
            </div>
            <div className="flex border-b border-b-[#0f0f0f]">
              <div className="flex flex-grow flex-col-reverse">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  disabled={authMutation.isPending}
                  autoComplete={
                    mode === "signin" ? "current-password" : "new-password"
                  }
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full font-nebula-light relative placeholder:absolute outline-none p-2 placeholder:duration-500 focus:placeholder:pt-10"
                />
                <span className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                  Password
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="mr-4"
              >
                {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </button>
            </div>
            <div className="flex flex-col-reverse">
              {mode === "signup" && (
                <textarea
                  placeholder="Bio(optional)"
                  value={bio}
                  disabled={authMutation.isPending}
                  onChange={(e) => {
                    setBioTouched(true);
                    const bioMaxWordLength = 70;
                    if (e.target.value.split("").length <= bioMaxWordLength)
                      setBio(e.target.value);
                    else
                      showToast(
                        `Bio cannot exceed ${bioMaxWordLength} letters max limit`,
                        "error",
                      );
                  }}
                  className="peer relative font-nebula-light focus:placeholder:pt-15 placeholder:absolute placeholder:duration-500 w-full h-fit resize-none overflow-hidden border-b focus:outline-none border-b-[#0f0f0f] p-2"
                />
              )}{" "}
              <span className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                Bio
              </span>
            </div>
            <div className="flex font-nebula-book items-center">
              {mode === "signin" ? (
                <div className="text-xs pl-0 p-4">
                  New to Confluence?{" "}
                  <Link className="text-[#c8b3f6] underline" to="/signup">
                    Create Account
                  </Link>
                </div>
              ) : (
                <div className="text-xs pl-0 p-4">
                  Already have an account?{" "}
                  <Link className="text-[#c8b3f6] underline" to="/signin">
                    Sign in
                  </Link>
                </div>
              )}
              <button
                type="submit"
                disabled={authMutation.isPending}
                className={`w-full flex-grow py-2 h-fit cursor-pointer rounded text-white transition ${
                  authMutation.isPending
                    ? "bg-[#c8b3f6] cursor-not-allowed"
                    : "bg-[#2d1c7f] transition-all duration-400"
                }`}
              >
                {authMutation.isPending
                  ? "Please wait..."
                  : mode === "signup"
                    ? "Sign Up"
                    : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
