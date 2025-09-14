/* eslint-disable  @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCoins } from "../hooks/useCoins";
import * as db from "../services/db";
import { connectWebSocket } from "../api/coincap";
import type { CoinMap } from "../types/coin";

vi.mock("../services/db", () => ({
  saveCoins: vi.fn(() => Promise.resolve()),
  loadCoins: vi.fn(() => Promise.resolve()),
  saveHistory: vi.fn(() => Promise.resolve()),
  loadHistory: vi.fn(() => Promise.resolve()),
}));

vi.mock("../api/coincap", () => ({
  connectWebSocket: vi.fn(),
}));

describe("useCoins hook", () => {
  let wsMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    (db.loadCoins as any).mockResolvedValue({});
    (db.loadHistory as any).mockResolvedValue([]);

    wsMock = {
      close: vi.fn(),
    };

    (connectWebSocket as any).mockImplementation((onMessage: (data: CoinMap) => void, onError: (err: Event) => void) => {
      wsMock.onMessage = onMessage;
      wsMock.onError = onError;
      return wsMock;
    });
  });

  it("deve iniciar com loading true", async () => {
    const { result } = renderHook(() => useCoins());
    expect(result.current.loading).toBe(true);
    await act(async () => { });
    expect(result.current.loading).toBe(false);
  });

  it("deve carregar cache inicial de coins e history", async () => {
    (db.loadCoins as any).mockResolvedValue({ BTC: "50000" });
    (db.loadHistory as any).mockResolvedValue([
      { symbol: "BTC", history: ["48000", "50000"] },
    ]);

    const { result } = renderHook(() => useCoins());

    await act(async () => { });

    expect(result.current.coins).toEqual({ BTC: "50000" });
    expect(result.current.history).toEqual([
      { symbol: "BTC", history: ["48000", "50000"] },
    ]);
    expect(result.current.loading).toBe(false);
  });

  it("deve atualizar coins e history quando recebe mensagem WebSocket", async () => {
    const { result } = renderHook(() => useCoins());

    await act(async () => {
      wsMock.onMessage({ BTC: "51000" });
    });

    expect(result.current.coins).toEqual({ BTC: "51000" });
    expect(result.current.history[0]).toEqual({
      symbol: "BTC",
      history: ["51000"],
    });
    expect(result.current.loading).toBe(false);
  });

  it("deve registrar erro se WebSocket falhar", async () => {
    const { result } = renderHook(() => useCoins());

    await act(async () => {
      wsMock.onError(new Event("error"));
    });

    expect(result.current.error).toEqual(
      new Error("Erro na conexão WebSocket")
    );
  });

  it("deve salvar coins e history no cache ao atualizar", async () => {
    renderHook(() => useCoins());

    await act(async () => {
      wsMock.onMessage({ BTC: "52000" });
    });

    expect(db.saveCoins).toHaveBeenCalledWith({ BTC: "52000" });
    expect(db.saveHistory).toHaveBeenCalledWith([
      { symbol: "BTC", history: ["52000"] },
    ]);
  });
});
