import { useRef, useEffect } from "react";
import { twMerge as tw } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const CloseIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.26113 19.7388C4.61433 20.082 5.19963 20.082 5.54274 19.7388L12.0013 13.2803L18.4597 19.7388C18.8029 20.082 19.3983 20.0921 19.7414 19.7388C20.0845 19.3857 20.0845 18.8104 19.7414 18.4674L13.2829 11.9987L19.7414 5.54022C20.0845 5.19711 20.0946 4.61181 19.7414 4.2687C19.3881 3.9155 18.8029 3.9155 18.4597 4.2687L12.0013 10.7272L5.54274 4.2687C5.19963 3.9155 4.60424 3.90541 4.26113 4.2687C3.91802 4.6219 3.91802 5.19711 4.26113 5.54022L10.7196 11.9987L4.26113 18.4674C3.91802 18.8104 3.90793 19.3958 4.26113 19.7388Z"
      fill={color}
    />
  </svg>
);

export const CustomModal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-muted-foreground/90 fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className={tw(
          "bg-card text-foreground w-full max-w-md rounded-lg p-8 shadow-lg",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-foreground rounded-full">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
