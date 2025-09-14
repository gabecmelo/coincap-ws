import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer.tsx";

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
