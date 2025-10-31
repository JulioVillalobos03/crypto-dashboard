import React from "react";
import { render, screen } from "@testing-library/react";
import ChartPie from "../components/ChartPie";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  PieChart: ({ children }) => <div data-testid="chart">{children}</div>,
  Pie: ({ children }) => <div>{children}</div>,
  Cell: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

describe("ChartPie", () => {
  const data = [
    { name: "Bitcoin", price_change_percentage_24h: 2.5 },
    { name: "Ethereum", price_change_percentage_24h: -1.8 },
  ];

  test("se renderiza correctamente el gráfico y el título", () => {
    render(<ChartPie data={data} limit={2} />);
    expect(screen.getByTestId("chart")).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-label",
      "accessibility_charts.pie_region_label"
    );
  });

  test("limita los elementos según el prop limit", () => {
    render(
      <ChartPie
        data={[...data, { name: "Litecoin", price_change_percentage_24h: 5 }]}
        limit={2}
      />
    );
    const list = screen.getByLabelText("accessibility_charts.pie_data_summary");
    expect(list.querySelectorAll("li").length).toBe(2);
  });
});
