import { getUserProfileCard } from "../api/user/userProfileCardService";
import { useEffect, useState } from "react";

const useUserProfileCard = () => {
  const [userProfileCard, setUserProfileCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfileCard = async () => {
      try {
        const userProfileCardData = await getUserProfileCard();
        console.log("📦 Dados recebidos do service:", userProfileCardData); 
        setUserProfileCard(userProfileCardData);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileCard();
  }, []);

  return { userProfileCard, loading, error };
};

export default useUserProfileCard;
