const JoinRoomIcon = ({ iconType }: { iconType: "compact" | "full" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconType === "compact" ? "size-5" : "size-6"}
    >
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M8 12h8"/>
      <path d="M12 8v8"/>
    </svg>
  );
};

export default JoinRoomIcon;