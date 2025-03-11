import React, { useState } from 'react';

const Conversor = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleConvertClick = () => {
        if (file) {
            convertPPTXtoPDF(file);
        } else {
            alert('Por favor, selecione um arquivo primeiro!');
        }
    };

    const convertPPTXtoPDF = (file) => {
        //chamada da api + conversão de fato
        console.log('deu bom')
    };

    return (
        <div>
            <input 
                type="file" 
                accept=".pptx" 
                onChange={handleFileChange} 
            />
            <button type="button" className="conversor" onClick={handleConvertClick}>
                Converter para PDF
            </button>
        </div>
    );
};

export default Conversor;
