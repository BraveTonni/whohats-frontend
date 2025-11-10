
export default function OptionButton({ children, isSelected, onClick }) {
  return (
    <button
      type="button"
      className={
        isSelected
          ? "flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2 rounded-lg text-black dark:text-white transition cursor-pointer border border-blue-500"
          : "flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2 rounded-lg text-black dark:text-white transition cursor-pointer"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
