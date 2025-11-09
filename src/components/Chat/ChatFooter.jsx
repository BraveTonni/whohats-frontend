import SendIcon from "@mui/icons-material/Send";

import WebSocketMessages from "../../services/WebSocketMessages";

export default function ChatFooter({ currentMessage, setCurrentMessage }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Предотвращаем перенос строки
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return; // Не отправляем пустое сообщение

    WebSocketMessages.sendNewMessage(currentMessage);
    setCurrentMessage("");
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Напишите сообщение..."
          className="flex-1 bg-gray-300 dark:bg-gray-800 text-black dark:text-white px-5 py-4 rounded-full outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-500"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={(e) => {
            if (e.target.value.length > 1024)
              e.target.value = e.target.value.substring(0, 1024);
          }}
        />
        <button
          className="flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition"
          onClick={handleSendMessage}
        >
          <span className="material-icons text-lg">
            <SendIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
