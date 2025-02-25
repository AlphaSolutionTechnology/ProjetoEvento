import { motion } from "framer-motion";
import { Trophy, Users, Puzzle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login")
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-950 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Conteúdo Principal */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 items-center w-full max-w-7xl">
        {/* Texto Principal */}
        <div className="text-center sm:text-left space-y-6 sm:space-y-8 lg:space-y-10 px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cyan-500 tracking-tight leading-tight"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Explore, Jogue e Conecte-se!
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-lg sm:max-w-2xl mx-auto sm:mx-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Crie quizzes, ganhe badges, acumule pontos e conecte-se através de QR codes em um ambiente divertido e interativo.
          </motion.p>
          <motion.button
            onClick={handleLoginClick}
            className="mt-6 px-8 py-4 bg-cyan-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Login</span>
            <ChevronRight size={20} className="inline-block" />
          </motion.button>
        </div>
      </section>

      {/* Cards de Recursos */}
      <section className="mt-12 sm:mt-16 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 px-4">
        {[
          { icon: <Puzzle size={40} className="text-cyan-500" />, title: "Crie Quizzes", description: "Crie quizzes personalizados sobre qualquer tema." },
          { icon: <Trophy size={40} className="text-cyan-500" />, title: "Ganhe Badges", description: "Desafie-se, acumule pontos e conquiste badges." },
          { icon: <Users size={40} className="text-cyan-500" />, title: "Conecte-se com Pessoas", description: "Use QR codes para se conectar com amigos e colegas." }
        ].map((card, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg flex flex-col items-center space-y-4 hover:scale-105 transition-all duration-300"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ y: -10 }}
          >
            <motion.div
              animate={{ rotate: hoveredCard === index ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {card.icon}
            </motion.div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-gray-300 text-center">{card.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <motion.footer
        className="mt-12 sm:mt-16 w-full text-center py-4 bg-cyan-500 text-white text-sm font-semibold"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        © 2025 Eventfy. Todos os direitos reservados.
      </motion.footer>
    </main>
  );
}
