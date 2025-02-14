import { useParams } from "react-router-dom";
import ProtectedRouteInscricao from "./ProtectedRouteInscricao";

const RouteWrapper = ({ component: Component }) => {
  const { idPalestra } = useParams();
  
  return (
    <ProtectedRouteInscricao idPalestra={idPalestra}>
      <Component />
    </ProtectedRouteInscricao>
  );
};

export default RouteWrapper;
