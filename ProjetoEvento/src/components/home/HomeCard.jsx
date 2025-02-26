import { motion } from "framer-motion";

const HomeCard = ({
  darkMode,
  icon,
  title,
  description,
  buttonText,
  onClick,
  buttonColor = "blue",
}) => {
  const buttonClass = `px-6 py-3 bg-${buttonColor}-500 text-white font-semibold rounded-xl shadow-md hover:bg-${buttonColor}-600 transition duration-300`;

  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-xl ${
        darkMode
          ? "bg-gray-800 bg-opacity-70 backdrop-blur-lg border-gray-700"
          : "bg-white bg-opacity-70 backdrop-blur-lg border-gray-200"
      } border flex flex-col items-center text-center`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
      <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
        {title}
      </h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <button onClick={onClick} className={buttonClass}>
        {buttonText}
      </button>
    </motion.div>
  );
};

export default HomeCard;