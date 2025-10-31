import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../components/Layout";

jest.mock("../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "dark",
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("../components/LangSwitcher", () => () => (
  <div data-testid="LangSwitcher" />
));

jest.mock("../components/ThemeSwitcher", () => () => (
  <div data-testid="ThemeSwitcher" />
));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, vars) => key + (vars ? JSON.stringify(vars) : ""),
    i18n: { language: "es" },
  }),
}));

describe("Layout Component", () => {
  test("renderiza el título, children y controles", () => {
    render(
      <Layout>
        <p>Contenido de prueba</p>
      </Layout>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/app.title/)).toBeInTheDocument();

    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();

    expect(screen.getByTestId("LangSwitcher")).toBeInTheDocument();
    expect(screen.getByTestId("ThemeSwitcher")).toBeInTheDocument();
  });

  test("muestra el anuncio accesible con idioma y tema", () => {
    render(<Layout>Contenido</Layout>);

    const announcement = screen.getByText(/layout.announcement/, {
      exact: false,
    });
    expect(announcement).toHaveAttribute("aria-live", "assertive");
  });
});
