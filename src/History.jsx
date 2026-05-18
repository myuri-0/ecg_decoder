import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HistoryPage = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  const loadHistory = async (query = "") => {
    try {
      const url = query
        ? `http://localhost:8000/history?q=${encodeURIComponent(query)}`
        : "http://localhost:8000/history";

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
    <div className="app-shell">
      <header className="topbar">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="eyebrow">Архив</p>
            <h1 className="text-xl font-bold text-slate-950">История исследований</h1>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => navigate("/mainpage")}>
              Назад
            </button>
            <button className="btn-secondary" onClick={() => navigate("/profile")}>
              Профиль
            </button>
          </div>
        </div>
      </header>

      <main className="page-wrap">
        <section className="panel overflow-hidden">
          <div className="border-b border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">Поиск и просмотр</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Загруженные файлы ЭКГ</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Используйте поиск по ФИО пациента или названию файла, чтобы быстро найти нужное исследование.
                </p>
              </div>
              <div className="w-full lg:max-w-md">
                <label className="label" htmlFor="history-search">
                  Поиск
                </label>
                <input
                  id="history-search"
                  type="text"
                  placeholder="ФИО или название файла"
                  value={search}
                  onChange={handleSearch}
                  className="field"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {history.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-400">
                  0
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">Исследований пока нет</h3>
                <p className="mt-2 text-sm text-slate-600">
                  После первой загрузки файл появится в этом списке.
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Файл</th>
                    <th className="px-6 py-3">Пациент</th>
                    <th className="px-6 py-3">Дата исследования</th>
                    <th className="px-6 py-3">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-950">
                        {item.file_name || "Без имени"}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {item.last_name} {item.first_name} {item.middle_name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.exam_date}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                          Сохранено
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HistoryPage;
