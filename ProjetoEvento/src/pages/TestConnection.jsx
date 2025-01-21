import React from "react";
import ProfileComponent from "../components/ProfileComponent";


function TestConnection() {
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-center mb-5 text-2xl font-bold">
        Testando Conexão
      </h1>
      <ProfileComponent />
    </div>
  );
};
export default TestConnection;
