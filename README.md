# CoinCap WS

Aplicação React que consome preços em tempo real via WebSocket (CoinCap).

## 🔹 Descrição

A aplicação conecta ao WebSocket público do CoinCap para listar preços de ativos em tempo real, exibir detalhe por ativo com histórico recente (últimos 10 valores) e armazenar cache local em **IndexedDB**.

## 🔹 Funcionalidades

* Conexão a WebSocket do CoinCap e recebimento de mensagens JSON em tempo real.
* Lista de ativos monitorados com preços atualizados em tempo real.
* Página de detalhe do ativo com:

  * Nome (símbolo/symbol) do ativo.
  * Preço atual formatado com 2 casas decimais.
  * Variação calculada a partir do primeiro e último valor do histórico da sessão.
  * Gráfico exibindo o histórico da sessão (últimos 10 valores).
* Cache local com IndexedDB (stores `coins` e `history`).
* Testes utilizando: **Vitest + Testing Library**.
* Estilização com: **Tailwind CSS**.

## 💻 Tecnologias

* React + Vite
* TypeScript
* Tailwind CSS
* idb (IndexedDB)
* Vitest + @testing-library/react
* lodash.throttle

## ⚙️ Como rodar (instalação)

```bash
git clone https://github.com/gabecmelo/coincap-ws.git
#ou caso tenha uma chave ssh:
git clone git@github.com:gabecmelo/coincap-ws.git

cd coincap-ws

npm install
```

### Desenvolvimento

```bash
npm run dev
# abrir http://localhost:5173/ por padrão ou a URL mostrada no terminal
```

### Build e Preview

```bash
npm run build

npm run preview
# abrir http://localhost:4173/ por padrão ou a URL mostrada no terminal
```

> Observação: `preview` serve o bundle estático.

## 🗂 Estrutura do projeto (resumo)

```
src/
├─ __tests__              # Pasta de testes
├─ api/
│  └─ coincap.ts          # Conexão WebSocket / helper
├─ components/
│  ├─ CoinGraph.tsx       # Gráfico
│  ├─ CoinList.tsx        # Lista de ativos
│  ├─ CoinPageHeader.tsx
│  ├─ Footer.tsx
│  ├─ Header.tsx
│  └─ History.tsx         # Histórico dos ativos
├─ context/
│  ├─ CoinsContext.tsx    # CoinsProvider
│  └─ useCoinsContext.ts  # hook de consumo do contexto
├─ hooks/
│  └─ useCoins.ts         # lógica do WebSocket, cache e histórico
├─ layout/
│  └─ MainLayout.tsx
├─ pages/
│  ├─ HomePage.tsx        # Página principal
│  └─ CoinPage.tsx        # Página para cada moeda existente
├─ services/
│  └─ db.ts               # initDB, save/load coins/history
├─ api/
│  └─ coincap.ts          # connectWebSocket
├─ utils/
│  └─ assets.ts           # lista de ASSETS (ativos utilizados)
└─ main.tsx               # BrowserRouter + basename
```

## 🔧 Configurações importantes

* **basename** do `BrowserRouter` é definido via `import.meta.env.BASE_URL` (Vite) para suportar `dev` (`/`) e `preview`/deploy em subpath (`/coincap-ws/`).
* Porém, ambos estão utilizando `/coincap-ws` com as últimas configurações do `vite.config.ts` aplicadas para simplificação.


## 🧪 Testes

* Rodar os testes:

```bash
npm run test
# ou
npm run test:watch
# ou
npm run coverage
```

## 🔁 IndexedDB (cache local)

* DB: `CoinCapDB` com stores `coins` e `history`.
* Para limpar e simular primeira execução caso necessário:

  * DevTools → Application → IndexedDB → Delete Database
  * Ou no console: `indexedDB.deleteDatabase('CoinCapDB')`

## 📌 Considerações finais

* Caso tenha alguma dúvida, sinta-se livre para enviar uma mensagem no meu email: contatogabemelo@gmail.com

## 📝 Autor

Gabriel Melo
