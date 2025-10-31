import { toCurrency, toShortNumber } from "../utils/format";

describe("format utilities", () => {
  test("formatea correctamente un número en USD", () => {
    expect(toCurrency(1234.56, "USD")).toBe("$1,234.56");
  });

  test("formatea correctamente un número en EUR", () => {
    expect(toCurrency(9876.5, "EUR")).toBe("€9,876.50");
  });

  test("devuelve $0.00 si el valor es null, undefined o NaN", () => {
    expect(toCurrency(null)).toBe("$0.00");
    expect(toCurrency(undefined)).toBe("$0.00");
    expect(toCurrency(NaN)).toBe("$0.00");
  });

  test("devuelve número abreviado en miles (K)", () => {
    expect(toShortNumber(4500)).toBe("4.50K");
  });

  test("devuelve número abreviado en millones (M)", () => {
    expect(toShortNumber(7800000)).toBe("7.80M");
  });

  test("devuelve número abreviado en miles de millones (B)", () => {
    expect(toShortNumber(3200000000)).toBe("3.20B");
  });

  test("devuelve el número original si es menor a 1000", () => {
    expect(toShortNumber(999)).toBe(999);
  });
});
