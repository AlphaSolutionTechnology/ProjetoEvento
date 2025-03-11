import React, { useState } from 'react';

const LectureForm = ({ onSubmit }) => {
  const [lecture, setLecture] = useState({
    title: '',
    speaker: '',
    time: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecture({ ...lecture, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lecture);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">Título da Palestra</label>
        <input
          type="text"
          name="title"
          value={lecture.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">Palestrante</label>
        <input
          type="text"
          name="speaker"
          value={lecture.speaker}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">Horário</label>
        <input
          type="time"
          name="time"
          value={lecture.time}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">Descrição</label>
        <textarea
          name="description"
          value={lecture.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 rounded-lg shadow-sm transition"
      >
        Adicionar Palestra
      </button>
    </form>
  );
};

export default LectureForm;
