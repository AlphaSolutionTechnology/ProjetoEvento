import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import UserConnectionItem from "./UserConnectionItem";

const ConnectionsSection = () => {
  const [connections, setConnections] = useState([]); // Estado para armazenar as conexões

  // Busca as conexões aceitas ao montar o componente
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_NETWORK_API_LINK}/api/connection/getacceptedconnections`, {
          method: 'GET',
          credentials: 'include', // Inclui cookies automaticamente, como o eventToken
          headers: {
            'Content-Type': 'application/json', // Indica que esperamos JSON como resposta
          },
        });

        if (response.ok) {
          const data = await response.json();
          //("Dados recebidos:", data);
          setConnections(data || []); //  usa data diretamento
        } else {
          console.error("Erro ao buscar conexões:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error.message);
        setConnections([]);
      }
    };

    fetchConnections();
  }, []);

  return (
    <section className="mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Users size={20} /> Minhas Conexões
      </h3>
      <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
        {connections.length > 0 ? (
          connections.map((conn, index) => (
            <UserConnectionItem key={index} user={conn} />
          ))
        ) : (
          <p className="text-gray-200 dark:text-gray-300 text-sm">
            Nenhuma conexão ativa no momento.
          </p>
        )}
      </div>
    </section>
  );
};

export default ConnectionsSection;
