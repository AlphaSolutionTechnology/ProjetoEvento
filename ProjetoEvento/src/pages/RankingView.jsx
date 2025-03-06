import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Ranking from "../components/ranking/Ranking";

function ShowRank() {
  const { idPalestra } = useParams();

  return (
    <>
      <Ranking />;
    </>
  );
}

export default ShowRank;
