import CodeOffIcon from "@mui/icons-material/CodeOff";
import AdjustIcon from "@mui/icons-material/Adjust";
import { WbSunny } from "@mui/icons-material";
import ToggleThemeMode from "../../features/ToggleThemeMode";

import { Link } from "react-router-dom";

import { useState } from "react";
import WebSocketService from "../../services/WebSocketService";

export default function Header() {
  const [online, setOnline] = useState("...");

  const handleNewMessage = (data) => {
    setOnline(data.params.online);
  };

  WebSocketService.subscribe("stats", handleNewMessage);

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="px-6 py-3">
        <div className="flex justify-between">
          <div className="flex items-center mt-2">
            <span
              className="material-symbols-outlined circle text-black dark:text-white"
              alt="WhoHats Logo"
            >
              <CodeOffIcon />
            </span>
            <Link
              to="/"
              className="ml-2 text-black dark:text-white text-xl font-bold"
            >
              WhoHats
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-1">
              <span className="material-icons text-green-500">
                <AdjustIcon />
              </span>
              <span className="text-black dark:text-white mt-0.5" id="online">
                {online}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={ToggleThemeMode}
                className="material-icons text-black dark:text-gray-800 ml-2 cursor-pointer"
                id="changeTheme"
                data-theme="light"
              >
                <WbSunny />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
