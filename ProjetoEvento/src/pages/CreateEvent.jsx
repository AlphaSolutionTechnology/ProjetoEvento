import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EventForm from '../components/dashboard/EventForm';

const CreateEvent = () => {
  const navigate = useNavigate();

  const handleCreateEvent = (event) => {
    console.log('Evento criado:', event);
    // Lógica para enviar o evento para o backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-lg transition-colors duration-300">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition mb-4"
      >
        <ArrowLeft size={20} /> Voltar
      </button>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Criar Novo Evento</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-inner border dark:border-gray-700 transition-colors duration-300">
        <EventForm onSubmit={handleCreateEvent} />
      </div>
    </div>
  );
};

export default CreateEvent;