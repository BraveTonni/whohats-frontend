import { useState } from "react";
import OptionGroup from "../../features/Option/OptionGroup";
import NotifyBanner from "../../components/Tools/NotifyBanner";
import WebSocketMessages from "../../services/WebSocketMessages";
import WebSocketService from "../../services/WebSocketService";

export default function FindPartner() {
  const [finding, setFinding] = useState(false);

  // Определите опции для каждой группы
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
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-black text-center text-2xl font-bold pb-8 border-b border-gray-300 dark:border-gray-700 dark:text-white">
            Поиск собеседника
          </h2>

          <NotifyBanner
            title="Поиск собеседника"
            description="Пожалуйста, подождите. Это может занять несколько секунд."
            isHidden={!finding}
          />

          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="space-y-6">
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

            <div className="space-y-6 border-l border-gray-300 dark:border-gray-700 pl-8">
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

          <div className="mt-4 text-center border-t border-gray-300 dark:border-gray-700 pt-8">
            <button
              id="startSearch"
              className="bg-gray-200 dark:hover:bg-gray-700 px-10 py-4 rounded-2xl text-black dark:text-white font-bold text-lg shadow-lg transform hover:scale-105 hover:bg-gray-400 dark:bg-gray-800 transition cursor-pointer"
              onClick={() => startFindPartner()}
            >
              Найти собеседника
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
