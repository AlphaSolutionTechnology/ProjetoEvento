import { useState } from "react";
import { Camera, Medal, Users } from "lucide-react";
import ChangeProfilePictureModal from "./ChangeProfilePictureModal";
import Badge from "./Badge";
import UserConnectionItem from "./UserConnectionItem";

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
  const [activeConnection, setActiveConnection] = useState(null);

  const handleConnectionClick = (index) => {
    setActiveConnection((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-3xl p-8 text-white dark:text-gray-100 shadow-2xl max-w-lg mx-auto relative">
      {/* Avatar do Usuário */}
      <section className="relative w-24 h-24 mx-auto mb-6 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
        <img
          src={selectedImage}
          className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-200 object-cover sm:w-32 sm:h-32 lg:w-40 lg:h-40"
        />
        <button
          className="absolute bottom-0 right-0 bg-white dark:bg-gray-200 text-indigo-500 dark:text-indigo-700 p-2 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-300 transition"
          onClick={() => setIsModalOpen(true)}
          aria-label="Alterar foto de perfil"
        >
          <Camera size={18} />
        </button>
      </section>

      {/* Nome do Usuário */}
      <h2 className="text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
        {userName
          .split(" ") // Divide o nome completo em partes
          .slice(0, 2) // Pega apenas as duas primeiras partes (nome e sobrenome)
          .join(" ")}{" "}
      </h2>

      {/* Seção de Conquistas */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Medal size={20} /> Minhas Conquistas
        </h3>
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <Badge
                key={index}
                title={badge}
                icon={<Medal size={18} />}
                className="bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/70"
              />
            ))
          ) : (
            <p className="text-gray-200 dark:text-gray-300 text-sm">
              Nenhuma conquista ainda.
            </p>
          )}
        </div>
      </section>

      {/* Seção de Conexões */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users size={20} /> Minhas Conexões
        </h3>
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
          {connections.length > 0 ? (
            connections.map((conn, index) => (
              <UserConnectionItem
                key={index}
                user={conn}
                isActive={activeConnection === index}
                onClick={() => handleConnectionClick(index)}
                className="bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/70"
              />
            ))
          ) : (
            <p className="text-gray-200 dark:text-gray-300 text-sm">
              Nenhuma conexão ainda.
            </p>
          )}
        </div>
      </section>

      {/* Modal de Seleção de Avatar */}
      {isModalOpen && (
        <ChangeProfilePictureModal
          currentPicture={selectedImage}
          onChangePicture={(newPicture) => {
            setSelectedImage(newPicture); // Atualiza a imagem no estado
            setIsModalOpen(false); // Fecha o modal
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default UserProfileCard;
