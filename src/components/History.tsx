import type { CoinHistory } from "../types/coin";

interface HistoryProps {
  coinHistory: CoinHistory
}

function History({ coinHistory }: HistoryProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Histórico recente (últimos 10)</h2>
      <ul className="space-y-1">
        {coinHistory.history.slice().reverse().map((price, i) => (
          <li key={i} className="text-sm">
            {i + 1} - ${`${parseFloat(price).toFixed(2)} ${i + 1 == 1 ? "(Valor mais recente)" : ""} `}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;