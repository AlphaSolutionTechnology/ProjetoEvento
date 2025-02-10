import React, { useState, useEffect } from "react";
import "./Ranking_CSS.css";

const Ranking = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/ranking/getupdatedranking");

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        setRankingData(data); 
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Ranking</h2>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>Erro: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Conexões</th> {/* Nova coluna */}
              <th>Pontos do Quizz</th> {/* Nova coluna */}
              <th>Pontuação Total</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((user, index) => (
              <tr key={user.id}>
                <td>{user.colocacao}</td>
                <td>{user.nomeUsuario}</td> 
                <td>{user.conexoes}</td> 
                <td>{user.acertos}</td> 
                <td>{user.pontuacaoTotal}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Ranking;
