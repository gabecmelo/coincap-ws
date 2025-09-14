import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CoinGraphProps } from "../types/coin";

/**
 * CoinGraph
 *
 * Componente para visualização do histórico de preços em forma de gráfico de Linha.
 * 
 * Utiliza elementos do recharts para exposição do gráfico.
 */
function CoinGraph({ coinHistory }: CoinGraphProps) {
  const chartData = coinHistory.history.map((price, index) => ({
    index: index + 1,
    price: parseFloat(price),
  }));

  return (
    <div className="w-full h-44">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="index" hide />
          <YAxis domain={["auto", "auto"]} hide />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            strokeLinejoin="round"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CoinGraph;
