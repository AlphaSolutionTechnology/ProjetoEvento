import React, { useState } from 'react';

const LectureForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    tema: '',
    speaker: '',
    description: '',
    idEvento: '',
    isAvailable: true,
    quizzLiberado: false,
    horaLiberacao: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatTimestamp = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const lecture = {
      title: formData.tema,
      speaker: formData.speaker,
      description: formData.description,
      unlockedQuizz: formData.quizzLiberado,
      time: formData.quizzLiberado ? null : formatTimestamp(formData.horaLiberacao),
    };
    onSubmit(lecture);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="tema" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tema da palestra
        </label>
        <input
          type="text"
          name="tema"
          id="tema"
          value={formData.tema}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="speaker" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Palestrante
        </label>
        <input
          type="text"
          name="speaker"
          id="speaker"
          value={formData.speaker}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descrição
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="quizzLiberado" className="flex items-center">
          <input
            type="checkbox"
            name="quizzLiberado"
            id="quizzLiberado"
            checked={formData.quizzLiberado}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Quiz Liberado</span>
        </label>
      </div>
      <div>
        <label htmlFor="horaLiberacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Horário para liberar o quiz (opcional)
        </label>
        <input
          type="datetime-local"
          name="horaLiberacao"
          id="horaLiberacao"
          value={formData.horaLiberacao}
          onChange={handleChange}
          disabled={formData.quizzLiberado}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Criar Palestra
      </button>
    </form>
  );
};

export default LectureForm;