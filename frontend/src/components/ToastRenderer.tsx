import { ReactNode } from "react";
import { CheckBadgeIcon, CrossBadgeIcon } from "../utils/StatusBadgeIcons";
import useToastStore from "../store/toastStore";

export const ToastRenderer = ({ children }: { children: ReactNode }) => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 flex gap-3 rounded shadow text-white animate-slide-in-out ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.type === "success" ? <CheckBadgeIcon /> : <CrossBadgeIcon />}
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
};
