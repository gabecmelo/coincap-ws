export interface CoinMap {
  [symbol: string]: string; // Ex.: bitcoin: "115585.68"
}

export interface CoinHistory {
  symbol: string;
  history: string[];
}
