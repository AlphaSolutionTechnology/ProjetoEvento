import { motion } from "framer-motion";
import { Camera, X } from "lucide-react";

// Lista de avatares pré-definidos
const avatars = [
  "/images/avatar1.png",
  "/images/avatar2.png",
  "/images/avatar3.png",
  "/images/avatar4.png",
];

function ChangeProfilePictureModal({ currentPicture, onChangePicture, onClose }) {
  const handleAvatarClick = (avatar) => {
    onChangePicture(avatar); // Atualiza a imagem com a escolhida
    onClose(); // Fecha o modal
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangePicture(reader.result); // Atualiza a imagem com o upload
        onClose(); // Fecha o modal
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-3xl p-6 text-white dark:text-gray-100 shadow-2xl max-w-md w-full mx-4"
      >
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Escolha seu avatar</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-700/50 transition"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Grid de Avatares Pré-definidos */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg overflow-hidden hover:opacity-80 transition"
              onClick={() => handleAvatarClick(avatar)}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Upload de Imagem Personalizada */}
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="flex items-center gap-2 bg-white dark:bg-gray-200 text-indigo-500 dark:text-indigo-700 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-300 transition"
          >
            <Camera size={18} />
            <span>Escolher minha imagem</span>
          </label>
        </div>
      </motion.div>
    </div>
  );
}

export default ChangeProfilePictureModal;