import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  if (!profile) {
    return (
      <div className="app-shell flex min-h-screen items-center justify-center px-4">
        <div className="panel px-6 py-5 text-center">
          <p className="text-sm font-medium text-slate-700">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  const fullName = [profile.last_name, profile.first_name, profile.middle_name].filter(Boolean).join(" ");

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="eyebrow">Аккаунт</p>
            <h1 className="text-xl font-bold text-slate-950">Личный кабинет</h1>
          </div>
          <button className="btn-secondary" onClick={() => navigate("/mainpage")}>
            Назад
          </button>
        </div>
      </header>

      <main className="page-wrap">
        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="panel p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-teal-700 text-2xl font-bold text-white">
              {(profile.last_name?.[0] || "П").toUpperCase()}
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-950">{fullName || "Пользователь"}</h2>
            <p className="mt-2 text-sm text-slate-600">{profile.email}</p>
            <button onClick={() => navigate("/change-password")} className="btn-primary mt-6 w-full">
              Изменить пароль
            </button>
          </aside>

          <section className="panel p-6">
            <p className="eyebrow">Данные учетной записи</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Профиль специалиста</h2>

            <dl className="mt-6 divide-y divide-slate-200">
              <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="text-sm font-medium text-slate-500">Фамилия</dt>
                <dd className="text-sm font-semibold text-slate-950">{profile.last_name}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="text-sm font-medium text-slate-500">Имя</dt>
                <dd className="text-sm font-semibold text-slate-950">{profile.first_name}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="text-sm font-medium text-slate-500">Отчество</dt>
                <dd className="text-sm font-semibold text-slate-950">{profile.middle_name || "-"}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="text-sm font-medium text-slate-500">Email</dt>
                <dd className="text-sm font-semibold text-slate-950">{profile.email}</dd>
              </div>
            </dl>
          </section>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
