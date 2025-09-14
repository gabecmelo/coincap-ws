import { useContext } from "react";
import { CoinsContext } from "./CoinsContext";

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