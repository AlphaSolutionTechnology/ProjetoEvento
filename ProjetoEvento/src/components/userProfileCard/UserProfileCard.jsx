import { useState } from "react";
import { Camera } from "lucide-react";
import ChangeProfilePictureModal from "./ChangeProfilePictureModal";
import UserBio from "./UserBio";
import AchievementsSection from "./AchievementsSection";
import ConnectionsSection from "./ConnectionsSection";
import useUserProfileCard from "../../hooks/useUserProfileCard";

function UserProfileCard() {
  const { userProfileCard, loading, error } = useUserProfileCard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badges, setBadges] = useState([]);


  // Enquanto carrega
  if (loading) return <div className="text-center text-white">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">Erro: {error}</div>;
  if (!userProfileCard) return <div className="text-center text-white">Perfil não encontrado.</div>;

  // Desestrutura os dados recebidos da API
  const { name, avatarUrl } = userProfileCard;

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-3xl p-8 text-white dark:text-gray-100 shadow-2xl max-w-lg mx-auto relative">
      {/* Avatar do Usuário */}
      <section className="relative w-24 h-24 mx-auto mb-6 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl flex items-center justify-center h-full w-full border-4 rounded-full">
            {name?.[0] || "U"}
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

      {/* Nome do Usuário (primeiro e segundo nome) */}
      <h2 className="text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
        {name?.split(" ").slice(0, 2).join(" ")}
      </h2>

      {/* Biografia do Usuário */}
      <UserBio />

      {/* Seção de Conquistas */}
      <AchievementsSection badges={badges} />

      {/* Seção de Conexões */}
      <ConnectionsSection />

      {/* Modal de Seleção de Avatar */}
      {isModalOpen && <ChangeProfilePictureModal />}
    </div>
  );
}

export default UserProfileCard;
