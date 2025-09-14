function Footer() {
  return (
    <footer className=" flex w-full bg-white border-t border-stone-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 text-md text-stone-400">
        © {new Date().getFullYear()} CoinCap WS — Criptomoedas em tempo real
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 text-md text-stone-400">
        © Desenvolvido por Gabriel Cabral Melo
      </div>
    </footer>
  );
}

export default Footer;
