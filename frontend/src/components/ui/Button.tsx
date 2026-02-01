import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "gradient";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  disabled, 
  loading, 
  className, 
  fullWidth 
}: ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold transition-all duration-350 cursor-pointer outline-none focus:ring-2 focus:ring-[#977DFF]/50";
  const widthClasses = fullWidth ? "w-full" : "";
  const disabledClasses = (disabled || loading) ? "cursor-not-allowed opacity-60" : "";
  
  const variantClasses = {
    primary: "bg-[#2d1c7f] text-white hover:bg-[#3a2a9a] hover:rounded-none",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10",
    gradient: "bg-gradient-to-br from-[#977DFF] to-[#F2E6EE] text-black hover:from-[#876fee] hover:to-[#e0d5e8]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${widthClasses} ${disabledClasses} ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <LoadingSpinner size="sm" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;