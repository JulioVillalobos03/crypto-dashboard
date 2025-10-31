import React from "react";
import { render, screen } from "@testing-library/react";
import ChartBar from "../components/ChartBar";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div data-testid="chart">{children}</div>,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  Legend: () => null,
  Bar: () => null,
}));

describe("ChartBar", () => {
  const data = [
    { name: "Bitcoin", total_volume: 500000 },
    { name: "Ethereum", total_volume: 200000 },
  ];

  test("se renderiza correctamente con datos", () => {
    render(<ChartBar data={data} limit={2} />);
    expect(screen.getByTestId("chart")).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-label",
      "accessibility_bar_chart.region_label"
    );
  });

  test("limita la cantidad de elementos mostrados", () => {
    render(
      <ChartBar
        data={[...data, { name: "Litecoin", total_volume: 10000 }]}
        limit={2}
      />
    );
    const list = screen.getByLabelText("accessibility_bar_chart.data_summary");
    expect(list.querySelectorAll("li").length).toBe(2);
  });
});
