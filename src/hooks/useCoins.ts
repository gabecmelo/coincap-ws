import { useEffect, useState, useRef } from "react";
import throttle from "lodash.throttle";
import { saveCoins, loadCoins, saveHistory, loadHistory } from "../services/db";
import { connectWebSocket } from "../api/coincap";
import type { CoinMap, CoinHistory } from "../types/coin";

/**
 * Hook que gerencia os dados de moedas (coins) em tempo real via WebSocket.
 *
 * Ele:
 * - Conecta ao WebSocket da CoinCap
 * - Atualiza os preços em tempo real
 * - Mantém histórico (últimos 10 valores por ativo)
 * - Faz cache local (IndexedDB/localStorage)
 *
 * @returns {{
 *   coins: CoinMap,
 *   history: CoinHistory[],
 *   loading: boolean,
 *   error: Error | null
 * }}
 *
 * @example
 * ```tsx
 * const { coins, history, loading, error } = useCoins();
 *
 * if (loading) return <p>Carregando...</p>;
 * if (error) return <p>Erro: {error.message}</p>;
 *
 * return (
 *   <div>
 *     {Object.entries(coins).map(([symbol, price]) => (
 *       <p key={symbol}>{symbol}: {price}</p>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useCoins() {
  const [coins, setCoins] = useState<CoinMap>({});
  const [history, setHistory] = useState<CoinHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const lastSnapshotRef = useRef<CoinMap>({});

  const processMessage = throttle((message: CoinMap) => {
    if (!message) return;

    setCoins((prev) => {
      const newCoins = { ...prev, ...message };

      setHistory((prevHist) => {
        const updatedHist = [...prevHist];

        for (const [symbol, price] of Object.entries(message)) {
          const existing = updatedHist.find((h) => h.symbol === symbol);
          if (existing) {
            const lastValue = existing.history[existing.history.length - 1];
            if (lastValue !== String(price)) {
              existing.history = [...existing.history, String(price)].slice(-10);
            }
          } else {
            updatedHist.push({ symbol, history: [String(price)] });
          }
        }

        lastSnapshotRef.current = newCoins;
        return updatedHist;
      });

      return newCoins;
    });

    setError(null);
    setLoading(false);
  }, 1000);

  useEffect(() => {
    // Load cache inicial
    Promise.all([loadCoins(), loadHistory()])
      .then(([cachedCoins, cachedHistory]) => {
        if (Object.keys(cachedCoins).length > 0) setCoins(cachedCoins);
        if (cachedHistory.length > 0) setHistory(cachedHistory);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Conecta WebSocket
    const ws = connectWebSocket(
      (data) => processMessage(data),
      () => setError(new Error("Erro na conexão WebSocket"))
    );

    return () => ws.close();
  }, []); //eslint-disable-line

  // Salvar no cache
  useEffect(() => { if (Object.keys(coins).length > 0) saveCoins(coins).catch(console.error); }, [coins]);
  useEffect(() => { if (history.length > 0) saveHistory(history).catch(console.error); }, [history]);

  return { coins, history, loading, error };
}
