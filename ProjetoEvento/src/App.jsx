import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import Home from './pages/Home';
import Questoes from './pages/Questoes';
import AdmQuiz from './pages/admQuiz';
import LoginPage from './pages/LoginPage';
import QuizzesPage from './pages/QuizzesPage';
import ConnectPage from './pages/ConnectPage';
import RankingView from './pages/RankingView';
import PalestrasList from './pages/PalestrasList';
import RouteWrapper from './components/RouteWrapper';
import Header from './components/headerGlobal/Header';
import ProtectedRouteLogin from './components/ProtectedRouteLogin';

function App() {
  const location = useLocation();

  return (
    <WebSocketProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        {/* Renderiza o Header em todas as páginas, menos na tela de Login */}
        {location.pathname !== '/login' && <Header />}

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/home" element={<ProtectedRouteLogin><Home /></ProtectedRouteLogin>} />

          <Route path="/quizz/:idPalestra" element={<ProtectedRouteLogin><RouteWrapper component={Questoes} /></ProtectedRouteLogin>} />

          <Route path="/conectar" element={<ProtectedRouteLogin><ConnectPage /></ProtectedRouteLogin>} />

          <Route path="/palestras" element={<ProtectedRouteLogin role="Administrador"><PalestrasList /></ProtectedRouteLogin>} />

          <Route path="/admQuiz" element={<ProtectedRouteLogin role="Administrador"><AdmQuiz /></ProtectedRouteLogin>} />

          <Route path="/palestra/:idPalestra" element={<ProtectedRouteLogin role="Participante"><RouteWrapper component={QuizzesPage} /></ProtectedRouteLogin>} />

          <Route path="/ranking/:idPalestra" element={<ProtectedRouteLogin><RouteWrapper component={RankingView} /></ProtectedRouteLogin>} />
          
        </Routes>
      </div>
    </WebSocketProvider>
  );
}

export default App;
