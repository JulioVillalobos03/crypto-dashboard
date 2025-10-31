import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChartPie({ data = [], limit = 10 }) {
  const COLORS = [
    "#38bdf8", "#f97316", "#10b981", "#8b5cf6", "#ef4444",
    "#eab308", "#ec4899", "#14b8a6", "#3b82f6", "#a855f7",
    "#22c55e", "#f59e0b", "#64748b", "#6366f1", "#0ea5e9",
    "#f87171", "#4ade80", "#e879f9", "#fb923c", "#2dd4bf",
    "#f472b6", "#7c3aed", "#84cc16", "#60a5fa", "#c084fc",
    "#34d399", "#fbbf24", "#f43f5e", "#5eead4", "#a3e635",
  ];

  const { t } = useTranslation();

  const processedData = data.slice(0, limit).map((c) => ({
    name: c.name,
    value: Math.abs(c.price_change_percentage_24h || 0),
  }));

  const [chartSize, setChartSize] = useState({
    outerRadius: 150,
    innerRadius: 30,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setChartSize({ outerRadius: 70, innerRadius: 20 });
      else if (width < 768) setChartSize({ outerRadius: 100, innerRadius: 25 });
      else setChartSize({ outerRadius: 150, innerRadius: 30 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDynamicHeight = () => {
    if (limit <= 10) return "h-[460px]";
    if (limit <= 20) return "h-[480px]";
    if (limit <= 30) return "h-[500px]";
    return "h-[600px]";
  };

  const getRadiusByLimit = () => {
    if (limit <= 10) return chartSize.outerRadius;
    if (limit <= 20) return chartSize.outerRadius - 20;
    if (limit <= 30) return chartSize.outerRadius - 40;
    return chartSize.outerRadius - 60;
  };

  return (
    <section
      role="region"
      aria-label={t("accessibility_charts.pie_region_label")}
      aria-live="polite"
      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-4 transition-colors duration-300 w-full"
    >
      <h2
        tabIndex="0"
        className="text-sm font-bold mb-3 text-slate-700 dark:text-slate-200"
        aria-label={t("accessibility_charts.pie_title", { value: limit })}
      >
        {t("accessibility_charts.pie_title", { value: limit })}
      </h2>

      {/* Descripción general para lectores */}
      <p id="pieChartDesc" className="sr-only">
        {t("accessibility_charts.pie_description", { value: limit })}
      </p>

      {/* Lista narrable de datos */}
      {processedData.length > 0 && (
        <div
          className="sr-only"
          aria-label={t("accessibility_charts.pie_data_summary")}
        >
          <p>{t("accessibility_charts.pie_data_intro")}</p>
          <ul>
            {processedData.map((coin) => (
              <li key={coin.name}>
                {coin.name}:{" "}
                {t("accessibility_charts.pie_value", {
                  value: coin.value.toFixed(2),
                })}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gráfico visual */}
      <div
        className={`w-full ${getDynamicHeight()} flex flex-col items-center justify-center`}
        role="img"
        aria-describedby="pieChartDesc"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={getRadiusByLimit()}
              innerRadius={chartSize.innerRadius}
              paddingAngle={0.5}
            >
              {processedData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
              contentStyle={{
                background: "#fff",
                border: "1px solid #1e293b",
                color: "#1e293b",
                borderRadius: "6px",
                fontSize: "0.8rem",
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: 10,
                color: "#64748b",
                fontSize: "0.7rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                overflowY: limit > 20 ? "auto" : "visible",
                maxHeight: limit > 20 ? "120px" : "none",
                scrollbarWidth: "thin",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
