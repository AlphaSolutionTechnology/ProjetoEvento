import { motion } from "framer-motion";

function UserConnectionItem({ user, isActive, onClick }) {
  return (
    <div className="relative">
      {/* Imagem da conexão */}
      <img
        src={user.picture}
        alt={user.name}
        className="w-12 h-12 rounded-full cursor-pointer hover:scale-105 transition sm:w-16 sm:h-16 lg:w-20 lg:h-20"
        onClick={onClick}
      />

      {/* Exibição do card de detalhes */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-14 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50 w-60 sm:w-72 lg:w-80"
        >
          {/* Nome do usuário */}
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base sm:text-lg">
            {user.name}
          </h3>

          {/* Bio do usuário */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {user.bio || "Esta pessoa ainda não adicionou uma biografia."}
          </p>

          {/* Botão para fechar o card */}
          <button
            className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            onClick={() => onClick()} // Fecha o card
          >
            Fechar
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default UserConnectionItem;