import { openDB } from 'idb';
import type { CoinMap, CoinHistory } from '../types/coin';

const DB_NAME = 'CoinCapDB';
const STORE_COINS = 'coins';
const STORE_HISTORY = 'history';

/**
 * initDB
 *
 * Inicializa/abre a base IndexedDB usada pela aplicação.
 * - DB name: "CoinCapDB"
 * - Object stores:
 *   - "coins"   → preços atuais por ativo
 *   - "history" → histórico de preços por ativo
 *
 * @returns {Promise<IDBPDatabase>} Promise que resolve para a conexão ao DB (idb).
 */
export async function initDB() {
  return openDB(DB_NAME, 2, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1 && !db.objectStoreNames.contains(STORE_COINS)) {
        db.createObjectStore(STORE_COINS);
      }
      if (oldVersion < 2 && !db.objectStoreNames.contains(STORE_HISTORY)) {
        db.createObjectStore(STORE_HISTORY);
      }
    },
  });
}

/**
 * saveCoins
 *
 * Persiste os preços fornecidos no object store "coins".
 * - Faz `db.put(STORE_COINS, value, symbol)` para cada par símbolo => preço.
 *
 * @param {CoinMap} data - Mapa `{ [symbol: string]: string }` contendo preços a salvar.
 * @returns {Promise<void>}
 */
export async function saveCoins(data: CoinMap) {
  const db = await initDB();
  for (const symbol in data) {
    db.put(STORE_COINS, data[symbol], symbol);
  }
}

/**
 * loadCoins
 *
 * Carrega todos os pares (chave => valor) do object store "coins".
 *
 * @returns {Promise<CoinMap>} Promise que resolve para o mapa de moedas (pode ser vazio).
 */
export async function loadCoins(): Promise<CoinMap> {
  const db = await initDB();
  const coins: CoinMap = {};
  const tx = db.transaction(STORE_COINS, 'readonly');
  const store = tx.objectStore(STORE_COINS);
  for (const symbol of await store.getAllKeys()) {
    const value = await store.get(symbol);
    coins[symbol as string] = value;
  }
  await tx.done;
  return coins;
}

/**
 * saveHistory
 *
 * Persiste o histórico fornecido no object store "history".
 * - Usa `db.put(STORE_HISTORY, historyArray, symbol)` para cada ativo.
 *
 * @param {CoinHistory[]} history - Lista de históricos por ativo.
 * @returns {Promise<void>}
 */
export async function saveHistory(history: CoinHistory[]) {
  const db = await initDB();
  for (const entry of history) {
    db.put(STORE_HISTORY, entry.history, entry.symbol);
  }
}

/**
 * loadHistory
 *
 * Carrega todos os históricos do object store "history".
 *
 * @returns {Promise<CoinHistory[]>} Promise que resolve para a lista de históricos.
 */
export async function loadHistory(): Promise<CoinHistory[]> {
  const db = await initDB();
  const tx = db.transaction(STORE_HISTORY, 'readonly');
  const store = tx.objectStore(STORE_HISTORY);
  const history: CoinHistory[] = [];
  for (const symbol of await store.getAllKeys()) {
    const values = await store.get(symbol);
    history.push({ symbol: symbol as string, history: values ?? [] });
  }
  await tx.done;
  return history;
}
