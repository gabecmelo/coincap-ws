import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type MockedFunction } from "vitest";
import CoinPage from "../pages/CoinPage";
import { useParams } from "react-router-dom";
import type { CoinPageHeaderProps } from "../types/coin";
import { useCoinsContext } from "../context/useCoinsContext";

// Mocks
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

vi.mock("../context/CoinsContext", () => ({
  useCoinsContext: vi.fn(),
}));

vi.mock("../components/CoinPageHeader", () => ({
  default: ({ symbol, currentPrice, variation }: CoinPageHeaderProps) => (
    <div data-testid="coin-header">
      {symbol} - {currentPrice} - {variation}
    </div>
  ),
}));

vi.mock("../components/CoinGraph", () => ({
  default: () => <div data-testid="coin-graph">Mock Graph</div>,
}));

vi.mock("../components/History", () => ({
  default: () => <div data-testid="coin-history">Mock History</div>,
}));

vi.mock("../context/useCoinsContext");

describe("CoinPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve exibir mensagem de carregamento", () => {
    (useParams as MockedFunction<typeof useParams>).mockReturnValue({ symbol: "bitcoin" });
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: {},
      history: [],
      loading: true,
      error: null,
    });

    render(<CoinPage />);
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro", () => {
    (useParams as MockedFunction<typeof useParams>).mockReturnValue({ symbol: "bitcoin" });
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: {},
      history: [],
      loading: false,
      error: {
        message: "Erro de rede",
        name: "example"
      },
    });

    render(<CoinPage />);
    expect(screen.getByText(/Erro: Erro de rede/)).toBeInTheDocument();
  });

  it("deve exibir mensagem de ativo não encontrado", () => {
    (useParams as MockedFunction<typeof useParams>).mockReturnValue({ symbol: "XYZ" });
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: {},
      history: [],
      loading: false,
      error: null,
    });

    render(<CoinPage />);
    expect(screen.getByText(/Ativo não encontrado/)).toBeInTheDocument();
  });

  it("deve exibir mensagem de dados indisponíveis", () => {
    (useParams as MockedFunction<typeof useParams>).mockReturnValue({ symbol: "bitcoin" });
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: {},
      history: [],
      loading: false,
      error: null,
    });

    const { container } = render(<CoinPage />);
    expect(
      container.firstChild).toMatchSnapshot();
  });

  it("deve renderizar dados do ativo corretamente", () => {
    (useParams as MockedFunction<typeof useParams>).mockReturnValue({ symbol: "bitcoin" });
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: { bitcoin: "50000" },
      history: [
        { symbol: "bitcoin", history: ["48000", "50000"] },
      ],
      loading: false,
      error: null,
    });

    render(<CoinPage />);
    expect(screen.getByTestId("coin-header")).toBeInTheDocument();
    expect(screen.getByText("$50000.00")).toBeInTheDocument();
    expect(screen.getByTestId("coin-graph")).toBeInTheDocument();
    expect(screen.getByTestId("coin-history")).toBeInTheDocument();
  });
});
