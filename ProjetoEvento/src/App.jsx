import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { WebSocketProvider } from "./context/WebSocketContext";
import { motion } from "framer-motion";
import Home from "./pages/home";
import AdmQuiz from "./pages/AdmQuiz";
import Questoes from "./pages/Questoes";
import LoginPage from "./pages/LoginPage";
import QuizzesPage from "./pages/QuizzesPage";
import ConnectPage from "./pages/ConnectPage";
import RankingView from "./pages/RankingView";
import ProfilePage from "./pages/ProfilePage";
import PalestrasList from "./pages/palestrasList";
import RouteWrapper from "./components/RouteWrapper";
import Header from "./components/headerGlobal/Header";
import ProtectedRouteLogin from "./components/ProtectedRouteLogin";
import ProtectedRouteQuizz from "./components/ProtectedRouteQuizz";

function App() {
  const location = useLocation();

  return (
    <WebSocketProvider>
      <main className="min-h-screen text-white dark:bg-[#0d1117] relative">
        {/* Círculos decorativos com animação de escala */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 left-10 w-40 h-40 bg-blue-500 opacity-30 blur-3xl rounded-full z-0 pointer-events-none"
        ></motion.div>

        {/* Outro círculo */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 right-20 w-52 h-52 bg-green-800 opacity-30 blur-3xl rounded-full z-0 pointer-events-none"
        ></motion.div>

        {/* Um terceiro círculo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 left-32 w-36 h-36 bg-pink-500 opacity-30 blur-3xl rounded-full z-0 pointer-events-none"
        ></motion.div>

        {/* Renderiza o Header em todas as páginas, menos na tela de Login */}
        {location.pathname !== "/login" && <Header />}

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

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
                  <ProtectedRouteQuizz>
                  <RouteWrapper component={Questoes} />
                  </ProtectedRouteQuizz>
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
              <ProtectedRouteLogin role="Administrador">
                <PalestrasList />
              </ProtectedRouteLogin>
            }
          />

          <Route
            path="/admQuiz"
            element={
              <ProtectedRouteLogin role="Administrador">
                <AdmQuiz />
              </ProtectedRouteLogin>
            }
          />

          <Route
            path="/palestra/:idPalestra"
            element={
              <ProtectedRouteLogin role="Participante">
                <RouteWrapper component={QuizzesPage} />
              </ProtectedRouteLogin>
            }
          />

          <Route
            path="/ranking"
            element={
              <ProtectedRouteLogin>
                <RankingView />
              </ProtectedRouteLogin>
            }
          />

          <Route
            path="/perfil"
            element={
              <ProtectedRouteLogin>
                <ProfilePage />
              </ProtectedRouteLogin>
            }
          />
        </Routes>
      </main>
    </WebSocketProvider>
  );
}

export default App;
