import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChartBar({ data = [], limit = 10 }) {
  const [isDark, setIsDark] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const processedData = data.slice(0, limit).map((c) => ({
    name: c.name,
    volume: c.total_volume,
  }));

  return (
    <section
      role="region"
      aria-label={t("accessibility_bar_chart.region_label")}
      aria-live="polite"
      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-3 transition-colors duration-300"
    >
      <h2
        tabIndex="0"
        className="text-sm font-bold mb-2 text-slate-800 dark:text-slate-200"
        aria-label={t("accessibility_bar_chart.title", { value: limit })}
      >
        {t("accessibility_bar_chart.title", { value: limit })}
      </h2>

      {/* Descripción accesible */}
      <p id="barChartDesc" className="sr-only">
        {t("accessibility_bar_chart.description", { value: limit })}
      </p>

      {/* Datos narrables */}
      {processedData.length > 0 && (
        <div
          className="sr-only"
          aria-label={t("accessibility_bar_chart.data_summary")}
        >
          <p>{t("accessibility_bar_chart.data_intro")}</p>
          <ul>
            {processedData.map((coin) => (
              <li key={coin.name}>
                {coin.name}:{" "}
                {t("accessibility_bar_chart.value_label", {
                  value: new Intl.NumberFormat("es-ES", {
                    notation: "compact",
                    maximumFractionDigits: 2,
                  }).format(coin.volume),
                })}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gráfico visual */}
      <div
        className="w-full h-[350px]"
        role="img"
        aria-describedby="barChartDesc"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData}>
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fontSize: 7 }}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 8 }}
              width={60}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(value)
              }
            />

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#f8fafc" : "#f8fafc",
                border: `1px solid ${isDark ? "#334155" : "#cbd5e1"}`,
                borderRadius: "8px",
                color: isDark ? "#0f172a" : "#0f172a",
                fontSize: "12px",
                padding: "8px 10px",
              }}
              formatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(value)
              }
              labelStyle={{
                color: isDark ? "#0f172a" : "#475569",
                fontWeight: 600,
              }}
            />

            <Legend
              wrapperStyle={{
                fontSize: "0.75rem",
                color: isDark ? "#cbd5e1" : "#334155",
                paddingTop: "6px",
              }}
            />

            <Bar
              dataKey="volume"
              fill="#EB0F0F"
              name={t("accessibility_bar_chart.legend_label")}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
