import type { CoinMap } from "../types/coin";

const ASSETS = ["bitcoin", "ethereum", "monero", "solana", "cardano"];
const WS_URL = `wss://ws.coincap.io/prices?assets=${ASSETS.join(",")}`;

export function subscribeAssets(
  onMessage: (data: CoinMap) => void,
  onError?: (err: Event) => void
): WebSocket {
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => console.log("Conexão WebSocket aberta");

  ws.onmessage = (event) => {
    const data: CoinMap = JSON.parse(event.data);
    console.log(data);
    onMessage(data);
  };

  ws.onerror = (err) => {
    console.error("Erro no WebSocket: ", err);
    if (onError) onError(err);
  };

  ws.onclose = () => console.log("Conexão WebSocket fechada");

  return ws;
}
