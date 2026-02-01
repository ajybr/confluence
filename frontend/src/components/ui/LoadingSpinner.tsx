const LoadingSpinner = ({ size }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`${sizeClasses[size || "md"]} animate-spin rounded-full border-b-2 border-gray-900`}></div>
  );
};

export default LoadingSpinner;