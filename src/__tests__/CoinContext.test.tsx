import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CoinsProvider } from "../context/CoinsContext";
import * as useCoinsHook from "../hooks/useCoins";
import { useCoinsContext } from "../context/useCoinsContext";

describe("CoinsContext", () => {
  it("deve fornecer valores do hook useCoins", () => {
    const mockValue = {
      coins: { BTC: "50000" },
      history: [],
      loading: false,
      error: null,
    };

    vi.spyOn(useCoinsHook, "useCoins").mockReturnValue(mockValue);

    const { result } = renderHook(() => useCoinsContext(), {
      wrapper: ({ children }) => <CoinsProvider>{children}</CoinsProvider>,
    });

    expect(result.current).toEqual(mockValue);
  });

  it("deve lançar erro se usado fora do provider", () => {
    expect(() => renderHook(() => useCoinsContext())).toThrow(/useCoinsContext deve ser usado dentro de <CoinsProvider>/);
  });
});
