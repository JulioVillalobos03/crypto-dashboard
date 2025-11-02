import LangSwitcher from "./LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";

export default function Header({ theme, toggleTheme }) {
  const { t } = useTranslation();

  return (
    <header
      role="banner"
      className="border-b border-slate-300 dark:border-slate-800 px-4 py-3 flex items-center justify-between"
    >
      <h1 tabIndex="0" className="text-2xl font-bold" aria-label={t("app.title_aria")}>
        {t("app.title")}
      </h1>

      <div
        className="flex items-center gap-2"
        role="group"
        aria-label={t("layout.controls_aria")}
      >
        <LangSwitcher />
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}
