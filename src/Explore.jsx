import { useEffect, useState } from "react";
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

      <div className="flex flex-col items-center mt-20 px-4">

        {/* Заголовок */}
        <h1 className="text-3xl font-bold mb-4">Анализ ЭКГ</h1>

        <p className="text-gray-700 mb-8">
          Для проведения анализа выберите файл ЭКГ при помощи кнопки загрузить
        </p>

        {/* Форма */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-4"
        >
          <input
            type="text"
            placeholder="Фамилия"
            value={lastname}
            disabled={isSubmitted}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Имя"
            value={firstname}
            disabled={isSubmitted}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Отчество"
            value={middlename}
            disabled={isSubmitted}
            onChange={(e) => setMiddlename(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          {/* Дата */}
          <input
            type="date"
            value={exam_date}
            disabled={isSubmitted}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          {/* Файл */}
          <input
            type="file"
            accept=".mat"
            disabled={isSubmitted}
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />

          {!isSubmitted && (
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
            >
              Загрузить и анализировать
            </button>
          )}
        </form>

        {/* PNG изображение */}
        {imageSrc && (
          <div className="mt-10 bg-white shadow-md p-4 rounded-lg max-w-2xl">
            <img src={imageSrc} alt="ECG result" className="max-w-full" />
          </div>
        )}

        {/* Блок описания */}
        {isSubmitted && (
          <div className="mt-8 bg-white shadow-md p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4">Описание</h2>

            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              Ритм – синусовый{"\n"}
              ЧСС – 71 в сек{"\n"}
              ЭОС – Повернута влево{"\n"}
              Тестовое описание ЭКГ{"\n"}
              Диагноз – норма
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default EcgResearchPage;
