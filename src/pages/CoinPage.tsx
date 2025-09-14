import { useParams } from "react-router-dom";
import { useCoinsContext } from "../context/CoinsContext";
import CoinPageHeader from "../components/CoinPageHeader";
import CoinGraph from "../components/CoinGraph";
import History from "../components/History";

/**
 * CoinPage
 *
 * Página de detalhes de um ativo:
 * - Nome/símbolo
 * - Preço atual
 * - Variação recente
 * - Gráfico do histórico (últimos 10 valores)
 * - Lista com os valores históricos
 */
function CoinPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const { coins, history, loading, error } = useCoinsContext();
  

  if (loading) return <p className="p-4">Carregando...</p>;
  if (error) return <p className="p-4 text-red-500">Erro: {error.message}</p>;
  if (!symbol) return <p className="p-4">Ativo não encontrado.</p>;

  const currentPrice = coins[symbol];
  const coinHistory = history.find((h) => h.symbol === symbol);

  if (!currentPrice || !coinHistory) {
    return <p className="p-4">Dados indisponíveis para {symbol.toUpperCase()}</p>;
  }

  const first = parseFloat(coinHistory.history[0]);
  const last = parseFloat(coinHistory.history[coinHistory.history.length - 1]);
  const variation = (((last - first) / first) * 100).toFixed(2);

  return (
    <div className="p-6 space-y-6">
      <CoinPageHeader symbol={symbol} currentPrice={currentPrice} variation={variation} />
      <CoinGraph coinHistory={coinHistory}/>
      <History coinHistory={coinHistory} />
    </div>
  );
}

export default CoinPage;
