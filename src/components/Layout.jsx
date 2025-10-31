import { useTheme } from "../hooks/useTheme";
import LangSwitcher from "./LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const lang = i18n.language.startsWith("en") ? "English" : "Español";
    setAnnouncement(
      t("layout.announcement", { theme, lang })
    );
  }, [theme, i18n.language]);

  return (
    <div
      className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300"
      role="document"
      lang={i18n.language.startsWith("en") ? "en" : "es"}
    >
      <div
        aria-live="assertive"
        className="sr-only"
      >
        {announcement}
      </div>

      <header
        role="banner"
        className="border-b border-slate-300 dark:border-slate-800 px-4 py-3 flex items-center justify-between"
      >
        <h1 tabIndex="0" className="text-2xl font-bold" aria-label={t("app.title_aria")}>
          {t("app.title")}
        </h1>

        <div className="flex items-center gap-2" role="group" aria-label={t("layout.controls_aria")}>
          <LangSwitcher />
          <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main
        role="main"
        aria-label={t("layout.main_aria")}
        tabIndex="0"
        className="p-4 max-w-6xl mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </main>

      <footer
        role="contentinfo"
        className="text-center text-xs text-slate-400 py-4"
      >
        {t("layout.footer")}
      </footer>
    </div>
  );
}
