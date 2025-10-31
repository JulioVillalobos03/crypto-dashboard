import axios from "axios";
import { getCoins } from "../api/coingecko";

jest.mock("axios");

describe("getCoins API function", () => {
  const mockResponse = [
    { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
    { id: "ethereum", symbol: "eth", name: "Ethereum" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("realiza una petición GET a la API con los parámetros correctos", async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getCoins({
      currency: "usd",
      perPage: 10,
      page: 2,
      order: "market_cap_desc",
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/coins/markets",
      expect.objectContaining({
        params: expect.objectContaining({
          vs_currency: "usd",
          per_page: 10,
          page: 2,
          order: "market_cap_desc",
          sparkline: false,
        }),
      })
    );

    expect(result).toEqual(mockResponse);
  });

  test("devuelve los datos esperados cuando la API responde correctamente", async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getCoins({});
    expect(result).toEqual(mockResponse);
  });

  test("lanza un error si la API falla", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(getCoins({})).rejects.toThrow("Network error");
  });
});
