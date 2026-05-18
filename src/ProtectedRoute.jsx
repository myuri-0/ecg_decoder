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
    return (
      <div className="app-shell flex min-h-screen items-center justify-center px-4">
        <div className="panel px-6 py-5 text-center">
          <p className="text-sm font-medium text-slate-700">Проверяем доступ...</p>
        </div>
      </div>
    );
  }

  return authorized ? children : <Navigate to="/" />;
}
