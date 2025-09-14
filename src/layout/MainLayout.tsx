import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer.tsx";

/**
 * MainLayout
 *
 * Layout principal para o conteúdo da página.
 * 
 * Implementa o Header e o Footer para todas as páginas.
 * Utiliza o elemento Outlet do react-router-dom para receber os conteúdos.
 */
export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
