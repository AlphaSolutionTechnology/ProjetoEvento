import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LectureForm from '../components/dashboard/LectureForm';

const CreateLecture = () => {
  const navigate = useNavigate();

  const handleCreateLecture = (lecture) => {
    console.log('Palestra criada:', lecture);
    // Lógica para enviar a palestra para o backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-lg transition-colors duration-300">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition mb-4"
      >
        <ArrowLeft size={20} /> Voltar
      </button>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Adicionar Nova Palestra</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-inner border dark:border-gray-700 transition-colors duration-300">
        <LectureForm onSubmit={handleCreateLecture} />
      </div>
    </div>
  );
};

export default CreateLecture;
