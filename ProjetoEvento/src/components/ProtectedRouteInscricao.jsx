import useInscricao from "../hooks/useInscricao";
import Loading from "./loading/loading";
import { Navigate } from "react-router-dom";

const ProtectedRouteInscricao = ({ children, idPalestra }) => {
  const isInscrito = useInscricao(idPalestra);

  if (isInscrito === null) {
    return (
    <div className="min-h-screen flex items-center justify-center">
        <Loading/>
    </div>
    );
  }

  if (!isInscrito) {
    // Redireciona ou exibe uma mensagem caso não esteja inscrito
    return <Navigate to="/home" />;
  }

  return children;
};


export default ProtectedRouteInscricao;