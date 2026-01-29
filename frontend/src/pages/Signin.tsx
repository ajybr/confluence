import AuthForm from "../components/AuthForm";
import MovingBackground from "../UI/MovingBackground";

const Signin = () => {
  return (
    <div className="relative bg-[#191834]">
      <MovingBackground />
      <AuthForm mode="signin" />
    </div>
  );
};

export default Signin;
