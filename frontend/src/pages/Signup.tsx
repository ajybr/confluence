import AuthForm from "../components/AuthForm";
import MovingBackground from "../UI/MovingBackground";

const Signup = () => {
  return (
    <div className="relative bg-[#191834]">
      <MovingBackground />
        <AuthForm mode="signup" />
    </div>
  );
};

export default Signup;
