import { useParams } from "react-router-dom";
import CoinPageHeader from "../components/CoinPageHeader";
import CoinGraph from "../components/CoinGraph";
import History from "../components/History";
import { ASSETS } from "../utils/assets";
import { useCoinsContext } from "../context/useCoinsContext";
// import CoinList from "../components/CoinList"; // Descomente caso queira visualizar a lista lateral

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

  if (loading) return <p className="pt-28 p-6">Carregando...</p>;
  if (error) return <p className="pt-28 p-6 text-red-500">Erro: {error.message}</p>;
  if (!symbol || !ASSETS.includes(symbol)) return <p className="pt-28 p-6">Ativo não encontrado.</p>;

  const currentPrice = coins[symbol];
  const coinHistory = history.find((h) => h.symbol === symbol);

  if (!currentPrice || !coinHistory) {
    return <p className="p-6">Dados indisponíveis para {symbol.toUpperCase()}</p>;
  }

  const first = parseFloat(coinHistory.history[0]);
  const last = parseFloat(coinHistory.history[coinHistory.history.length - 1]);
  const variation = (((last - first) / first) * 100).toFixed(2);

  return (
    <div className="pt-28 max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista lateral (era o meu objetivo quando pensei no projeto, mas como 
            foi solicitado para exibir "uma página de detalhes",
            eu mantive comentado esse exemplo, caso queira visualizar como ficaria,
            basta apenas descomentar o bloco de código abaixo)
            
            Seria implementado na página home, sem precisar de diferentes rotas (para visualizar esse conteúdo):
            */}

        {/*
        <div className="lg:col-span-1">
          <div className="mb-4">
            <CoinList />
          </div>
        </div> 
        */}

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
            <CoinPageHeader symbol={symbol} currentPrice={currentPrice} variation={variation} />
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col justify-center">
                  <div className="text-stone-700">
                    <div className="text-sm uppercase tracking-wide text-stone-500">Preço</div>
                    <div className="mt-2 text-4xl sm:text-5xl font-extrabold text-stone-900">
                      ${parseFloat(currentPrice).toFixed(2)}
                    </div>
                    <div className={`mt-2 text-lg font-medium ${parseFloat(variation) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {parseFloat(variation) >= 0 ? `+ ${variation}%` : `${variation}%`}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm">
                  <CoinGraph coinHistory={coinHistory} />
                </div>
              </div>
              <div className="mt-6">
                <History coinHistory={coinHistory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinPage;
