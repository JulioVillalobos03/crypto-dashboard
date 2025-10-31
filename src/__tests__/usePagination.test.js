import { renderHook, act } from "@testing-library/react";
import usePagination from "../hooks/usePagination";

global.window = {};
global.document = {};
window.scrollTo = jest.fn();

describe("usePagination hook", () => {
  test("cambia de página correctamente", () => {
    const { result } = renderHook(() => usePagination(Array(50).fill(0), 10));

    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(1);
  });

  test("no debe avanzar más allá del total de páginas", () => {
    const { result } = renderHook(() => usePagination(Array(50).fill(0), 20));

    act(() => {
      result.current.nextPage();
      result.current.nextPage();
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(3);
  });
});
