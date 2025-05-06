import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import UserConnectionItem from "./UserConnectionItem";

// Função para gerar um avatar padrão com base no nome do usuário
const generateDefaultAvatar = (name) => {
  const seed = name || "user"; // Usa o nome do usuário como semente
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
};

const ConnectionsSection = () => {
  const [connections, setConnections] = useState([]); // Estado para armazenar as conexões
  const [showAll, setShowAll] = useState(false); // Estado para controlar a exibição de todas as conexões
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar carregamento

  // Busca as conexões aceitas ao montar o componente
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_LOCAL_API_LINK
          }/api/connection/getacceptedconnections`,
          {
            method: "GET",
            credentials: "include", // Inclui cookies automaticamente, como o eventToken
            headers: {
              "Content-Type": "application/json", // Indica que esperamos JSON como resposta
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Adiciona um avatar padrão para cada conexão, se não houver um avatar
          const connectionsWithAvatars = data.map((user) => ({
            ...user,
            avatar: user.avatar || generateDefaultAvatar(user.name),
          }));
          setConnections(connectionsWithAvatars || []); // Atualiza o estado com as conexões recebidas
        } else {
          console.error("Erro ao buscar conexões:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error.message);
        setConnections([]); // Define conexões como um array vazio em caso de erro
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };

    fetchConnections();
  }, []);

  // Limita a exibição a 4 conexões por padrão
  const visibleConnections = showAll ? connections : connections.slice(0, 4);

  return (
    <section className="mt-6">
      {/* Título com o total de conexões */}
      <header className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users size={20} /> Minhas Conexões ({connections.length})
        </h3>
        {connections.length > 4 && ( // Mostra o botão "Ver Todas" apenas se houver mais de 4 conexões
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {showAll ? "Ver Menos" : "Ver Todas"}
          </button>
        )}
      </header>

      {/* Lista de conexões */}
      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Carregando conexões...
        </p>
      ) : (
        <div className="overflow-x-auto">
          {" "}
          {/* Adiciona scroll horizontal */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 min-w-max">
            {" "}
            {/* Layout de grade */}
            {visibleConnections.length > 0 ? (
              visibleConnections.map((conn, index) => (
                <UserConnectionItem key={index} user={conn} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm col-span-full">
                Nenhuma conexão ativa no momento.
              </p>
            )}
          </div>
          {!showAll &&
            connections.length > 4 && ( // Mostra o texto "e mais X conexões" se houver mais de 4 conexões
              <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                e mais {connections.length - 4} conexões...
              </div>
            )}
        </div>
      )}
    </section>
  );
};

export default ConnectionsSection;
