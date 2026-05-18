import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/");
    }
  };

  const actions = [
    {
      to: "/explore",
      title: "Новое исследование",
      description: "Загрузить файл ЭКГ, заполнить данные пациента и получить результат анализа.",
      metric: "MAT",
      accent: "bg-teal-600",
    },
    {
      to: "/history",
      title: "История анализов",
      description: "Найти прошлые загрузки по пациенту, дате исследования или названию файла.",
      metric: "архив",
      accent: "bg-sky-600",
    },
    {
      to: "/profile",
      title: "Профиль",
      description: "Проверить данные учетной записи и перейти к настройкам доступа.",
      metric: "аккаунт",
      accent: "bg-indigo-600",
    },
    {
      to: "/faq",
      title: "Помощь",
      description: "Ответы на частые вопросы о форматах, обработке и хранении данных.",
      metric: "FAQ",
      accent: "bg-amber-600",
    },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="page-wrap flex items-center justify-between py-4">
          <div>
            <p className="eyebrow">ECG Decoder</p>
            <h1 className="text-xl font-bold text-slate-950">Рабочая панель</h1>
          </div>
          <button onClick={handleLogout} className="btn-danger">
            Выйти
          </button>
        </div>
      </header>

      <main className="page-wrap">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel overflow-hidden">
            <div className="ecg-grid p-6 sm:p-8">
              <p className="eyebrow">Сегодня</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-slate-950">
                Быстрый путь от файла ЭКГ к понятному заключению
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Начните новое исследование или откройте историю, чтобы сравнить результаты пациента в динамике.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm text-slate-500">Среднее время</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">до 1 мин</p>
                </div>
                <div className="rounded-md border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm text-slate-500">Формат MVP</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">.mat</p>
                </div>
                <div className="rounded-md border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm text-slate-500">Данные</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">в истории</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="panel p-6">
            <p className="eyebrow">Контроль качества</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950">Перед загрузкой</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" />
                Проверьте ФИО пациента и дату исследования.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" />
                Используйте файл с читаемым сигналом и корректным расширением.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" />
                После анализа результат появится на экране и сохранится в истории.
              </li>
            </ul>
          </aside>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {actions.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="panel group block p-5 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`h-2 w-12 rounded-full ${item.accent}`} />
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
                <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600">
                  {item.metric}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
