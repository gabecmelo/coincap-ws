import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import { CoinsProvider } from "./context/CoinsContext";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <CoinsProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:symbol" element={<CoinPage />} />
        </Route>
      </Routes>
    </CoinsProvider>
  );
}

export default App;
