import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const lang = i18n.language.startsWith("en") ? "English" : "Español";
    setAnnouncement(t("layout.announcement", { theme, lang }));
  }, [theme, i18n.language]);

  return (
    <div
      className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300"
      role="document"
      lang={i18n.language.startsWith("en") ? "en" : "es"}
    >
      <div aria-live="assertive" className="sr-only">
        {announcement}
      </div>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main
        role="main"
        aria-label={t("layout.main_aria")}
        tabIndex="0"
        className="p-4 max-w-6xl mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
