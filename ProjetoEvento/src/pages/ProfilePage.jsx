import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ChangeProfilePicture from "../components/userProfile/ChangeProfilePictureModal";
import Badge from "../components/userProfile/Badge";
import UserConnectionItem from "../components/userProfile/UserConnectionItem"; // Importe o componente
import Loading from "../components/loading/loading";
import { Trophy, Star, Users } from "lucide-react";

function ProfilePage({ connections = [], badges = [] }) {
  const { user, isLoading } = useAuth();
  const [profilePicture, setProfilePicture] = useState(user?.picture || "");
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    if (user?.picture) {
      setProfilePicture(user.picture);
    }
  }, [user]);

  // Coleta de Nome de Usuario
  const retrieveName = (fullname) => {
    if (!fullname) return "";
    const splittedName = fullname.split(" ");
    return splittedName.length > 1
      ? `${splittedName[0]} ${splittedName[1]}`
      : splittedName[0];
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen rounded-lg shadow-lg">
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <header className="flex flex-col items-center">
          <ChangeProfilePicture
            currentPicture={profilePicture}
            onChangePicture={setProfilePicture}
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            {retrieveName(user?.name)}
          </h1>
        </header>

        <section className="mt-6">
          <header className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Minhas Conquistas
          </header>
          <div className="flex gap-3 mt-3 flex-wrap justify-center sm:justify-start">
            {badges?.map((badge) => (
              <Badge
                key={badge.title}
                title={badge.title}
                icon={<Star size={18} />}
              />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <header className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Users className="text-blue-500" /> Minhas Conexões
          </header>
          <div className="flex gap-4 mt-3 flex-wrap justify-center sm:justify-start">
            {connections?.map((connection) => (
              <UserConnectionItem
                key={connection.id}
                user={connection}
                isActive={activeUser?.id === connection.id}
                onClick={() =>
                  setActiveUser(
                    connection.id === activeUser?.id ? null : connection
                  )
                }
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default ProfilePage;
