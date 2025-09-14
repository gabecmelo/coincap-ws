import type { CoinMap } from "../types/coin";

const ASSETS = ["bitcoin", "ethereum", "monero", "solana", "cardano"];
const WS_URL = `wss://ws.coincap.io/prices?assets=${ASSETS.join(",")}`;

/**
 * connectWebSocket
 *
 * Abre uma conexão WebSocket com CoinCap e delega mensagens recebidas
 * e erros para callbacks fornecidos.
 *
 * @param {(data: CoinMap) => void} onMessage Callback chamado quando chega uma nova mensagem
 * @param {(err: Event) => void} [onError] Callback opcional para erros
 * @returns {WebSocket} Objeto WebSocket
 */
export function connectWebSocket(
  onMessage: (data: CoinMap) => void,
  onError?: (err: Event) => void
): WebSocket {
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => console.log("[WS] Conexão aberta");
  
  ws.onmessage = (event) => {
    try {
      const data: CoinMap = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("[WS] Erro ao parsear mensagem:", err);
    }
  };

  ws.onerror = (err) => {
    console.error("[WS] Erro:", err);
    if (onError) onError(err);
  };

  ws.onclose = () => console.log("[WS] Conexão fechada");

  return ws;
}
