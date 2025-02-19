import React from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
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
import ProtectedRouteLogin from "./components/ProtectedRouteLogin";
import Ranking_View from "./pages/Ranking_View";
import { useNavigate } from "react-router-dom";
import QuizzesPage from "./pages/QuizzesPage";
import ProtectedRouteInscricao from "./components/ProtectedRouteInscricao";
import RouteWrapper from "./components/RouteWrapper";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/home");
  };
  return (
    <WebSocketProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {location.pathname !== "/login" && (
          <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
            <h1
              onClick={handleNavigateHome}
              className="text-2xl font-bold cursor-pointer"
            >
              Home
            </h1>
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
              <ProtectedRouteLogin>
                <Home />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/quizz/:idPalestra"
            element={
              <ProtectedRouteLogin>
                <RouteWrapper component={Questoes} />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/conectar"
            element={
              <ProtectedRouteLogin>
                <ConnectPage />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/palestras"
            element={
              <ProtectedRouteLogin role={"Administrador"}>
                <PalestrasList />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/admQuizz"
            element={
              <ProtectedRouteLogin role={"Administrador"}>
                <AdmQuizz />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/palestra/:idPalestra"
            element={
              <ProtectedRouteLogin role={"Participante"}>
                <RouteWrapper component={QuizzesPage} />
              </ProtectedRouteLogin>
            }
          />

          <Route
            path="/ranking"
            element={
              <ProtectedRouteLogin>
                  <Ranking_View/>
              </ProtectedRouteLogin>
            }
          />
        </Routes>
      </div>
    </WebSocketProvider>
  );
}

export default App;
