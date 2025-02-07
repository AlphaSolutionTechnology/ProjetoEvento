import React, { useState, useEffect } from "react";
import "./Ranking.css";

const initialRankingData = [
  { id: 1, name: "Tonho", points: 95 },
  { id: 2, name: "Carlao", points: 169 },
  { id: 3, name: "Andre", points: 120 },
  { id: 4, name: "Bombado do Primavera", points: 105 },
  {id: 5 , name: "Duardo", points: 104},
  {id: 6, name:"Zé do Picadinho", points:66},
];

const Ranking = () => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [...initialRankingData];
      const sortedData = data.sort((a, b) => b.points - a.points);
      setRankingData(sortedData);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Ranking</h2>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
