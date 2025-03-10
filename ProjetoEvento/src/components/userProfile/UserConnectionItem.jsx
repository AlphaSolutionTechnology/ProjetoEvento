import React from "react";

const UserConnectionItem = ({ user }) => {
  const userName = user.name || "Usuário";
  const userInitial = userName[0].toUpperCase();

  return (
    <div className="flex flex-col items-center p-4">
      {/* Círculo com a inicial do nome */}
      <div className="w-14 h-14 flex items-center justify-center bg-blue-500 dark:bg-blue-600 rounded-full text-white text-xl font-bold shadow-md">
        {userInitial}
      </div>
      {/* Nome do usuário */}
      <p className="mt-3 text-base font-medium text-gray-900 dark:text-gray-100">
        {userName.split(" ").slice(0, 2).join(" ")}
      </p>
    </div>
  );
};

export default UserConnectionItem;
