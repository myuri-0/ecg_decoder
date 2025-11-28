import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const QuestionsAndAnswersPage = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  // Пример загрузки истории — подставь запрос к backend, если он есть
  useEffect(() => {
    // Здесь вместо мок-данных можно сделать fetch(...)
    const mockHistory = [
      { id: 1, filename: "ecg_01.png", date: "2025-11-29" },
      { id: 2, filename: "heart_data.pdf", date: "2025-11-29" },
      { id: 3, filename: "record_03.dat", date: "2025-11-29" },
    ];

    setHistory(mockHistory);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative p-4">

      {/* Кнопка назад */}
      <button
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        onClick={() => navigate("/mainpage")}
      >
        Назад
      </button>

      {/* Личный кабинет */}
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
        onClick={() => navigate("/profile")}
      >
        Личный кабинет
      </button>

      {/* Контент */}
      <div className="flex flex-col items-center mt-20 px-4">


        {/* Центральное окно истории */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">

          <h2 className="text-3xl font-semibold mb-4 text-center">
            История загрузок файлов
          </h2>

          <div className="border rounded-lg p-4 max-h-80 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500 text-center">История пуста</p>
            ) : (
              <ul className="space-y-3">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 bg-gray-50 border rounded-md shadow-sm flex justify-between"
                  >
                    <span className="font-medium">{item.filename}</span>
                    <span className="text-gray-600 text-sm">
                      {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuestionsAndAnswersPage;
