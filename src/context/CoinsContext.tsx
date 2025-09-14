import { createContext, useContext } from "react";
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

/**
 * Hook para consumir o contexto de moedas.
 *
 * @throws {Error} Caso seja usado fora de um {@link CoinsProvider}.
 *
 * @returns {CoinsContextValue} Objeto contendo:
 * - `coins`: preços atuais (mapa de símbolo → preço)
 * - `history`: histórico de preços (últimos 10 valores por ativo)
 * - `loading`: indica se os dados ainda estão sendo carregados
 * - `error`: erro da conexão, se houver
 *
 * @example
 * ```tsx
 * const { coins, history, loading, error } = useCoinsContext();
 * ```
 */
export function useCoinsContext() {
  const ctx = useContext(CoinsContext);
  if (!ctx) throw new Error("useCoinsContext deve ser usado dentro de <CoinsProvider>");
  return ctx;
}
