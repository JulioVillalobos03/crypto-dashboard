import { FaSun, FaMoon } from "react-icons/fa6";
import { useTranslation } from "react-i18next";


export default function ThemeSwitcher({ theme, toggleTheme }) {
  const { t } = useTranslation();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:scale-105 transition"
      title={t(
        theme === "light" ? "theme.dark" : "theme.light"
      )}
    >
      {theme === "light" ? (
        <FaMoon className="text-slate-700 text-lg" />
      ) : (
        <FaSun className="text-yellow-400 text-lg" />
      )}
    </button>
  );
}
