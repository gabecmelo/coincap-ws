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
export default function CoinList() {
  const { coins, loading, error } = useCoinsContext();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <ul className="space-y-2">
      {Object.entries(coins).map(([symbol, price]) => (
        <NavLink key={symbol} to={`/${symbol}`} >
          <li className="p-2 border rounded shadow-sm">
            {symbol.toUpperCase()} - ${parseFloat(price).toFixed(2)}
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
