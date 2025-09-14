import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CoinsProvider } from "./context/CoinsContext";

function App() {
  return (
      <CoinsProvider>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:symbol" element={<CoinPage />} />
          </Routes>
        </main>
        <Footer />
      </CoinsProvider>
  );
}

export default App;
