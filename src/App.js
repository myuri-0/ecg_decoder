import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import Profile from "./Profile";
import Explore from "./Explore";
import History from "./History";
import Faq from "./Faq";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/mainpage"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;