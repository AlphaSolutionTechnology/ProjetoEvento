import React, { useState, useEffect } from "react";
import './Loading.css'; // Certifique-se de importar o arquivo de estilo

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
