export default function UserMessage({ content, isSelf }) {
  return (
    <div className={`flex ${isSelf ? "justify-end" : ""}`}>
      <div
        className={`text-white p-4 rounded-2xl max-w-xs shadow rounded-tl whitespace-pre-wrap break-words ${
          isSelf ? "bg-purple-600 dark:bg-purple-800" : "bg-gray-400 dark:bg-gray-800"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
