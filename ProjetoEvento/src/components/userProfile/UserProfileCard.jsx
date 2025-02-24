import { useState } from "react";
import { Camera, Medal, Users } from "lucide-react";
import ChangeProfilePictureModal from "./ChangeProfilePictureModal";
import Badge from "./Badge";
import UserConnectionItem from "./UserConnectionItem";
import UserBio from "./UserBio";

function UserProfileCard({
  userName = "Usuário",
  avatar = "/avatars/default.png",
  initialBio = "Esta pessoa ainda não adicionou uma biografia.",
  badges = [],
  connections = [],
}) {
  // Recupera os dados do usuário do localStorage de forma segura
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const { avatar: userAvatar, name: userNameInitial } = userData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [activeConnection, setActiveConnection] = useState(null);
  const [bio, setBio] = useState(initialBio);

  const handleConnectionClick = (index) => {
    setActiveConnection((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleBioUpdate = (newBio) => {
    setBio(newBio);
    // Aqui você pode adicionar uma chamada à API para salvar a biografia no banco de dados
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-3xl p-8 text-white dark:text-gray-100 shadow-2xl max-w-lg mx-auto relative">
      {/* Avatar do Usuário */}
      <section className="relative w-24 h-24 mx-auto mb-6 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt="Avatar"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl flex items-center justify-center h-full w-full border-4 rounded-full">
            {userNameInitial?.[0] || "U"}
          </span>
        )}
        <button
          className="absolute bottom-0 right-0 bg-white dark:bg-gray-200 text-indigo-500 dark:text-indigo-700 p-2 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-300 transition"
          onClick={() => setIsModalOpen(true)}
          aria-label="Alterar foto de perfil"
        >
          <Camera size={18} />
        </button>
      </section>

      {/* Nome do Usuário (apenas nome e sobrenome) */}
      <h2 className="text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
        {userName
          .split(" ")
          .slice(0, 2)
          .join(" ")}
      </h2>

      {/* Biografia do Usuário */}
      <UserBio bio={bio} onBioUpdate={handleBioUpdate} />

      {/* Seção de Conquistas */}
      <AchievementsSection badges={badges} />

      {/* Seção de Conexões */}
      <ConnectionsSection
        connections={connections}
        activeConnection={activeConnection}
        onConnectionClick={handleConnectionClick}
      />

      {/* Modal de Seleção de Avatar */}
      {isModalOpen && (
        <ChangeProfilePictureModal
          currentPicture={selectedImage}
          onChangePicture={(newPicture) => {
            setSelectedImage(newPicture);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

// Componente para a seção de Conquistas
const AchievementsSection = ({ badges }) => (
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
);

// Componente para a seção de Conexões
const ConnectionsSection = ({ connections, activeConnection, onConnectionClick }) => (
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
            onClick={() => onConnectionClick(index)}
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
);

export default UserProfileCard;