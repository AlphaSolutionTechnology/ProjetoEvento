import { useEffect, useState } from 'react';
import { Users } from 'lucide-react'; // Exemplo de ícone
import UserConnectionItem from './UserConnectionItem'; // Componente para cada conexão

const ConnectionsSection = () => {
  const [connections, setConnections] = useState([]); // Estado para armazenar as conexões
  const [activeConnection, setActiveConnection] = useState(null); // Estado para conexão ativa

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
          setConnections(data.connections || []); // Atualiza o estado com as conexões recebidas
        } else {
          console.error('Erro ao buscar conexões:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error.message);
        setConnections([]); // Define como array vazio em caso de erro
      }
    };

    fetchConnections();
  }, []); 

  // Função para lidar com o clique em uma conexão
  const handleConnectionClick = (index) => {
    setActiveConnection(index);
  };

  return (
    <section className="mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Users size={20} /> Minhas Conexões Ativas
      </h3>
      <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
        {connections.length > 0 ? (
          connections.map((conn, index) => (
            <UserConnectionItem
              key={index}
              user={conn}
              isActive={activeConnection === index}
              onClick={() => handleConnectionClick(index)}
              className="bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/70"
            />
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