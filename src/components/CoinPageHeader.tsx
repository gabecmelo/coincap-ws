import type { CoinPageHeaderProps } from "../types/coin";

function CoinPageHeader({ symbol, currentPrice, variation }: CoinPageHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{symbol.toUpperCase()}</h1>
      <p className="text-lg">
        Preço atual:{" "}
        <span className="font-semibold">${parseFloat(currentPrice).toFixed(2)}</span>
      </p>
      <p
        className={`text-sm font-medium ${parseFloat(variation) >= 0 ? "text-green-600" : "text-red-600"
          }`}
      >
        Variação recente: {variation}%
      </p>
    </div>
  );
}

export default CoinPageHeader;