import { createContext } from "react";
import { useCoins } from "../hooks/useCoins";
import type { ReactNode } from "react";
import type { CoinsContextValue } from "../types/coin";

const CoinsContext = createContext<CoinsContextValue | undefined>(undefined);

/**
 * CoinsProvider
 *
 * Provider responsável por expor o contexto de moedas (coins e histórico)
 * para toda a aplicação. Ele utiliza o hook {@link useCoins} para
 * gerenciar o estado de preços em tempo real e histórico.
 *
 * @param {object} props
 * @param {ReactNode} props.children - Componentes filhos que terão acesso ao contexto.
 *
 * @example
 * ```tsx
 * <CoinsProvider>
 *   <App />
 * </CoinsProvider>
 * ```
 */
export function CoinsProvider({ children }: { children: ReactNode }) {
  const { coins, history, loading, error } = useCoins();

  return (
    <CoinsContext.Provider value={{ coins, history, loading, error }}>
      {children}
    </CoinsContext.Provider>
  );
}

export { CoinsContext };
