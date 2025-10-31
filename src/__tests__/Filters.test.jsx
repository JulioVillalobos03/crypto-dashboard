import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../components/Filters";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, opts) => key,
  }),
}));

describe("Filters component", () => {
  let mockSetFilters, mockOnSearch, mockOnLimitChange;

  beforeEach(() => {
    mockSetFilters = jest.fn();
    mockOnSearch = jest.fn();
    mockOnLimitChange = jest.fn();
  });

  const baseFilters = {
    currency: "usd",
    order: "market_cap_desc",
    trend: "all",
    priceRange: "all",
  };

  test("renderiza todos los elementos principales", () => {
    render(
      <Filters
        filters={baseFilters}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onLimitChange={mockOnLimitChange}
      />
    );

    expect(screen.getByLabelText("labels.currency")).toBeInTheDocument();
    expect(screen.getByLabelText("labels.order")).toBeInTheDocument();
    expect(screen.getByLabelText("labels.trend")).toBeInTheDocument();
    expect(screen.getByLabelText("labels.price_range")).toBeInTheDocument();
    expect(screen.getByLabelText("labels.search")).toBeInTheDocument();
  });

  test("ejecuta setFilters al cambiar la moneda", () => {
    render(
      <Filters
        filters={baseFilters}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onLimitChange={mockOnLimitChange}
      />
    );

    const currencySelect = screen.getByLabelText("aria.currency");
    fireEvent.change(currencySelect, { target: { value: "eur" } });

    expect(mockSetFilters).toHaveBeenCalledWith(expect.any(Function));
  });

  test("ejecuta onLimitChange al cambiar el top N", () => {
    render(
      <Filters
        filters={baseFilters}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onLimitChange={mockOnLimitChange}
      />
    );

    const topSelect = screen.getByLabelText("aria.top");
    fireEvent.change(topSelect, { target: { value: "20" } });

    expect(mockOnLimitChange).toHaveBeenCalledWith(20);
  });

  test("ejecuta onSearch al escribir en el campo de búsqueda", () => {
    render(
      <Filters
        filters={baseFilters}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onLimitChange={mockOnLimitChange}
      />
    );

    const searchInput = screen.getByLabelText("aria.search");
    fireEvent.change(searchInput, { target: { value: "bitcoin" } });

    expect(mockOnSearch).toHaveBeenCalledWith("bitcoin");
  });

  test("restablece los filtros al hacer clic en el botón reset", () => {
    render(
      <Filters
        filters={{
          currency: "eur",
          order: "volume_desc",
          trend: "positive",
          priceRange: "high",
        }}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onLimitChange={mockOnLimitChange}
      />
    );

    const resetButton = screen.getByRole("button", { name: "aria.reset_filters" });
    fireEvent.click(resetButton);

    expect(mockSetFilters).toHaveBeenCalledWith({
      currency: "usd",
      order: "market_cap_desc",
      trend: "all",
      priceRange: "all",
    });
    expect(mockOnSearch).toHaveBeenCalledWith("");
    expect(mockOnLimitChange).toHaveBeenCalledWith(10);
  });
});
