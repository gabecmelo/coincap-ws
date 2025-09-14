import type { CoinPageHeaderProps } from "../types/coin";

/**
 * CoinPageHeader
 *
 * Exibe o nome da moeda, seu preço atual e sua variação no topo do card de visualização.
 */
function CoinPageHeader({ symbol, currentPrice, variation }: CoinPageHeaderProps) {
  return (
    <div className="text-left">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
        {symbol.toUpperCase()}
      </h1>
      <p className="text-sm text-stone-500 mt-1"> {symbol.toUpperCase()} — {symbol.toUpperCase()}</p>

      <div className="mt-4">
        <p className="text-base text-stone-600">
          Preço atual:{" "}
          <span className="font-semibold text-stone-900">${parseFloat(currentPrice).toFixed(2)}</span>
        </p>
        <p
          className={`mt-2 text-sm font-medium ${parseFloat(variation) >= 0 ? "text-green-600" : "text-red-600"
            }`}
        >
          Variação: {variation}%
        </p>
      </div>
    </div>
  );
}

export default CoinPageHeader;
