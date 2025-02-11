import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Questoes from "./pages/Questoes";
import ThemeToggle from "./components/toggleDarkMode";
import ConnectPage from "./pages/ConnectPage";
import Home from "./pages/home";
import LoginPage from "./pages/LoginPage";
import PalestrasList from "./pages/palestrasList";
import AdmQuizz from "./pages/admQuizz";
import { WebSocketProvider } from "./context/WebSocketContext";
import NotificationButton from "./components/notification/NotificationButton";
import AccountMenu from "./components/AccountMenu";
import ProtectedRoute from "./components/ProtectedRoute";
import Ranking_View from "./pages/Ranking_View"
import { useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/home");
  }
  return (
    <WebSocketProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {location.pathname !== "/login" && (
          <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
            <h1 onClick={handleNavigateHome}
            className="text-xl font-bold cursor-pointer">Home</h1>
            <div className=" w-48 flex justify-around items-center">
              <NotificationButton />
              <ThemeToggle />
              <AccountMenu />
            </div>
          </header>
        )}
        
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizz"
            element={
              <ProtectedRoute>
                <Questoes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conectar"
            element={
              <ProtectedRoute>
                <ConnectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/palestras"
            element={
              <ProtectedRoute role={"Administrador"}>
                <PalestrasList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admQuizz"
            element={
              <ProtectedRoute role={"Administrador"}>
                <AdmQuizz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <Ranking_View />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </WebSocketProvider>
  );
}

export default App;
