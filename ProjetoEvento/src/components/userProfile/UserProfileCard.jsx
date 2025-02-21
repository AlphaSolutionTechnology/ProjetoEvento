import { useState } from "react";
import { Camera, Medal, Users, X } from "lucide-react";
import { motion } from "framer-motion";

function UserProfileCard({
  userName = "Usuário",
  avatar,
  badges = [],
  connections = [],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    avatar || "/avatars/default.png"
  );

  const avatarOptions = [
    "/avatars/male1.png",
    "/avatars/male2.png",
    "/avatars/female1.png",
    "/avatars/female2.png",
  ];

  const handleImageSelect = (image) => {
    setSelectedImage(image); // atualiza imagem de perfil
    setTimeout(() => setIsModalOpen(false), 150); // Delay para mudança de imagem de perfil
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg max-w-sm mx-auto relative">
      {/* Avatar do Usuário */}
      <div className="relative w-24 h-24 mx-auto mb-4 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
        <img
          src={selectedImage}
          alt={`Avatar de ${userName}`}
          className="w-24 h-24 rounded-full border-4 border-white object-cover sm:w-32 sm:h-32 lg:w-40 lg:h-40"
        />
        <button
          className="absolute bottom-0 right-0 bg-white text-indigo-500 p-1 rounded-full shadow-lg hover:bg-gray-200 transition"
          onClick={() => setIsModalOpen(true)}
          aria-label="Alterar foto de perfil"
        >
          <Camera size={16} />
        </button>
      </div>

      {/* Nome do Usuário */}
      <h2 className="text-xl font-bold text-center sm:text-2xl lg:text-3xl">
        {userName}
      </h2>

      {/* Seção de Conquistas */}
      <section className="mt-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Medal size={18} /> Minhas Conquistas
        </h3>
        <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <span
                key={index}
                className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm shadow"
              >
                {badge}
              </span>
            ))
          ) : (
            <p className="text-gray-200 text-sm">Nenhuma conquista ainda.</p>
          )}
        </div>
      </section>

      {/* Seção de Conexões */}
      <section className="mt-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Users size={18} /> Minhas Conexões
        </h3>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
          {connections.length > 0 ? (
            connections.map((conn, index) => (
              <img
                key={index}
                src={conn.avatar}
                alt={`Conexão ${index + 1}`}
                className="w-10 h-10 rounded-full cursor-pointer border-2 hover:border-white transition sm:w-12 sm:h-12 lg:w-16 lg:h-16"
              />
            ))
          ) : (
            <p className="text-gray-200 text-sm">Nenhuma conexão ainda.</p>
          )}
        </div>
      </section>

      {/* Modal de Seleção de Avatar */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-xs w-full sm:max-w-sm lg:max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
              aria-label="Fechar modal"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold mb-4">Escolha seu avatar</h3>
            <div className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700 flex flex-wrap justify-center items-center p-3 shadow-inner border-4 border-gray-300 dark:border-gray-500">
              {avatarOptions.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="Opção de Avatar"
                  className="w-16 h-16 rounded-full cursor-pointer border-2 border-transparent hover:border-indigo-500 transition"
                  onClick={() => handleImageSelect(image)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UserProfileCard;
