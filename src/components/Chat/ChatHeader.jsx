import WebSocketMessages from "../../services/WebSocketMessages";

import CallIcon from "@mui/icons-material/Call";
import { Close } from "@mui/icons-material";


export default function ChatHeader(
  { setCallType, setCallInitiator }
) {
  return (
    <div className="p-6 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
      <div>
        <h2 className="text-black dark:text-white text-center text-2xl font-bold">
          Чат с анонимом
        </h2>
      </div>

      <div className="flex gap-2">
        <button
          data-active="false"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg transform hover:scale-105 transition cursor-pointer"
          onClick={() => {
            WebSocketMessages.sendCall()
            setCallType("outgoing")
            setCallInitiator(true)
          }}
        >
          <span className="material-icons text-white">
            <CallIcon />
          </span>
        </button>
        <button
          className="bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg transform hover:scale-105 transition cursor-pointer"
          onClick={() => WebSocketMessages.endChat()}
        >
          <span className="material-icons text-lg">
            <Close />
          </span>
        </button>
      </div>
    </div>
  );
}
