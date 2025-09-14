import { createContext, useContext } from "react";
import { useCoins } from "../hooks/useCoins";
import type { ReactNode } from "react";
import type { CoinMap, CoinHistory } from "../types/coin";

interface CoinsContextValue {
  coins: CoinMap;
  history: CoinHistory[];
  loading: boolean;
  error: Error | null;
}

const CoinsContext = createContext<CoinsContextValue | undefined>(undefined);

export function CoinsProvider({ children }: { children: ReactNode }) {
  const { coins, history, loading, error } = useCoins();

  return (
    <CoinsContext.Provider value={{ coins, history, loading, error }}>
      {children}
    </CoinsContext.Provider>
  );
}

export function useCoinsContext() {
  const ctx = useContext(CoinsContext);
  if (!ctx) throw new Error("useCoinsContext deve ser usado dentro de <CoinsProvider>");
  return ctx;
}
