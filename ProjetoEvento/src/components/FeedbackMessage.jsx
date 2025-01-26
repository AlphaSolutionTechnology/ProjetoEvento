import React from "react";

function FeedbackMessage({ message }) {
  if (!message) return null;

  const isSuccess = message.toLowerCase().includes("sucesso");

  return (
    <div
      className={`mt-4 p-4 rounded w-full max-w-md text-center ${
        isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}

export default FeedbackMessage;
