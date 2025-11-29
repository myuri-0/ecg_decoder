import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const QuestionsAndAnswersPage = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  const loadHistory = async (query = "") => {
    try {
      const url = query
        ? `http://localhost:8000/history?q=${encodeURIComponent(query)}`
        : `http://localhost:8000/history`;

      const res = await fetch(url, {
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Ошибка загрузки истории");
        return;
      }

      const data = await res.json();
      setHistory(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
    loadHistory(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative p-4">

      <button
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        onClick={() => navigate("/mainpage")}
      >
        Назад
      </button>

      <button
        className="absolute top-4 right-4 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
        onClick={() => navigate("/profile")}
      >
        Личный кабинет
      </button>


      <div className="flex flex-col items-center mt-20 px-4">

        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">

          <h2 className="text-2xl font-semibold mb-4 text-center">
            История загрузок файлов
          </h2>

          <input
            type="text"
            placeholder="Поиск по ФИО или названию файла..."
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />

          {/* Список загрузок */}
          <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50">

            {history.length === 0 ? (
              <p className="text-gray-500 text-center">Нет загруженных файлов</p>
            ) : (
              <ul className="space-y-2">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 bg-white border rounded-md shadow-sm grid grid-cols-3 items-center text-sm"
                  >
                   
                    <div className="font-medium text-left truncate">
                      {item.file_name || "без имени"}
                    </div>

                    <div className="text-center font-semibold">
                      {item.last_name} {item.first_name} {item.middle_name}
                    </div>

                    <div className="text-right text-gray-600">
                      {item.exam_date}
                    </div>
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
