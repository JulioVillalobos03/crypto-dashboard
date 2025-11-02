import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      role="contentinfo"
      className="text-center text-xs text-slate-400 py-4"
    >
      {t("layout.footer")}
    </footer>
  );
}
