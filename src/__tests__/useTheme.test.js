import { renderHook, act } from "@testing-library/react";
import { useTheme } from "../hooks/useTheme";

// 🧩 Mock del localStorage (simple pero funcional)
beforeEach(() => {
  let store = {};
  global.localStorage = {
    getItem: (key) => store[key],
    setItem: (key, val) => (store[key] = val),
    clear: () => (store = {}),
  };
  document.documentElement.classList.remove("dark");
});

describe("useTheme hook", () => {
  test("usa el tema por defecto 'dark' si no hay nada guardado", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("cambia entre 'light' y 'dark' con toggleTheme", () => {
    const { result } = renderHook(() => useTheme());

    // cambia a light
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // vuelve a dark
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
