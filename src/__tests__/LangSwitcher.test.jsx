import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LangSwitcher from "../components/LangSwitcher";

const mockChangeLanguage = jest.fn();

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "es",
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

beforeAll(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key],
      setItem: (key, value) => (store[key] = value),
      clear: () => (store = {}),
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});

describe("LangSwitcher", () => {
  test("renderiza el idioma actual", () => {
    render(<LangSwitcher />);
    const select = screen.getByLabelText("Select language");
    expect(select.value).toBe("es");
  });

  test("llama a changeLanguage al cambiar el idioma", () => {
    render(<LangSwitcher />);
    const select = screen.getByLabelText("Select language");
    fireEvent.change(select, { target: { value: "en" } });

    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
    expect(window.localStorage.getItem("i18nextLng")).toBe("en");
  });
});
