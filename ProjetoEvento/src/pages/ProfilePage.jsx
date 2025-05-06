import useAuth from "../hooks/useAuth";
import UserProfileCard from "../components/userProfileCard/UserProfileCard";
import Loading from "../components/loading/loading";

function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <section className="p-6">
        {/* Passe as conexões para o UserProfileCard */}
        <UserProfileCard userName={user?.name || "Usuário"} />
      </section>
    </main>
  );
}

export default ProfilePage;
