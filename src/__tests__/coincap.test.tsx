import { describe, it, expect, vi, beforeEach } from "vitest";
import { connectWebSocket } from "../api/coincap";

class MockWebSocket {
  url: string;
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: ((err: Event) => void) | null = null;
  onclose: (() => void) | null = null;

  constructor(url: string) {
    this.url = url;
    setTimeout(() => this.onopen?.(), 0);
  }

  send() {}
  close() {
    this.onclose?.();
  }
}

describe("connectWebSocket", () => {
  let originalWS: typeof WebSocket;

  beforeEach(() => {
    // Suprimindo mensagem de log e erro para não aparecer nos testes
    console.log = () => {};
    console.error = () => {};

    originalWS = global.WebSocket;
    // @ts-expect-error override
    global.WebSocket = MockWebSocket;
  });

  afterEach(() => {
    global.WebSocket = originalWS;
  });

  it("deve chamar onMessage ao receber dados válidos", () => {
    const onMessage = vi.fn();
    const ws = connectWebSocket(onMessage);

    const data = JSON.stringify({ BTC: "50000" });
    ws.onmessage?.({ data } as MessageEvent);

    expect(onMessage).toHaveBeenCalledWith({ BTC: "50000" });
  });

  it("deve chamar onError ao ocorrer erro", () => {
    const onError = vi.fn();
    const ws = connectWebSocket(() => {}, onError);

    ws.onerror?.(new Event("error"));
    expect(onError).toHaveBeenCalled();
  });

  it("deve logar erro ao receber JSON inválido", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const ws = connectWebSocket(() => {});

    ws.onmessage?.({ data: "{invalid-json" } as MessageEvent);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
