import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import NotifyBanner from "./Tools/NotifyBanner";

import MainRoutes from "../MainRoutes";

import { BrowserRouter } from "react-router-dom";

import WebSocketService from "../services/WebSocketService";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAlreadyConnected, setIsAlreadyConnected] = useState(true);

  useEffect(() => {
    WebSocketService.subscribe("open", () => setIsConnecting(true));
    WebSocketService.subscribe("already_connected", () => {
      WebSocketService.isManuallyClosed = true;
      setIsAlreadyConnected(false);
      setIsConnecting(true);
    });
    WebSocketService.subscribe("close", () => setIsConnecting(false));
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="bg-gray-200 dark:bg-gray-800 flex-1 flex items-center justify-center p-4">
          <NotifyBanner
            title="Подключение к серверу..."
            description="Пожалуйста, подождите. Это может занять несколько секунд."
            isHidden={isConnecting}
          />

          <NotifyBanner
            title="Вы уже авторизованы с другого устройства."
            description="Пожалуйста, выйдите со всех устройств и перезагрузите страницу."
            isHidden={isAlreadyConnected}
          />

          <ToastContainer
            theme={localStorage.getItem("theme") || "dark"}
            autoClose={1000}
            pauseOnHover={false}
          />

          <MainRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
