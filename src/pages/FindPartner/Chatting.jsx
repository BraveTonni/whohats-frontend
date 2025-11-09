import WebSocketService from "../../services/WebSocketService";

import { toast } from "react-toastify";

import { useEffect } from "react";
import { useState } from "react";

import ChatHeader from "../../components/Chat/ChatHeader";
import ChatFooter from "../../components/Chat/ChatFooter";
import ChatMessages from "../../components/Chat/ChatMessages";
import Call from "../../components/Chat/Call/Call";

import WebRTCService from "../../services/WebRTCService";

export default function Chatting({ setChattingComponent }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [callType, setCallType] = useState("")
  const [isCallInitiator, setCallInitiator] = useState(false)

  const audioRef = new Audio("/message.mp3");

  const addMessage = (content, self) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(), // гарантируем уникальность
        content,
        self,
      },
    ]);
  };

  const handleMessage = (data) => {
    addMessage(data.params.content, data.params.self);

    if (!data.params.self) {
      audioRef.currentTime = 0; // Сбрасываем для повторного проигрывания
      audioRef.play().catch((err) => {
        console.warn("Не удалось воспроизвести звук:", err);
      });
    }
  };

  const handleEnd = () => {
    setChattingComponent(false);
    toast("Чат был завершён", { type: "error" });
  };

  useEffect(() => {
    toast("Собеседник найден!", { type: "success" });

    // Подписываемся при монтировании
    WebSocketService.subscribe("message", handleMessage);
    WebSocketService.subscribe("end", handleEnd);

    // Отписываемся при размонтировании компонента
    return () => {
      WebSocketService.unsubscribe("message", handleMessage);
      WebSocketService.unsubscribe("end", handleEnd);

      WebRTCService.stop();
    };
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-gray-200 dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col min-h-[90vh]">
        <audio id="localAudio" autoPlay playsInline muted></audio>
        <audio id="remoteAudio" autoPlay playsInline></audio>

        <ChatHeader setCallType={setCallType} setCallInitiator={setCallInitiator} />

        <Call callType={callType} setCallType={setCallType} isInitiator={isCallInitiator} />

        <ChatMessages messages={messages} />

        <ChatFooter
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
        />
      </div>
    </div>
  );
}
