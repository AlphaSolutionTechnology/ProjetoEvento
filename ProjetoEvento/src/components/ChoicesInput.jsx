import React from "react";

function ChoicesInput({ choices, onChoicesChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Escolhas
      </label>
      {choices.map((choice, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Opção ${index + 1}`}
          value={choice}
          onChange={(e) => onChoicesChange(index, e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
      ))}
    </div>
  );
}
export default ChoicesInput;
