import { twMerge as tw } from "tailwind-merge";

interface CustomButtonProps {
  buttonText: string;
  className?: string;
}

export const CustomButton = ({ buttonText, className }: CustomButtonProps) => {
  return (
    <button
      type="submit"
      className={tw(
        "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 font-semibold",
        className
      )}
    >
      {buttonText}
    </button>
  );
};
