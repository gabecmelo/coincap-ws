import CoinList from "../components/CoinList";

/**
 * HomePage
 *
 * Página principal, exibe a lista de ativos utlizando o componente CoinList.
 */
function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-12">
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-1">
          Ativos em tempo real
        </h2>

        <p className="text-md sm:text-lg font-medium text-stone-600">
          Selecione um ativo para ver mais detalhes →
        </p>

        <div className="p-2 sm:p-4 bg-white rounded-xl shadow-sm border border-stone-200">
          <CoinList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
