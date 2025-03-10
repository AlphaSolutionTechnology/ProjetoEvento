import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Mic, ClipboardList } from "lucide-react"; // Ícones do Lucide
import DashboardCard from "../components/dashboard/DashboardCard.jsx";

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition mb-4"
      >
        <ArrowLeft size={20} /> Voltar
      </button>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
        Painel do Organizador
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Criar Evento"
          description="Crie um novo evento para os participantes."
          icon={<Calendar className="text-blue-600 dark:text-blue-400" />}
          link="/create-event"
        />
        <DashboardCard
          title="Criar Palestra"
          description="Adicione uma nova palestra a um evento existente."
          icon={<Mic className="text-green-600 dark:text-green-400" />}
          link="/create-lecture"
        />
        <DashboardCard
          title="Gerenciar Quizzes"
          description="Crie e gerencie quizzes para o seu evento."
          icon={<ClipboardList className="text-purple-600 dark:text-purple-400" />}
          link="/palestras"
        />
      </div>
    </div>
  );
};

export default OrganizerDashboard;
