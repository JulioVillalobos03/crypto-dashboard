import { useState } from "react";
import { useTranslation } from "react-i18next";

const currencies = ["usd", "eur", "mxn"];
const orders = [
  { value: "market_cap_desc", labelKey: "filters.order.market_cap_desc" },
  { value: "market_cap_asc", labelKey: "filters.order.market_cap_asc" },
  { value: "volume_desc", labelKey: "filters.order.volume_desc" },
];
const limits = [10, 20, 30];
const trends = [
  { value: "all", labelKey: "filters.trend.all" },
  { value: "positive", labelKey: "filters.trend.positive" },
  { value: "negative", labelKey: "filters.trend.negative" },
];

const currencyData = {
  usd: { symbol: "$", rate: 1 },
  eur: { symbol: "€", rate: 0.92 },
  mxn: { symbol: "MX$", rate: 18 },
};

export default function Filters({
  filters,
  setFilters,
  onSearch,
  onLimitChange,
}) {
  const [term, setTerm] = useState("");
  const { t } = useTranslation();

  const currentCurrency = filters.currency || "usd";
  const { symbol, rate } =
    currencyData[currentCurrency.toLowerCase()] || currencyData.usd;

  const priceRanges = [
    { value: "all", label: t("filters.price_range.all") },
    {
      value: "low",
      label: `${symbol}${(1 * rate).toLocaleString()} ${t(
        "filters.price_range.less"
      )}`,
    },
    {
      value: "medium",
      label: `${symbol}${(1 * rate).toLocaleString()} – ${symbol}${(
        100 * rate
      ).toLocaleString()}`,
    },
    {
      value: "high",
      label: `${symbol}${(100 * rate).toLocaleString()} – ${symbol}${(
        10000 * rate
      ).toLocaleString()}`,
    },
    {
      value: "very_high",
      label: `${symbol}${(10000 * rate).toLocaleString()}+`,
    },
  ];

  const resetFilters = () => {
    setFilters({
      currency: "usd",
      order: "market_cap_desc",
      trend: "all",
      priceRange: "all",
    });
    setTerm("");
    onSearch?.("");
    onLimitChange?.(10);
  };
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Moneda */}

        <div className="flex flex-col">
          <label
            htmlFor="currency"
            className="text-xs text-slate-600 dark:text-slate-400 mb-1"
          >
            {t("labels.currency")}
          </label>
          <select
            id="currency"
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-800 dark:text-slate-200"
            value={filters.currency}
            onChange={(e) =>
              setFilters((p) => ({ ...p, currency: e.target.value }))
            }
            aria-label={t("aria.currency")}
          >
            {currencies.map((c) => (
              <option key={c}>{c.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Orden */}
        <div className="flex flex-col">
          <label
            htmlFor="order"
            className="text-xs text-slate-600 dark:text-slate-400 mb-1"
          >
            {t("labels.order")}
          </label>
          <select
            id="order"
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-800 dark:text-slate-200"
            value={filters.order}
            onChange={(e) =>
              setFilters((p) => ({ ...p, order: e.target.value }))
            }
            aria-label={t("aria.order")}
          >
            {orders.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Top N */}
        <div className="flex flex-col">
          <label
            htmlFor="top"
            className="text-xs text-slate-600 dark:text-slate-400 mb-1"
          >
            {t("labels.top")}
          </label>
          <select
            id="top"
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-800 dark:text-slate-200"
            defaultValue={10}
            onChange={(e) => onLimitChange?.(parseInt(e.target.value))}
            aria-label={t("aria.top")}
          >
            {limits.map((n) => (
              <option key={n} value={n}>
                {t("filters.top", { value: n })}
              </option>
            ))}
          </select>
        </div>

        {/* Tendencia */}
        <div className="flex flex-col">
          <label
            htmlFor="trend"
            className="text-xs text-slate-600 dark:text-slate-400 mb-1"
          >
            {t("labels.trend")}
          </label>
          <select
            id="trend"
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-800 dark:text-slate-200"
            value={filters.trend || "all"}
            onChange={(e) =>
              setFilters((p) => ({ ...p, trend: e.target.value }))
            }
            aria-label={t("aria.trend")}
          >
            {trends.map((tItem) => (
              <option key={tItem.value} value={tItem.value}>
                {t(tItem.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Rango de precios */}
        <div className="flex flex-col">
          <label
            htmlFor="price-range"
            className="text-xs text-slate-600 dark:text-slate-400 mb-1"
          >
            {t("labels.price_range")}
          </label>
          <select
            id="price-range"
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-800 dark:text-slate-200"
            value={filters.priceRange || "all"}
            onChange={(e) =>
              setFilters((p) => ({ ...p, priceRange: e.target.value }))
            }
            aria-label={t("aria.price_range")}
          >
            {priceRanges.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="mt-5 px-3 py-1 text-sm rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 transition"
          aria-label={t("aria.reset_filters")}
        >
          {t("filters.reset")}
        </button>
      </div>

      {/* Buscador */}
      <div className="flex flex-col w-full md:w-auto">
        <label
          htmlFor="search"
          className="text-xs text-slate-600 dark:text-slate-400 mb-1"
        >
          {t("labels.search")}
        </label>
        <input
          id="search"
          type="text"
          placeholder={t("filters.search")}
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            onSearch?.(e.target.value);
          }}
          aria-label={t("aria.search")}
          className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-800 dark:text-slate-200"
        />
      </div>
    </div>
  );
}
