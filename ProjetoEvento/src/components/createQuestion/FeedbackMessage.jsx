// path: src/components/FeedbackMessage.jsx

import React from "react";

function FeedbackMessage({ message }) {
  if (!message) return null;

  const isSuccess = message.includes("sucesso");

  return (
    <p
      className={`mt-4 text-lg font-bold ${
        isSuccess ? "text-green-500" : "text-red-500"
      }`}
    >
      {message}
    </p>
  );
}

export default FeedbackMessage;
