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

  return (
    <div className="h-screen bg-gray-100 px-4 relative">

      {/* Кнопка выхода */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
      >
        Выйти
      </button>

      {/* Центральные кнопки */}
      <div className="h-full flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          
          <Link
            to="/explore"
            className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold py-10 rounded-xl shadow-md text-center transition"
          >
            Исследовать ЭКГ
          </Link>

          <Link
            to="/history"
            className="bg-green-500 hover:bg-green-600 text-white text-xl font-semibold py-10 rounded-xl shadow-md text-center transition"
          >
            История
          </Link>

          <Link
            to="/profile"
            className="bg-purple-500 hover:bg-purple-600 text-white text-xl font-semibold py-10 rounded-xl shadow-md text-center transition"
          >
            Личный кабинет
          </Link>

          <Link
            to="/faq"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold py-10 rounded-xl shadow-md text-center transition"
          >
            Вопросы и ответы
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MainPage;
