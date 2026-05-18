import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EcgResearchPage = () => {
  const navigate = useNavigate();

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [exam_date, setBirthdate] = useState("");
  const [file, setFile] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Выберите файл ЭКГ");
      return;
    }

    const formData = new FormData();
    formData.append("last_name", lastname);
    formData.append("first_name", firstname);
    formData.append("middle_name", middlename);
    formData.append("exam_date", exam_date);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload-ecg", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        alert("Ошибка загрузки");
        return;
      }

      const data = await res.json();

      setImageSrc(`data:image/png;base64,${data.image_base64}`);
      setIsSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Ошибка соединения");
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="eyebrow">Исследование</p>
            <h1 className="text-xl font-bold text-slate-950">Анализ ЭКГ</h1>
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
        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form onSubmit={handleSubmit} className="panel p-5 sm:p-6">
            <p className="eyebrow">Данные пациента</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Новая загрузка</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Заполните карточку исследования и прикрепите файл ЭКГ в формате MAT.
            </p>

            <div className="mt-6 grid gap-4">
              <div>
                <label className="label" htmlFor="lastname">
                  Фамилия
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Иванов"
                  value={lastname}
                  disabled={isSubmitted}
                  onChange={(e) => setLastname(e.target.value)}
                  className="field"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="firstname">
                    Имя
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    placeholder="Иван"
                    value={firstname}
                    disabled={isSubmitted}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="field"
                  />
                </div>

                <div>
                  <label className="label" htmlFor="middlename">
                    Отчество
                  </label>
                  <input
                    id="middlename"
                    type="text"
                    placeholder="Иванович"
                    value={middlename}
                    disabled={isSubmitted}
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="exam_date">
                  Дата исследования
                </label>
                <input
                  id="exam_date"
                  type="date"
                  value={exam_date}
                  disabled={isSubmitted}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="field"
                />
              </div>

              <div>
                <label className="label" htmlFor="file">
                  Файл ЭКГ
                </label>
                <input
                  id="file"
                  type="file"
                  accept=".mat"
                  disabled={isSubmitted}
                  onChange={(e) => setFile(e.target.files[0])}
                  className="field file:mr-4 file:rounded-md file:border-0 file:bg-teal-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-teal-800 hover:file:bg-teal-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Выбранный файл: {file ? file.name : "файл пока не выбран"}
                </p>
              </div>

              {!isSubmitted && (
                <button type="submit" className="btn-primary w-full">
                  Загрузить и анализировать
                </button>
              )}
            </div>
          </form>

          <section className="space-y-6">
            <div className="panel overflow-hidden">
              <div className="ecg-grid p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Визуализация</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-950">Сигнал ЭКГ</h2>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${isSubmitted ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-600"}`}>
                    {isSubmitted ? "Готово" : "Ожидание файла"}
                  </span>
                </div>

                <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
                  {imageSrc ? (
                    <img src={imageSrc} alt="Результат анализа ЭКГ" className="max-h-[420px] w-full object-contain" />
                  ) : (
                    <svg viewBox="0 0 680 240" className="h-64 w-full text-teal-700" role="img" aria-label="Пустая область визуализации ЭКГ">
                      <polyline
                        points="0,126 70,126 82,122 94,130 110,126 150,126 166,58 184,186 202,126 284,126 300,114 316,134 334,126 420,126 438,72 458,170 478,126 560,126 578,118 596,132 616,126 640,126 654,90 670,160 680,126"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {isSubmitted && (
              <div className="panel p-5 sm:p-6">
                <p className="eyebrow">Заключение</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Описание результата</h2>
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md bg-slate-50 p-4">
                    <dt className="text-sm text-slate-500">Ритм</dt>
                    <dd className="mt-1 font-semibold text-slate-950">Синусовый</dd>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4">
                    <dt className="text-sm text-slate-500">ЧСС</dt>
                    <dd className="mt-1 font-semibold text-slate-950">71 уд/мин</dd>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4">
                    <dt className="text-sm text-slate-500">ЭОС</dt>
                    <dd className="mt-1 font-semibold text-slate-950">Повернута влево</dd>
                  </div>
                  <div className="rounded-md bg-teal-50 p-4">
                    <dt className="text-sm text-teal-700">Диагноз</dt>
                    <dd className="mt-1 font-semibold text-teal-900">Норма</dd>
                  </div>
                </dl>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
};

export default EcgResearchPage;
