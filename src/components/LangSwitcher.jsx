import { useTranslation } from "react-i18next";

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <div>
      <label htmlFor="language" className="sr-only">
        Select language
      </label>
      <select
        id="language"
        onChange={changeLang}
        value={i18n.language.startsWith("en") ? "en" : "es"}
        className="text-xs px-4 py-2 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 transition cursor-pointer"
        aria-label="Select language"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
