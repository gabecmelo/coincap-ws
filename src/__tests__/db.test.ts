/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { initDB, saveCoins, loadCoins, saveHistory, loadHistory } from "../services/db";
import { openDB } from "idb";

vi.mock("idb", () => ({
  openDB: vi.fn(),
}));

const mockDb: any = {
  put: vi.fn(),
  get: vi.fn(),
  getAllKeys: vi.fn(),
  transaction: vi.fn(),
  objectStoreNames: { contains: vi.fn() },
};

describe("db.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (openDB as any).mockResolvedValue(mockDb);

    mockDb.transaction.mockReturnValue({
      objectStore: () => mockDb,
      done: Promise.resolve(),
    });
  });

  it("initDB deve chamar openDB com stores corretas", async () => {
    await initDB();
    expect(openDB).toHaveBeenCalledWith("CoinCapDB", 2, expect.any(Object));
  });

  it("saveCoins deve salvar moedas no store", async () => {
    const data = { BTC: "50000", ETH: "3000" };
    await saveCoins(data);

    expect(mockDb.put).toHaveBeenCalledWith("coins", "50000", "BTC");
    expect(mockDb.put).toHaveBeenCalledWith("coins", "3000", "ETH");
  });

  it("loadCoins deve retornar coins do store", async () => {
    mockDb.getAllKeys.mockResolvedValue(["BTC", "ETH"]);
    mockDb.get.mockImplementation((key: string) =>
      key === "BTC" ? "50000" : "3000"
    );

    const result = await loadCoins();
    expect(result).toEqual({ BTC: "50000", ETH: "3000" });
  });

  it("saveHistory deve salvar históricos no store", async () => {
    const history = [
      { symbol: "BTC", history: ["48000", "50000"] },
      { symbol: "ETH", history: ["2800", "3000"] },
    ];

    await saveHistory(history);
    expect(mockDb.put).toHaveBeenCalledWith("history", ["48000", "50000"], "BTC");
    expect(mockDb.put).toHaveBeenCalledWith("history", ["2800", "3000"], "ETH");
  });

  it("loadHistory deve retornar históricos do store", async () => {
    mockDb.getAllKeys.mockResolvedValue(["BTC"]);
    mockDb.get.mockResolvedValue(["48000", "50000"]);

    const result = await loadHistory();
    expect(result).toEqual([{ symbol: "BTC", history: ["48000", "50000"] }]);
  });
});
