import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
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
  );
};

export default MainPage;