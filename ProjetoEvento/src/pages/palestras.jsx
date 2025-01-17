function Palestras(){


    return(
        <>
            <body className="bg-red-200 flex-col p-2">
            
                <h1 className="bg-blue-200 text-black text-center">Palestras</h1>
               
                <div className="w-full flex justify-between bg-green-100 mt-2 mb-2 p-2">
                    <button className="bg-transparent border-black text-black">Criar Palestra</button>
                    <button className="bg-transparent border-black text-black">Excluir</button>
               </div>
               
                <div className="bg-yellow-50 w-full h- border-t border-black flex-col overflow-y-scroll">
                    <div className="text-black h-scr bg-yellow-400 h-14 p-2 flex items-center justify-between ">
                        <p>Nome da palestra</p>
                        <p>Tema</p>
                        <button className="bg-transparent border-black text-black">Editar</button>
                    </div>
                </div>
           
            </body>
        </>
    )

}


export default Palestras;