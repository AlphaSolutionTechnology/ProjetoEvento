import { motion } from "framer-motion";

const QuestionCard = ({ enunciado, choices, answerIdx, onAnswerClick }) => {
  return (
    <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          {enunciado}
        </h2>
      </header>

      <ul className="mt-6 space-y-4">
        {choices.map((choice, index) => (
          <motion.li
            key={index}
            onClick={() => onAnswerClick(choice, index)}
            className={`cursor-pointer flex items-center p-4 rounded-lg transition-all duration-300 ease-in-out 
              ${
                answerIdx === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              } 
              hover:bg-blue-200 dark:hover:bg-blue-700`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            aria-pressed={answerIdx === index ? "true" : "false"}
          >
            <span className="text-lg font-medium">{choice}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default QuestionCard;
