// path: src/components/ranking/Ranking.jsx

import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  Loader,
  AlertCircle,
  Medal,
  Trophy,
  Users,
  HelpCircle,
} from "lucide-react";
import { WebSocketContext } from "../../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const Ranking = ({ idPalestra }) => {
  const navigate = useNavigate();

  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { messages } = useContext(WebSocketContext);

  useEffect(() => {
    if (!idPalestra) {
      setError("Código da palestra não informado.");
      setLoading(false);
      return;
    }
    fetchUpdatedRanking(idPalestra);
  }, [idPalestra]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      console.log("mensagem websocket recebida:", lastMessage);

      if (
        lastMessage?.type === "ranking_update" &&
        lastMessage.idPalestra === idPalestra
      ) {
        console.log(
          "Sinal de atualização do ranking recebido. Buscando novos dados..."
        );
        fetchUpdatedRanking(idPalestra);
      } else {
        console.log(
          "Mensagem WebSocket ignorada. Não é uma atualização do ranking."
        );
      }
    }
  }, [messages, idPalestra]);

  const fetchUpdatedRanking = async (uniqueCode) => {
    if (!uniqueCode) {
      setError("Código da palestra não informado.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Código da palestra recebido:", uniqueCode);
      const response = await fetch(
        `http://localhost:8080/api/ranking/getupdatedranking`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro na requisição: ${response.status} - ${response.statusText} `
        );
      }

      const data = await response.json();
      setRankingData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // para medalhas de ouro, prata e bronze
  const getMedal = (position) => {
    const medals = {
      1: { color: "text-yellow-500", label: "Ouro" },
      2: { color: "text-gray-400", label: "Prata" },
      3: { color: "text-orange-500", label: "Bronze" },
    };

    const medal = medals[position];

    if (medal) {
      return <Medal className={`${medal.color} w-6 h-6`} size={24} />;
    }

    return null;
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-6">
      {/* Círculos de fundo */}
      <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative max-w-4xl w-full p-6 bg-white/40 dark:bg-gray-800/40 shadow-2xl rounded-2xl backdrop-blur-md border border-white/30 dark:border-gray-700">
        <motion.h2
          className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Trophy size={28} className="text-yellow-500 animate-bounce" />{" "}
          Ranking dos Melhores
        </motion.h2>

        {loading && (
          <div className="flex justify-center items-center py-4">
            <Loader
              className="animate-spin text-gray-600 dark:text-gray-300"
              size={24}
            />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center text-red-600 dark:text-red-400 py-4">
            <AlertCircle className="mr-2" />
            <p>Erro: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {rankingData.map((user, index) => {
              const nameParts = user.nomeUsuario.split(" ");
              const displayName =
                nameParts.length > 1
                  ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
                  : user.nomeUsuario;

              return (
                <motion.div
                  key={user.id}
                  className={`flex flex-col sm:flex-row justify-between items-center border-b even:bg-gray-100 dark:even:bg-gray-700 p-4 rounded-lg transition-all ${
                    user.colocacao <= 3
                      ? "bg-opacity-50 border-yellow-500 dark:border-yellow-400"
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {getMedal(user.colocacao)}
                    {user.colocacao}º - {displayName}
                  </div>
                  <div className="flex gap-6 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Users size={18} /> {user.conexoes}
                    </div>
                    <div className="flex items-center gap-1">
                      <HelpCircle size={18} /> {user.acertos}
                    </div>
                    <div className="font-bold">{user.pontuacaoTotal}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      <button
        onClick={() => navigate(`/palestra/${idPalestra}`)}
        className="mt-8 bg-white rounded text-black p-2 hover:bg-gray-700 hover:text-white"
      >
        Voltar à Palestra
      </button>
    </div>
  );
};

export default Ranking;
