import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/check-auth", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setAuthorized(true);
        else setAuthorized(false);
      })
      .catch(() => setAuthorized(false));
  }, []);

  if (authorized === null) {
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  return authorized ? children : <Navigate to="/" />;
}