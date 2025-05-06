import React, { useState } from "react";
import { Edit, Save, X } from "lucide-react"; // Ícones da Lucide

function UserBio({
  bio = "Esta pessoa ainda não adicionou uma biografia.",
  onBioUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
  const [newBio, setNewBio] = useState(bio); // Armazena o texto temporário durante a edição
  const maxLength = 150; // Limite de caracteres para a biografia

  const handleSave = () => {
    onBioUpdate(newBio); // Atualiza a biografia no componente pai
    setIsEditing(false); // Sai do modo de edição
  };

  const handleCancel = () => {
    setNewBio(bio); // Restaura o texto original
    setIsEditing(false); // Sai do modo de edição
  };

  return (
    <section className="mt-4 text-center">
      {isEditing ? (
        // Modo de edição
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-md">
            <textarea
              value={newBio}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) {
                  setNewBio(e.target.value);
                }
              }}
              className="w-full p-2 rounded-lg bg-white/10 dark:bg-gray-700/50 text-white dark:text-gray-100 border border-white/20 focus:outline-none focus:border-indigo-500 resize-none" // Impede redimensionamento
              rows="3"
              placeholder="Digite sua biografia..."
              maxLength={maxLength} // Limite de caracteres
            />
            <span className="absolute bottom-2 right-2 text-xs text-gray-300 dark:text-gray-400">
              {newBio.length}/{maxLength} {/* Contador de caracteres */}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              <Save size={18} /> {/* Ícone de salvar */}
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <X size={18} /> {/* Ícone de cancelar */}
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Modo de visualização
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-gray-200 dark:text-gray-300 text-sm sm:text-base">
              {bio}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-300 hover:text-indigo-200 transition"
              aria-label="Editar biografia"
            >
              <Edit size={16} /> {/* Ícone de edição */}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserBio;
