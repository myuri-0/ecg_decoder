import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Введите email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!password) {
      newErrors.password = "Введите пароль";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors({ form: data.detail || "Не удалось войти в систему" });
        return;
      }

      navigate("/mainpage");
    } catch (error) {
      console.error(error);
      setErrors({ form: "Сервер недоступен. Проверьте подключение к backend." });
    }
  };

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl md:grid-cols-[1.05fr_0.95fr]">
        <div className="ecg-grid relative hidden min-h-[620px] overflow-hidden p-10 md:flex md:flex-col md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/85 px-3 py-1 text-sm font-medium text-teal-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              ECG Decoder
            </div>
            <h1 className="mt-8 max-w-md text-4xl font-bold leading-tight text-slate-950">
              Анализ ЭКГ без лишних шагов
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
              Загрузите файл исследования, получите визуализацию сигнала и сохраните результат в истории пациента.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-sm">
            <svg viewBox="0 0 520 150" className="h-28 w-full" role="img" aria-label="Схематичный сигнал ЭКГ">
              <polyline
                points="0,82 48,82 60,80 72,84 84,82 102,82 116,44 130,122 146,82 196,82 210,74 224,86 240,82 288,82 302,54 318,114 334,82 386,82 402,78 420,84 438,82 470,82 484,40 500,124 520,82"
                fill="none"
                stroke="#0f766e"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-slate-500">ЧСС</p>
                <p className="font-semibold text-slate-900">71 уд/мин</p>
              </div>
              <div>
                <p className="text-slate-500">Ритм</p>
                <p className="font-semibold text-slate-900">Синусовый</p>
              </div>
              <div>
                <p className="text-slate-500">Статус</p>
                <p className="font-semibold text-teal-700">Готово</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[620px] flex-col justify-center px-6 py-10 sm:px-10">
          <p className="eyebrow">Вход в кабинет</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Добро пожаловать</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Используйте учетную запись, чтобы перейти к загрузке ЭКГ и истории исследований.
          </p>

          {errors.form && (
            <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="doctor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`field ${errors.email ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : ""}`}
              />
              {errors.email && <p className="mt-1.5 text-sm text-rose-600">{errors.email}</p>}
            </div>

            <div>
              <label className="label" htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`field ${errors.password ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : ""}`}
              />
              {errors.password && <p className="mt-1.5 text-sm text-rose-600">{errors.password}</p>}
            </div>

            <button type="submit" className="btn-primary w-full">
              Войти
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
