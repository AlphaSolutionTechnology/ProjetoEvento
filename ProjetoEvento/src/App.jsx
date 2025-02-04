import React, { useEffect } from "react";
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

function App() {
  const location = useLocation();

  return (
    <WebSocketProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {location.pathname !== "/login" && (
          <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
            <h1 className="text-xl font-bold">LOGO</h1>
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
              <ProtectedRoute>
                <PalestrasList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admQuizz"
            element={
              <ProtectedRoute>
                <AdmQuizz />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </WebSocketProvider>
  );
}

export default App;
