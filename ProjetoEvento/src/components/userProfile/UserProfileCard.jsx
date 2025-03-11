import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import ChangeProfilePictureModal from "./ChangeProfilePictureModal";
import UserBio from "./UserBio";
import AchievementsSection from "./AchievementsSection";
import ConnectionsSection from "./ConnectionsSection";

function UserProfileCard({
  userName = "Usuário",
  initialBio = "Esta pessoa ainda não adicionou uma biografia.",
  badges = [],
}) {
  // Recupera os dados do usuário do localStorage de forma segura
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const { avatar: userAvatar, name: userNameInitial } = userData;

  // Estados para controlar o modal de alteração de foto e a bio
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(userAvatar || generateDefaultAvatar(userName));
  const [bio, setBio] = useState(initialBio);

  // Efeito para garantir que o avatar padrão seja salvo no localStorage
  useEffect(() => {
    if (!userAvatar) {
      const defaultAvatar = generateDefaultAvatar(userName);
      const updatedUserData = { ...userData, avatar: defaultAvatar };
      localStorage.setItem("user_data", JSON.stringify(updatedUserData));
      setSelectedImage(defaultAvatar);
    }
  }, [userName, userAvatar, userData]);

  // Função para gerar um avatar padrão com base no nome do usuário
  function generateDefaultAvatar(name) {
    const seed = name || "user"; // Usa o nome do usuário como semente
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
  }

  // Função para atualizar a bio
  const handleBioUpdate = (newBio) => {
    setBio(newBio);
    // Aqui pode adicionar uma chamada à API para salvar a biografia no banco de dados
  };

  // Função para salvar o avatar no localStorage
const handleAvatarChange = (newAvatar) => {
  setSelectedImage(newAvatar); // Atualiza o estado local
  const updatedUserData = { ...userData, avatar: newAvatar }; // Atualiza os dados do usuário
  localStorage.setItem("user_data", JSON.stringify(updatedUserData)); // Salva no localStorage
};

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-3xl p-8 text-white dark:text-gray-100 shadow-2xl max-w-lg mx-auto relative">
      {/* Avatar do Usuário */}
      <section className="relative w-24 h-24 mx-auto mb-6 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
        {selectedImage ? (
          <img
            src={selectedImage}
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
        {userName.split(" ").slice(0, 2).join(" ")}
      </h2>

      {/* Biografia do Usuário */}
      <UserBio bio={bio} onBioUpdate={handleBioUpdate} />

      {/* Seção de Conquistas */}
      <AchievementsSection badges={badges} />

      {/* Seção de Conexões */}
      <ConnectionsSection />

      {/* Modal de Seleção de Avatar */}
      {isModalOpen && (
        <ChangeProfilePictureModal
          currentPicture={selectedImage}
          onChangePicture={(newPicture) => {
            handleAvatarChange(newPicture); // Salva o novo avatar
            setIsModalOpen(false); // Fecha o modal
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default UserProfileCard;