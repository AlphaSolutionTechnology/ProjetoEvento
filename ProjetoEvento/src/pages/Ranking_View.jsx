import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Ranking from "../components/Ranking_Component/Ranking";

function ShowRank() {
  
  const { idPalestra } = useParams();


  return(
  <>
  <Ranking idPalestra={idPalestra} />;
  </>
  )
}

export default ShowRank;
