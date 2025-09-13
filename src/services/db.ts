import { openDB } from 'idb';
import type { CoinMap } from '../types/coin';

const DB_NAME = 'CoinCapDB';
const STORE_NAME = 'coins';

/**
 * initDB
 *
 * Inicializa/abre a base IndexedDB usada pela aplicação.
 * - DB name: "CoinCapDB"
 * - Object store: "coins"
 *
 * Garante a criação do object store na versão 1.
 *
 * @returns {Promise<IDBPDatabase>} Promise que resolve para a conexão ao DB (idb).
 */
export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

/**
 * saveCoins
 *
 * Persiste os preços fornecidos no object store "coins".
 * - Faz `db.put(STORE_NAME, value, symbol)` para cada par símbolo => preço.
 *
 * Observações:
 * - Não remove chaves que não estejam no objeto `data` (faz put apenas nas chaves recebidas).
 * - Não retorna nenhum valor; lança se ocorrer um erro de IndexedDB.
 *
 * @param {CoinMap} data - Mapa `{ [symbol: string]: string }` contendo preços a salvar.
 * @returns {Promise<void>}
 */
export async function saveCoins(data: CoinMap) {
  const db = await initDB();
  for (const symbol in data) {
    db.put(STORE_NAME, data[symbol], symbol);
  }
}

/**
 * loadCoins
 *
 * Carrega todos os pares (chave => valor) do object store "coins" e
 * retorna um CoinMap com `{ [symbol]: value }`.
 *
 * Implementação:
 * - abre uma transação readonly,
 * - obtém todas as keys com `store.getAllKeys()`,
 * - para cada key faz `store.get(key)` e preenche o mapa retornado.
 *
 * @returns {Promise<CoinMap>} Promise que resolve para o mapa de moedas (pode ser vazio).
 */
export async function loadCoins(): Promise<CoinMap> {
  const db = await initDB();
  const coins: CoinMap = {};
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  for (const symbol of await store.getAllKeys()) {
    const value = await store.get(symbol);
    coins[symbol as string] = value;
  }
  await tx.done;
  return coins;
}
