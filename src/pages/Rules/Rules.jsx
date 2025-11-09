export default function Rules() {
  const rules = [
    "Запрещены: оскорбления, мат, угрозы, спам",
    "Нельзя просить личные данные (фото, контакты, город)",
    "Не пиши о политике, религии и деньгах",
    "Собеседник может завершить чат в любой момент",
    "Запрещены: оскорбления, мат, угрозы, спам",
    "Нарушение = мгновенный бан"
  ]

  return (
    <>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl">
          <div className="p-6">
            <p className="text-black dark:text-white font-bold text-lg mb-3 flex items-center gap-2">
              Правила анонимного чата
            </p>
            <ul className="text-black dark:text-gray-300 text-sm space-y-2 leading-relaxed">
              {rules.map((rule) => {
                return <li>{rule}</li>
              })}
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Мы читаем каждое сообщение. Будь человеком 🙂
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
