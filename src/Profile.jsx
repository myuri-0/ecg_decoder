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
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative p-4">

      <button
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        onClick={() => navigate("/mainpage")}
      >
        Назад
      </button>

      <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">Профиль</h1>

        <div className="space-y-4">

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-lg">Фамилия:</span>
            <span className="text-lg">{profile.last_name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-lg">Имя:</span>
            <span className="text-lg">{profile.first_name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-lg">Отчество:</span>
            <span className="text-lg">{profile.middle_name || "—"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-lg">Email:</span>
            <span className="text-lg">{profile.email}</span>
          </div>

        </div>

        <button
          onClick={() => navigate("/change-password")}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg transition"
        >
          Изменить пароль
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;
