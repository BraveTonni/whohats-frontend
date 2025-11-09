import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout.jsx";

import Cookies from "js-cookie";

import WebSocketService from "./services/WebSocketService.js";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")).render(<Layout />);

let url = "ws://localhost:8000/api/ws";
const userId = Cookies.get("user_id");

if (userId) {
  url += `?user_id=${encodeURIComponent(userId)}`;
}

WebSocketService.connect(url);

// Закрываем WebSocket при закрытии вкладки или обновлении
window.addEventListener("beforeunload", () => {
  WebSocketService.stop();
});
