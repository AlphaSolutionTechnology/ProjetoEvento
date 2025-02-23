import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import UserProfileCard from "../components/userProfile/UserProfileCard";
import Loading from "../components/loading/loading";

function ProfilePage({ connections = [], badges = [] }) {
  const { user, isLoading } = useAuth();
  const [profilePicture, setProfilePicture] = useState(user?.picture || "");

  useEffect(() => {
    if (user?.picture) {
      setProfilePicture(user.picture);
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <section className="p-6">
        {/* Utilize o UserProfileCard para encapsular a lógica do perfil */}
        <UserProfileCard
          userName={user?.name}
          avatar={profilePicture}
          badges={badges}
          connections={connections}
          onChangePicture={setProfilePicture}
        />
      </section>
    </main>
  );
}

export default ProfilePage;