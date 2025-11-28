import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EcgFaqPage = () => {
  const navigate = useNavigate();

  // Состояние для раскрытия ответа
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Какие форматы файлов ЭКГ можно загружать?",
      answer: "Вы можете загружать файлы форматов PNG, JPG, JPEG, PDF, .ecg, .txt и .dat."
    },
    {
      question: "Как долго обрабатывается файл ЭКГ?",
      answer: "В среднем обработка занимает от нескольких секунд до минуты, в зависимости от размера файла."
    },
    {
      question: "Могу ли я повторно загрузить файл после анализа?",
      answer: "Да, вы можете загрузить новый файл после завершения анализа предыдущего. Для этого просто обновите страницу или используйте кнопку «Назад»."
    },
    {
      question: "Куда сохраняются мои данные ЭКГ?",
      answer: "Данные сохраняются на защищенном сервере и используются только для анализа. Личные данные конфиденциальны."
    },
    
    {
      question: "Где хранятся загруженные ЭКГ?",
      answer: "Все загруженные ЭКГ автоматически сохраняются на странице с историей. Они доступны для повторного просмотра и анализа."
    },
    {
      question: "Как долго хранятся данные пациентов?",
      answer: "История ЭКГ хранится бессрочно, пока ваша учетная запись активна. Все данные защищены в соответствии с требованиями медицинской конфиденциальности."
    },
    {
      question: "Что делать, если файл не загружается?",
      answer: "Убедитесь, что файл поддерживаемого формата и не превышает допустимый размер. В случае ошибки попробуйте другой файл или обратитесь в поддержку."
    },
    {
      question: "Есть ли возможность отправить сообщение разработчикам?",
      answer: "Да, на сайте есть страница с формой обратной связи, где вы можете описать проблему или задать вопрос. Мы ответим в ближайшее время."
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

      <div className="flex flex-col items-center mt-20 px-4 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">FAQ по выгрузке ЭКГ</h1>
        <p className="text-gray-700 mb-8">
          Здесь вы найдете ответы на самые часто задаваемые вопросы по загрузке и анализу файлов ЭКГ.
        </p>

        {/* Список вопросов */}
        <div className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <button
                className="w-full text-left flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="ml-2 text-gray-500">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcgFaqPage;
