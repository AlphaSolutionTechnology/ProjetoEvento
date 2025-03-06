import { motion, useAnimation } from "framer-motion";
import { Trophy, Users, Puzzle, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleLoginClick = () => {
    navigate("/login");
  };

  // Verifica o tamanho da tela e desativa animações em telas pequenas
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Breakpoint 'sm' do Tailwind
    };

    checkScreenSize(); // Verifica ao carregar
    window.addEventListener("resize", checkScreenSize); // Verifica ao redimensionar

    return () => window.removeEventListener("resize", checkScreenSize); // Limpa o listener
  }, []);

  return (
    <main className="h-screen w-screen overflow-y-auto bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      {/* Conteúdo Principal */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-16">
        {/* Título Principal */}
        <motion.h1
          className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-8"
          initial={!isMobile && { y: -50, opacity: 0 }}
          animate={!isMobile && { y: 0, opacity: 1 }}
          transition={!isMobile && { duration: 0.8 }}
        >
          Explore, Jogue, Conquiste!
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-2xl mb-12"
          initial={!isMobile && { y: 50, opacity: 0 }}
          animate={!isMobile && { y: 0, opacity: 1 }}
          transition={!isMobile && { delay: 0.2, duration: 0.8 }}
        >
          Crie quizzes, ganhe badges, acumule pontos e conecte-se com amigos em um mundo de diversão e desafios!
        </motion.p>

        {/* Botão de Login */}
        <motion.button
          onClick={handleLoginClick}
          className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full text-2xl font-bold shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center space-x-3"
          whileHover={!isMobile && { scale: 1.1 }}
          whileTap={!isMobile && { scale: 0.95 }}
        >
          <span>Comece Agora</span>
          <Zap size={24} className="inline-block animate-pulse" />
        </motion.button>
      </section>

      {/* Cards de Recursos */}
      <section className="w-full bg-black/50 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {[
            { icon: <Puzzle size={48} className="text-cyan-400" />, title: "Crie Quizzes", description: "Crie quizzes personalizados e desafie seus amigos." },
            { icon: <Trophy size={48} className="text-purple-400" />, title: "Ganhe Badges", description: "Desbloqueie badges exclusivos e mostre suas conquistas." },
            { icon: <Users size={48} className="text-pink-400" />, title: "Conecte-se", description: "Use QR codes para se conectar e competir com outros jogadores." }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl flex flex-col items-center space-y-6 sm:hover:scale-105 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              whileHover={!isMobile && { y: -10 }}
            >
              <motion.div
                animate={!isMobile && { rotate: hoveredCard === index ? 360 : 0, scale: hoveredCard === index ? 1.2 : 1 }}
                transition={!isMobile && { duration: 0.5 }}
              >
                {card.icon}
              </motion.div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                {card.title}
              </h3>
              <p className="text-gray-300 text-center">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="w-full text-center py-8 bg-black/50 backdrop-blur-sm text-gray-300 text-sm font-semibold"
        initial={!isMobile && { y: 50, opacity: 0 }}
        animate={!isMobile && { y: 0, opacity: 1 }}
        transition={!isMobile && { delay: 0.5, duration: 0.8 }}
      >
        © 2025 Eventfy. Todos os direitos reservados.
      </motion.footer>
    </main>
  );
}