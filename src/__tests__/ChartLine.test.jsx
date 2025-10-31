import React from "react";
import { render, screen } from "@testing-library/react";
import ChartLine from "../components/ChartLine";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  LineChart: ({ children }) => <div data-testid="chart">{children}</div>,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  Legend: () => null,
  Line: () => null,
  CartesianGrid: () => null,
}));

describe("ChartLine", () => {
  const data = [
    { name: "Bitcoin", current_price: 50000, market_cap: 800000000 },
    { name: "Ethereum", current_price: 3000, market_cap: 200000000 },
  ];

  test("renderiza correctamente el gráfico y título", () => {
    render(<ChartLine data={data} limit={2} />);
    expect(screen.getByTestId("chart")).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-label",
      "charts.line_region_label"
    );
  });

  test("muestra solo los elementos limitados", () => {
    render(
      <ChartLine
        data={[...data, { name: "Litecoin", current_price: 100, market_cap: 50000 }]}
        limit={2}
      />
    );
    const list = screen.getByLabelText("charts.line_data_summary");
    expect(list.querySelectorAll("li").length).toBe(2);
  });
});
