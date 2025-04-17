import { twMerge as tw } from "tailwind-merge";

interface CustomButtonProps {
  buttonText: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
}

export const CustomButton = ({
  buttonText,
  className,
  onClick,
  type = "submit",
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={tw(
        "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 font-semibold",
        className
      )}
    >
      {buttonText}
    </button>
  );
};
