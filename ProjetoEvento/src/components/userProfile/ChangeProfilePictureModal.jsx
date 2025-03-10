import { motion } from "framer-motion";
import { Camera, X } from "lucide-react";

// Lista de avatares pré-definidos
const avatars = [
  "/images/avatar1.png",
  "/images/avatar2.png",
  "/images/avatar3.png",
  "/images/avatar4.png",
];

function ChangeProfilePictureModal({
  currentPicture,
  onChangePicture,
  onClose,
}) {
  const handleAvatarClick = (avatar) => {
    onChangePicture(avatar); // Atualiza a imagem com a escolhida
    onClose(); // Fechar o modal
  };

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-3xl p-6 text-white dark:text-gray-100 shadow-2xl max-w-md w-full mx-4"
      >
        {/* Cabeçalho do Modal */}
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Escolha seu avatar</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-700/50 transition"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* Grid de Avatares Pré-definidos */}
        {/* Grid de Avatares Pré-definidos */}
        <section className="grid grid-cols-2 gap-4 mb-6">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-full w-16 h-16 border-2 border-white overflow-hidden transition-transform transform hover:scale-105"
              onClick={() => handleAvatarClick(avatar)}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </section>
      </motion.div>
    </main>
  );
}

export default ChangeProfilePictureModal;
