import { useEffect, useState, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { saveCoins, loadCoins } from "../services/db";
import type { CoinMap, CoinHistory } from "../types/coin";

const ASSETS = ["bitcoin", "ethereum", "monero", "solana", "cardano"];
const WS_URL = `wss://ws.coincap.io/prices?assets=${ASSETS.join(",")}`;

/**
 * Hook customizado para gerenciar preços de criptomoedas em tempo real
 * usando WebSocket (CoinCap API) com cache local via IndexedDB.
 *
 * - Conecta ao endpoint WebSocket e recebe atualizações em JSON.
 * - Mantém o estado atual das moedas (`coins`) e um histórico limitado (últimos 10 preços).
 * - Usa cache local para restaurar valores em caso de reconexão ou recarregamento da página.
 * - Implementa reconexão automática em falhas de rede.
 * 
 */
export function useCoins() {
  const [coins, setCoins] = useState<CoinMap>({});
  const [history, setHistory] = useState<CoinHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const lastSnapshotRef = useRef<CoinMap>({});

  const { lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: () => true,
    reconnectAttempts: 20,
    reconnectInterval: 3000,
    retryOnError: true,
    onOpen: () => console.log("[WS] Conectado"),
    onClose: (e) =>
      console.log(
        `[WS] Fechado code: ${e.code}, reason: ${e.reason}, wasClean: ${e.wasClean}`
      ),
    onError: (e) => {
      console.error("[WS] Erro", e);
      setError(new Error("Erro na conexão WebSocket"));
    },
  });

  const processMessage = throttle((message: CoinMap) => {
    if (!message) return;

    setCoins((prev) => {
      const newCoins = { ...prev, ...message };

      setHistory((prevHist) => {
        const updatedHist = [...prevHist];

        for (const [symbol, price] of Object.entries(message)) {
          const existing = updatedHist.find((h) => h.symbol === symbol);
          if (existing) {
            existing.history = [...existing.history, String(price)].slice(-10);
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
    if (lastJsonMessage) {
      processMessage(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    loadCoins()
      .then((cached) => {
        if (Object.keys(cached).length > 0) {
          setCoins(cached);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      saveCoins(coins).catch((err) =>
        console.error("Erro ao salvar no cache:", err)
      );
    }
  }, [coins]);

  return { coins, history, loading, error, readyState };
}
