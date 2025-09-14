import CoinList from "../components/CoinList";

function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Ativos em tempo real</h1>
      <CoinList />
    </div>
  );
}

export default HomePage;