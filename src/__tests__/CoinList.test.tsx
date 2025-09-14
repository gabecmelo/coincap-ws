import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type MockedFunction } from "vitest";
import CoinList from "../components/CoinList";
import { useCoinsContext } from "../context/useCoinsContext";

vi.mock("react-router-dom", () => ({
  NavLink: vi.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

vi.mock("../context/CoinsContext", () => ({
  useCoinsContext: vi.fn(),
}));

vi.mock("../context/useCoinsContext");

describe("CoinList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve exibir mensagem de carregamento", () => {
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: {},
      loading: true,
      error: null,
      history: []
    });

    render(<CoinList />);
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro", () => {
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: {},
      loading: false,
      error: {
        message: "Erro de rede",
        name: ""
      },
      history: []
    });

    render(<CoinList />);
    expect(screen.getByText(/Erro: Erro de rede/)).toBeInTheDocument();
  });

  it("deve exibir lista de ativos corretamente", () => {
    (useCoinsContext as MockedFunction<typeof useCoinsContext>).mockReturnValue({
      coins: { BTC: "50000", ETH: "2000" },
      loading: false,
      error: null,
      history: []
    });

    render(<CoinList />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("$50000.00")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(screen.getByText("$2000.00")).toBeInTheDocument();
  });
});
