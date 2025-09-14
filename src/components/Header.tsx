import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex flex-row p-8 border-b border-stone-200">
        <NavLink to="/">
          <h1 className="text-3xl font-bold underline">Coincap WS</h1>
        </NavLink>
      </div>
    </>
  );
}

export default Header;