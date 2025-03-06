import { XCircle } from "lucide-react";

export default function QuizListConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center max-w-md w-full border border-gray-200 dark:border-gray-700">
        <h2 id="confirmation-modal-title" className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Desinscrever da Palestra
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Você tem certeza de que deseja desinscrever da palestra?
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            aria-label="Confirmar desinscrição"
          >
            <XCircle size={18} aria-hidden="true" />
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            aria-label="Cancelar desinscrição"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}