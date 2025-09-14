export interface CoinMap {
  [symbol: string]: string; // Ex.: bitcoin: "115585.68"
}

export interface CoinHistory {
  symbol: string;
  history: string[];
}

export interface CoinPageHeaderProps {
  symbol: string;
  currentPrice: string;
  variation: string;
}

export interface CoinGraphProps {
  coinHistory: CoinHistory;
}

export interface HistoryProps {
  coinHistory: CoinHistory
}


export interface CoinsContextValue {
  coins: CoinMap;
  history: CoinHistory[];
  loading: boolean;
  error: Error | null;
}
