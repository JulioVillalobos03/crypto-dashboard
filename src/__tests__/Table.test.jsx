import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../components/Table";
import { useTranslation } from "react-i18next";
import usePagination from "../hooks/usePagination";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, opts) => key,
    i18n: { language: "en" },
  }),
}));

jest.mock("../hooks/usePagination", () => jest.fn());

const mockData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: "https://example.com/bitcoin.png",
    current_price: 45000,
    total_volume: 1200000000,
    high_24h: 46000,
    low_24h: 44000,
    market_cap: 850000000000,
    price_change_percentage_24h: 2.5,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image: "https://example.com/ethereum.png",
    current_price: 3200,
    total_volume: 500000000,
    high_24h: 3300,
    low_24h: 3100,
    market_cap: 350000000000,
    price_change_percentage_24h: -1.8,
  },
];

describe("Table component", () => {
  beforeEach(() => {
    usePagination.mockReturnValue({
      currentData: mockData,
      currentPage: 1,
      totalPages: 3,
      loading: false,
      nextPage: jest.fn(),
      prevPage: jest.fn(),
    });
  });

  test("renderiza los nombres de las criptomonedas", () => {
    render(<Table data={mockData} currency="USD" />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  test("muestra el estado de carga", () => {
    usePagination.mockReturnValueOnce({
      currentData: [],
      currentPage: 1,
      totalPages: 1,
      loading: true,
      nextPage: jest.fn(),
      prevPage: jest.fn(),
    });
    render(<Table data={[]} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("desactiva el botón 'prev' en la primera página", () => {
    render(<Table data={mockData} />);
    const prevButton = screen.getByRole("button", { name: "pagination.prev_aria" });
    expect(prevButton).toBeDisabled();
  });

  test("renderiza correctamente los precios formateados", () => {
    render(<Table data={mockData} currency="USD" />);
    expect(screen.getAllByText(/\$/)[0]).toBeInTheDocument();
  });
});
