import { useMemo, useState } from "react";
import { useCoins } from "../hooks/useCoins";
import Filters from "../components/Filters";
import ChartLine from "../components/ChartLine";
import ChartPie from "../components/ChartPie";
import Table from "../components/Table";
import ChartBar from "../components/ChartBar";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { coins, loading, error, filters, setFilters } = useCoins();
  const [search, setSearch] = useState("");
  const [ limitShow, setLimitShow ] = useState(10);

  const filteredCoins = useMemo(() => {

    let filtered = [...coins];

    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (c) => 
          c.name.toLowerCase().includes(lower) ||
          c.symbol.toLowerCase().includes(lower)
      );
    }

    if (filters.trend === "positive") {
      filtered = filtered.filter((c) => c.price_change_percentage_24h >= 0);
    } else if (filters.trend === "negative") {
      filtered = filtered.filter((c) => c.price_change_percentage_24h < 0);
    }

    switch (filters.priceRange) {
      case "low":
        filtered = filtered.filter((c) => c.current_price < 1);
        break;
      case "medium":
        filtered = filtered.filter((c) => c.current_price >= 1 && c.current_price < 100);
        break;
      case "high":
        filtered = filtered.filter((c) => c.current_price >= 100 && c.current_price < 10000);
        break;
      case "very_high":
        filtered = filtered.filter((c) => c.current_price >= 10000);
        break;
      default:
        break;
    }


    return filtered;


  }, [coins, search, filters]);

  const topShow = filteredCoins.slice(0, limitShow);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <Filters filters={filters} setFilters={setFilters} onSearch={setSearch} onLimitChange={setLimitShow} />

      {loading && <div>{t("app.loading")}</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartLine data={topShow} limit={limitShow} />
            <ChartPie data={topShow}  limit={limitShow}/>
            <ChartBar data={topShow} limit={limitShow} />
          </div>

          <Table data={filteredCoins} currency={filters.currency} />
        </>
      )}
    </div>
  );
}
