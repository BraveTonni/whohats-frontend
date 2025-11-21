import { useState } from "react";
import OptionGroup from "../../features/Option/OptionGroup";
import NotifyBanner from "../../components/Tools/NotifyBanner";
import WebSocketMessages from "../../services/WebSocketMessages";
import WebSocketService from "../../services/WebSocketService";

export default function FindPartner() {
  const [finding, setFinding] = useState(false);

  const genderOptions = [
    { value: "1", label: "М" },
    { value: "2", label: "Ж" },
    { value: "3", label: "Н" },
  ];

  const ageOptions = [
    { value: "1", label: "до 18 лет" },
    { value: "2", label: "18-21 год" },
    { value: "3", label: "22-25 лет" },
    { value: "4", label: "старше 25" },
  ];

  const startFindPartner = () => {
    WebSocketMessages.sendFindPartner(
      localStorage.getItem("my_gender") || "1",
      localStorage.getItem("my_age") || "1",
      localStorage.getItem("companion_gender") || "1",
      localStorage.getItem("companion_age") || "1"
    );
    setFinding(true);
  };

  WebSocketService.subscribe("partner_find", () => setFinding(false));

  return (
    <div className="rounded-xl bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Заголовок */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white pb-6 border-b border-gray-200 dark:border-gray-700">
              Поиск собеседника
            </h2>

            {/* Баннер поиска */}
            <div className="mt-6">
              <NotifyBanner
                title="Поиск собеседника"
                description="Пожалуйста, подождите. Это может занять несколько секунд."
                isHidden={!finding}
              />
            </div>

            {/* Основные настройки — адаптивная сетка */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Левая колонка: О себе */}
              <div className="space-y-7">
                <OptionGroup
                  groupName="my_gender"
                  options={genderOptions}
                  label="Ваш пол:"
                />
                <OptionGroup
                  groupName="my_age"
                  options={ageOptions}
                  label="Ваш возраст:"
                />
              </div>

              {/* Правая колонка: Собеседник */}
              <div className="space-y-7 lg:border-l lg:border-gray-300 dark:lg:border-gray-700 lg:pl-10">
                <OptionGroup
                  groupName="companion_gender"
                  options={genderOptions}
                  label="Пол собеседника:"
                />
                <OptionGroup
                  groupName="companion_age"
                  options={ageOptions}
                  label="Возраст собеседника:"
                />
              </div>
            </div>

            {/* Кнопка поиска */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center">
                <button
                  onClick={startFindPartner}
                  disabled={finding}
                  className={`
                    px-12 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform
                    ${finding 
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:scale-105 active:scale-95"
                    }
                    text-white shadow-blue-500/25
                  `}
                >
                  {finding ? "Поиск..." : "Найти собеседника"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}