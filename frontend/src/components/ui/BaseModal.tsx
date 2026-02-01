import { useState, useEffect } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, title, children }: BaseModalProps) => {
  const [blurActive, setBlurActive] = useState(false);

  useEffect(() => {
    setBlurActive(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center border-1 border-black shadow-xl justify-center z-50 transition duration-500 ease-in-out ${
        blurActive
          ? "backdrop-blur-xs opacity-100"
          : "backdrop-blur-none opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative text-base tracking-tightest font-nebula-book bg-[#0f0f0f]/30 border-[#ffffff20]/50 border-1 backdrop-blur-2xl backdrop-saturate-180 backdrop-contrast-125 bg-blend-overlay p-6 rounded-xl w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-2xl pt-8 font-nebula-light font-bold text-center text-[#e9e6e1]">
          {title}
        </h2>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;

