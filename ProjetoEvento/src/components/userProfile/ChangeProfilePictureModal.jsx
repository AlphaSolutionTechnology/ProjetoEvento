import { motion } from "framer-motion";
import { useState, useEffect } from "react"; 
import { Camera, X } from "lucide-react";

// Estilos de avatares disponíveis no DiceBear
const avatarStyles = [
  { id: 1, style: "bottts", label: "Bot Avatar" },
  { id: 2, style: "identicon", label: "Identicon Avatar" },
  { id: 3, style: "avataaars", label: "Avataaars" },
  { id: 4, style: "micah", label: "Micah Avatar" },
];

function ChangeProfilePictureModal({
  currentPicture,
  onChangePicture,
  onClose,
}) {
  // Estado para armazenar as sementes de cada avatar
  const [avatarSeeds, setAvatarSeeds] = useState({});

  // Função para gerar uma nova semente aleatória
  const generateRandomSeed = () => {
    return Math.random().toString(36).substring(7);
  };

  // Função para lidar com a escolha do avatar
  const handleAvatarClick = (style) => {
    const seed = avatarSeeds[style]; // Recupera a semente do avatar clicado
    const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
    onChangePicture(avatarUrl); // Atualiza a imagem com a escolhida
    onClose(); 
  };

  // Gera sementes para cada estilo de avatar ao abrir o modal
  useEffect(() => {
    const seeds = {};
    avatarStyles.forEach((avatar) => {
      seeds[avatar.style] = generateRandomSeed();
    });
    setAvatarSeeds(seeds);
  }, []);

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

        {/* Grid de Avatares Dinâmicos */}
        <section className="grid grid-cols-2 gap-4 mb-6">
          {avatarStyles.map((avatar) => (
            <div
              key={avatar.id}
              className="cursor-pointer rounded-full w-16 h-16 border-2 border-white overflow-hidden transition-transform transform hover:scale-105"
              onClick={() => handleAvatarClick(avatar.style)}
            >
              <img
                src={`https://api.dicebear.com/7.x/${avatar.style}/svg?seed=${avatarSeeds[avatar.style]}`}
                alt={avatar.label}
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
