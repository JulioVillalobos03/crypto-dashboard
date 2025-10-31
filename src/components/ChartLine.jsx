import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChartLine({ data = [], limit = 10 }) {
  const [tickInterval, setTickInterval] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setTickInterval(4);
      else if (width < 768) setTickInterval(2);
      else setTickInterval(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const chartDescription = t("charts.line_description", { value: limit });

  return (
    <section
      role="region"
      aria-label={t("charts.line_region_label")}
      aria-live="polite"
      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-3 transition-colors duration-300 w-full"
    >
      <h2
        tabIndex="0"
        className="text-sm font-bold mb-3 text-slate-700 dark:text-slate-200"
        aria-label={t("charts.line_title", { value: limit })}
      >
        {t("charts.line_title", { value: limit })}
      </h2>

      {/* Descripción oculta para lectores */}
      <p id="lineChartDesc" className="sr-only">
        {chartDescription}
      </p>
      {/* Lista narrable de datos */}
      {data.length > 0 && (
        <div className="sr-only" aria-label={t("charts.line_data_summary")}>
          <p>{t("charts.line_data_intro")}</p>
          <ul>
            {data.slice(0, limit).map((coin, i) => (
              <li key={coin.id || i}>
                {coin.name}:{" "}
                {t("charts.line_price_value", {
                  value: coin.current_price.toLocaleString(),
                })}
                ,{" "}
                {t("charts.line_marketcap_value", {
                  value: coin.market_cap.toLocaleString(),
                })}
                .
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gráfico visual */}
      <div
        className="w-full h-[280px] sm:h-[320px] md:h-[380px] flex justify-center items-center"
        role="img"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 5,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.3}
            />

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              interval={tickInterval}
              angle={-25}
              textAnchor="end"
              height={50}
              aria-hidden="true"
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 7 }}
              width={60}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              aria-hidden="true"
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #1e293b",
                color: "#1e293b",
                borderRadius: "6px",
                fontSize: "0.8rem",
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend
              verticalAlign="top"
              height={30}
              wrapperStyle={{
                fontSize: "0.75rem",
                color: "#64748b",
                paddingBottom: 10,
              }}
            />

            <Line
              type="monotone"
              dataKey="current_price"
              name={t("charts.line_price")}
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="market_cap"
              name={t("charts.line_marketcap")}
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
