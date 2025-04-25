import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LectureForm from '../components/dashboard/LectureForm';

const CreateLecture = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreateLecture = async (lecture) => {
    try {
      setError(null);
      setSuccess(null);

      const response = await fetch(`${import.meta.env.VITE_LOCAL_API_LINK}/api/palestra/criar`, {
        method: 'POST',
        credentials: 'include', // Sends eventToken cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lecture),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create lecture');
      }

      const createdLecture = await response.json();
      setSuccess(`Lecture "${createdLecture.tema}" created successfully!`);
      setTimeout(() => navigate(-1), 2000); // Navigate back after 2 seconds
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    }
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
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}
        <LectureForm onSubmit={handleCreateLecture} />
      </div>
    </div>
  );
};

export default CreateLecture;