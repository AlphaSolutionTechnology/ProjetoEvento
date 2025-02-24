import React, { useState } from 'react';

const UserConnectionItem = ({ user, isActive, onClick, className }) => {
  // Recupera os dados do usuário do localStorage de forma segura
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const { avatar: userAvatar, name: userNameInitial, bio: userBio } = userData;

  // Estado para controlar a exibição do card com detalhes
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  // Função para alternar a visibilidade do card de detalhes
  const handleAvatarClick = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-full flex items-center justify-center ${className} ${isActive ? 'border-2 border-blue-500' : ''}`}
    >
      <section className="relative w-24 h-24 mx-auto mb-6 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
        {/* Imagem do Avatar ou Inicial */}
        {userAvatar ? (
          <img
            src={userAvatar}
            alt="Avatar"
            className="rounded-full w-full h-full object-cover cursor-pointer"
            onClick={handleAvatarClick}
          />
        ) : (
          <span
            className="text-4xl flex items-center justify-center h-full w-full border-4 rounded-full bg-gray-300 dark:bg-gray-600 text-white cursor-pointer"
            onClick={handleAvatarClick}
          >
            {userNameInitial?.[0] || "U"}
          </span>
        )}

        {/* Card de Detalhes do Usuário (Nome e Bio) */}
        {isDetailsVisible && (
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">{userData.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{userBio || "Sem bio disponível."}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserConnectionItem;
