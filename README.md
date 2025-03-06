# ProjetoEvento

Bem-vindo à aplicação! Este README tem como objetivo orientá-lo sobre como configurar e executar o projeto localmente.

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (opcional, dependendo de sua preferência)

## Passo a Passo para Configuração

### 1. Clone o Repositório

Clone este repositório em sua máquina local:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

Entre no diretório do projeto:

```bash
cd nome-do-repositorio
```

### 2. Instale as Dependências

Instale todas as dependências necessárias para o projeto:

- Usando **npm**:

  ```bash
  npm install
  ```

- Ou usando **yarn**:

  ```bash
  yarn install
  ```

### 3. Configure Tailwind CSS

Se o Tailwind CSS já está configurado no projeto, não é necessário nenhum passo adicional. Caso contrário, siga as etapas a seguir para verificar a configuração:

1. Verifique o arquivo `tailwind.config.js` na raiz do projeto.
2. Certifique-se de que os caminhos corretos para os arquivos estão configurados na propriedade `content` do arquivo.

Exemplo de `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 4. Configuração de Rotas

Certifique-se de que o sistema de rotas está configurado corretamente no projeto. Verifique se o arquivo `routes` ou o `React Router` (caso esteja usando React) está devidamente implementado.

Exemplo básico com React Router:

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 5. Adicione e Utilize Icons
O projeto utiliza Heroicons para ícones SVG. Caso ainda não estejam instalados, adicione a biblioteca:

```bash
npm install @heroicons/react

```
Depois, use os ícones nos componentes React. Exemplo:
```bash
import { ArrowRightIcon } from '@heroicons/react/solid';

function ExampleButton() {
  return (
    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      Próximo
      <ArrowRightIcon className="w-5 h-5 ml-2" />
    </button>
  );
}

export default ExampleButton;
```
OBS: A biblioteca Heroicons oferece ícones nos estilos solid (cheio) e outline (contorno). Escolha o que se adapta melhor ao seu design.

### 6. Execute o Projeto

Após instalar as dependências e configurar o projeto, execute-o localmente:

- Usando **npm**:

  ```bash
  npm start
  ```

- Ou usando **yarn**:

  ```bash
  yarn start
  ```

O projeto será iniciado e estará disponível em `http://localhost:3000` por padrão.

### 7. Build para Produção (opcional)

Para gerar os arquivos otimizados para produção, execute o comando:

- Usando **npm**:

  ```bash
  npm run build
  ```

- Ou usando **yarn**:

  ```bash
  yarn build
  ```

Os arquivos otimizados estarão disponíveis na pasta `build/`.

### 8. O projeto tambem utiliza Framer Motion:
installe: 
```bash
npm install motion

```
usando:
```bash
import { motion } from "motion/react";
```
### 9. o projeto tambem utiliza Lucide React:
instalando: 
```bash
npm install lucide-react

```
usando:
```bash
import { camera } from 'lucide-react'
```



## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [HeroIcons](https://heroicons.com)
