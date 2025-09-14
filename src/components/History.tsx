import type { HistoryProps } from "../types/coin";

/**
 * History
 *
 * Exibe o histórico das moedas em um card.
 */
function History({ coinHistory }: HistoryProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-stone-800">Histórico recente (últimos 10)</h2>
      <div className="bg-white rounded-lg border border-stone-100 p-4 shadow-sm">
        <ul className="space-y-2">
          {coinHistory.history.slice().reverse().map((price, i) => (
            <li key={i} className="flex justify-between text-sm text-stone-700">
              <span>{i + 1 === 1 ? "Mais recente" : `${i + 1}º`}</span>
              <span className="font-medium">${parseFloat(price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
