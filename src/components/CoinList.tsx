import { NavLink } from "react-router-dom";
import { useCoinsContext } from "../context/CoinsContext";

/**
 * CoinList
 *
 * Componente responsável por exibir a lista de ativos e seus preços,
 * consumindo o hook `useCoins`.
 *
 * Comportamento:
 * - Enquanto `loading` é true, exibe "Carregando...".
 * - Se `error` estiver presente, exibe a mensagem de erro.
 * - Caso contrário, renderiza uma <ul> com cada par símbolo - preço formatado.
 *
 * Observações:
 * - O componente usa `parseFloat(price).toFixed(2)` para mostrar o preço com 2 casas.
 * - Espera que `useCoins` forneça `coins` no formato `{ [symbol]: string }`.
 *
 * @component
 * @returns {JSX.Element}
 */
function CoinList() {
  const { coins, loading, error } = useCoinsContext();

  if (loading)
    return (
      <div className="p-6">
        <p className="text-sm text-stone-500">Carregando...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">Erro: {error.message}</p>
      </div>
    );

  return (
    <aside className="w-full">
      <ul className="space-y-3">
        {Object.entries(coins).map(([symbol, price]) => (
          <li key={symbol}>
            <NavLink
              to={`/${symbol}`}
              className="block"
            >
              <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-150 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="text-base font-medium text-stone-800">
                    {symbol.toUpperCase()}
                  </div>
                </div>

                <div className="text-sm font-semibold text-stone-700">
                  ${parseFloat(price).toFixed(2)}
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CoinList;
