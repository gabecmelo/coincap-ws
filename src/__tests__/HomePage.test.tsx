import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import HomePage from "../pages/HomePage";

// Mock do componente CoinList
vi.mock("../components/CoinList", () => ({
  default: () => <div data-testid="coin-list">Mock CoinList</div>,
}));

describe("HomePage", () => {
  it("deve renderizar o título corretamente", () => {
    render(<HomePage />);
    expect(screen.getByText("Ativos em tempo real")).toBeInTheDocument();
  });

  it("deve renderizar a instrução de seleção de ativo", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Selecione um ativo para ver mais detalhes →")
    ).toBeInTheDocument();
  });

  it("deve renderizar a CoinList", () => {
    render(<HomePage />);
    expect(screen.getByTestId("coin-list")).toBeInTheDocument();
  });
});
