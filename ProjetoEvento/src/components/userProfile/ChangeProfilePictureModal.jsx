import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const avatars = [
  "/images/avatar1.png",
  "/images/avatar2.png",
  "/images/avatar3.png",
  "/images/avatar4.png",
];

function ChangeProfilePicture({ currentPicture, onChangePicture }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative">
      <div
        className="relative w-24 h-24 rounded-full border  cursor-pointer hover:ring-2 ring-blue-400"
        onClick={() => setShowModal(true)}
      >
        <img src={currentPicture} alt="Perfil" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 p-1 rounded-full">
          <Camera size={16} className="text-white" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Escolha sua foto de perfil
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index}`}
                  className="w-20 h-20 rounded-full cursor-pointer hover:opacity-80"
                  onClick={() => {
                    onChangePicture(avatar);
                    setShowModal(false);
                  }}
                />
              ))}
            </div>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ChangeProfilePicture;
