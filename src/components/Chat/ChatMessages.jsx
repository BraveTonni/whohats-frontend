import UserMessage from "../../components/Chat/UserMessage";

export default function ChatMessages({ messages }) {
  return (
    <div
      id="messages"
      className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 max-h-[70vh]"
    >
      {messages.map((msg, index) => {
        return (
          <UserMessage content={msg.content} isSelf={msg.self} key={index} />
        );
      })}
    </div>
  );
}
