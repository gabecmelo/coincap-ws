import { NavLink } from "react-router-dom";

/**
 * Header
 *
 * Exibe o título do app fixo no topo da página.
 */
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-full mx-auto px-20 py-6">
        <NavLink to="/" className="inline-block">
          <h1 className="hover:text-blue-600 transition duration-150 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-800">
            CoinCap WS
          </h1>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
