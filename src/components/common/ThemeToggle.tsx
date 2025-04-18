import { UI_STRINGS } from "@/constants/ui-string";
import { useState, useLayoutEffect } from "react";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialDarkMode = savedTheme === "dark";
    setIsDarkMode(initialDarkMode);

    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button onClick={toggleTheme} className="flex items-center focus:outline-none">
      <div className="bg-muted relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ease-in-out">
        <span
          className={`bg-primary inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ease-in-out ${
            isDarkMode ? "translate-x-6" : "translate-x-2"
          }`}
        />
      </div>
      <span className="ml-2 hidden text-sm font-medium sm:inline">
        {isDarkMode ? UI_STRINGS.THEME_DARK : UI_STRINGS.THEME_LIGHT}
      </span>
    </button>
  );
};
