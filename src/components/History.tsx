import type { CoinHistory } from "../types/coin";

interface HistoryProps {
  coinHistory: CoinHistory
}

function History({ coinHistory }: HistoryProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Histórico recente</h2>
      <ul className="space-y-1">
        {coinHistory.history.map((price, i) => (
          <li key={i} className="text-sm">
            {i} - ${parseFloat(price).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;