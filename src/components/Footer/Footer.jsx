import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="px-6 py-3">
        <div className="flex justify-between">
          <div>
            <span className="text-black dark:text-white text-sm">
              &copy; 2025 - WhoHats
            </span>
          </div>
          
          <div className="flex gap-3">
            <a href="https://griztonni.com/" target="_blank" className="text-black dark:text-white text-sm">
              Разработчик
            </a>
            <Link to="/rules" className="text-black dark:text-white text-sm">
              Правила общения
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
