import { toCurrency } from "../utils/format";
import  usePagination from "../hooks/usePagination";
import { useTranslation } from "react-i18next";

export default function Table({ data = [], currency = "USD" }) {
  const { currentData, currentPage, totalPages, loading, nextPage, prevPage } =
    usePagination(data, 20);

  const { t, i18n } = useTranslation();

  // Mapeo de nombres de moneda según el idioma
  const currencyLabels = {
    es: {
      usd: "dólares estadounidenses",
      eur: "euros",
      mxn: "pesos mexicanos",
    },
    en: {
      usd: "US dollars",
      eur: "euros",
      mxn: "Mexican pesos",
    },
  };

  const currentLang = i18n.language.startsWith("en") ? "en" : "es";
  const currencyName =
    currencyLabels[currentLang][currency.toLowerCase()] || currency;

  return (
    <div
      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg overflow-hidden"
      role="region"
      aria-label={t("table.region_label")}
      aria-live="polite"
    >
      {/* Estado de carga accesible */}
      {loading ? (
        <div
          role="status"
          aria-busy="true"
          className="animate-pulse p-6 text-center text-slate-400 dark:text-slate-500"
        >
          {t("app.loading")}
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-hide" role="presentation">
          <table
            role="table"
            className="w-full text-sm text-slate-900 dark:text-slate-100"
            aria-describedby="tableDescription"
          >
            <caption
              id="tableDescription"
              className="sr-only"
            >
              {t("table.aria_description")}
            </caption>

            <thead
              role="rowgroup"
              className="bg-slate-200 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
            >
              <tr role="row">
                <th role="columnheader" scope="col" className="px-3 py-2 text-left">
                  {t("table.number")}
                </th>
                <th role="columnheader" scope="col" className="px-3 py-2 text-left">
                  {t("table.coin")}
                </th>
                <th role="columnheader" scope="col" className="px-3 py-2 text-right">
                  {t("table.price")}
                </th>
                <th role="columnheader" scope="col" className="px-3 py-2 text-right">
                  {t("table.volume_24h")}
                </th>
                <th role="columnheader" scope="col" className="px-3 py-2 text-right">
                  {t("table.high_low_24h")}
                </th>
                <th role="columnheader" scope="col" className="px-3 py-2 text-right">
                  {t("table.market_cap")}
                </th>
                <th role="columnheader" scope="col" className="px-3 py-2 text-right">
                  {t("table.change_24h")}
                </th>
              </tr>
            </thead>

            <tbody role="rowgroup">
              {currentData.map((c, i) => (
                <tr
                  key={c.id}
                  role="row"
                  className="border-t border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition"
                >
                  <td role="cell" className="px-3 py-2">
                    {(currentPage - 1) * 20 + i + 1}
                  </td>

                  <td
                    role="cell"
                    className="px-3 py-2 flex items-center gap-2 min-w-[180px]"
                    aria-label={`${t("table.coin_name")}: ${c.name} (${c.symbol.toUpperCase()})`}
                  >
                    <img
                      src={c.image}
                      className="w-8 h-8 rounded-full"
                      alt={t("table.coin_logo_alt", { name: c.name })}
                    />
                    <div>
                      <div className="truncate">{c.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {c.symbol.toUpperCase()}
                      </div>
                    </div>
                  </td>

                  <td
                    role="cell"
                    className="px-3 py-2 text-right whitespace-nowrap"
                    aria-label={t("table.price_label", {
                      value: toCurrency(c.current_price, currency),
                      currency: currencyName,
                    })}
                  >
                    {toCurrency(c.current_price, currency)}
                  </td>

                  <td
                    role="cell"
                    className="px-3 py-2 text-right whitespace-nowrap"
                    aria-label={t("table.volume_label", {
                      value: toCurrency(c.total_volume, currency),
                      currency: currencyName,
                    })}
                  >
                    {toCurrency(c.total_volume, currency)}
                  </td>

                  <td
                    role="cell"
                    className="px-3 py-2 text-right"
                    aria-label={t("table.high_low_label", {
                      high: toCurrency(c.high_24h, currency),
                      low: toCurrency(c.low_24h, currency),
                      currency: currencyName,
                    })}
                  >
                    <div>{toCurrency(c.high_24h, currency)}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {toCurrency(c.low_24h, currency)}
                    </div>
                  </td>

                  <td
                    role="cell"
                    className="px-3 py-2 text-right whitespace-nowrap"
                    aria-label={t("table.market_cap_label", {
                      value: toCurrency(c.market_cap, currency),
                      currency: currencyName,
                    })}
                  >
                    {toCurrency(c.market_cap)}
                  </td>

                  <td
                    role="cell"
                    className={`px-3 py-2 text-right ${
                      c.price_change_percentage_24h >= 0
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                    aria-label={t("table.change_label", {
                      value: c.price_change_percentage_24h?.toFixed(2),
                    })}
                  >
                    {c.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      {!loading && (
        <nav
          role="navigation"
          aria-label={t("pagination.navigation_label")}
          className="flex items-center justify-between p-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
        >
          <span role="status">
            {t("pagination.page_of", {
              current: currentPage,
              total: totalPages,
            })}
          </span>

          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              aria-label={t("pagination.prev_aria")}
              className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {t("pagination.prev")}
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              aria-label={t("pagination.next_aria")}
              className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {t("pagination.next")}
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
