import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EcgFaqPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Какие форматы файлов ЭКГ можно загружать?",
      answer: "В текущей версии MVP форма принимает файлы .mat. Поддержку изображений и PDF лучше добавлять отдельным этапом, чтобы не смешивать разные пайплайны обработки.",
    },
    {
      question: "Как долго обрабатывается файл ЭКГ?",
      answer: "Обычно обработка занимает от нескольких секунд до минуты. Время зависит от размера файла и доступности backend-сервиса.",
    },
    {
      question: "Можно ли загрузить новый файл после анализа?",
      answer: "Да. Вернитесь на главную страницу и начните новое исследование или обновите текущую страницу.",
    },
    {
      question: "Где сохраняются загруженные ЭКГ?",
      answer: "После успешной обработки записи доступны на странице истории. Там можно найти исследование по пациенту, дате или названию файла.",
    },
    {
      question: "Что делать, если файл не загружается?",
      answer: "Проверьте расширение файла, соединение с backend и авторизацию. Если ошибка повторяется, стоит посмотреть ответ сервера в консоли разработчика.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="eyebrow">Поддержка</p>
            <h1 className="text-xl font-bold text-slate-950">Вопросы и ответы</h1>
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
        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="panel h-fit p-6">
            <p className="eyebrow">Справка</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Как работать с сервисом</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Этот раздел закрывает самые частые вопросы по загрузке файлов, обработке и просмотру истории.
            </p>
            <button className="btn-primary mt-6 w-full" onClick={() => navigate("/explore")}>
              Начать исследование
            </button>
          </aside>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="panel overflow-hidden">
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-slate-950">{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-600">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EcgFaqPage;
