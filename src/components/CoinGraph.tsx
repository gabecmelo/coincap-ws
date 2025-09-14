import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CoinHistory } from "../types/coin";

interface CoinGraphProps {
  coinHistory: CoinHistory;
}

function CoinGraph({ coinHistory }: CoinGraphProps) {
  const chartData = coinHistory.history.map((price, index) => ({
    index,
    price: parseFloat(price),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="index" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CoinGraph;