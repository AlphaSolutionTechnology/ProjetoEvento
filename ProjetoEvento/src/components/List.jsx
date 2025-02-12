function List(){


 return(
    <>
    <div className="space-y-4">
      {/* Exibe mensagem caso não haja palestras */}
      {palestras.length === 0 ? (
        <p className="text-center text-gray-400">Nenhuma palestra encontrada.</p>
      ) : (
        // Mapeia todas as palestras e exibe cada uma
        palestras.map((palestra) => (
          <motion.div
            key={palestra.id}
            whileHover={{ scale: 1.02 }} // Animação de hover nos cards
            className="flex justify-between items-center al dark:bg-gray-900 dark:text-white p-6 rounded-xl shadow-md relative cursor-pointer text-sm sm:text-base md:text-lg lg:text-base xl:text-lg max-w-xl w-full mx-auto" 
            onClick={() => navigate("/admQuizz", { state: { idPalestra: palestra.id } })} // Ao clicar no card, redireciona para a edição
            initial={{ x: 0 }} 
            animate={{ x: 0 }} 
            exit={{ x: -100 }} 
            transition={{ duration: 0.5 }} 
          >
            <p className="text-black dark:text-white flex-1">{palestra.tema}</p> {/* Texto do card */}
            
            {/* Botão de excluir palestra */}
            <motion.button
              whileTap={{ scale: 0.95 }} 
              className="text-red-600 hover:text-red-800 transition absolute top-1/2 right-4 transform -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique no botão de lixo acione o redirecionamento
                openDeleteModal(palestra.id); // Abre o modal de confirmação
              }}
            >
              <Trash2 size={24} />
            </motion.button>
          </motion.div>
        ))
      )}
    </div>
    </>
 )

}


export default List;