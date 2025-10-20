# 🎬 Watchlist - Gestor de Filmes

Uma aplicação web moderna para gerir a tua lista de filmes para assistir, construída com Next.js, React e MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#️-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#️-configuração)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Licença](#-licença)

## ✨ Características

- ✅ **Adicionar filmes** com título, ano, género e avaliação
- 📊 **Organizar filmes** em diferentes categorias:
  - Todos os filmes
  - Filmes assistidos
  - Filmes não assistidos
  - Melhores avaliações (mais ⭐)
  - Piores avaliações (menos ⭐)
- ⭐ **Sistema de avaliação** de 0 a 10 estrelas
- ✏️ **Editar** informações dos filmes
- 🗑️ **Eliminar** filmes da lista
- ✓ **Marcar/desmarcar** filmes como assistidos
- 📱 **Design responsivo** - funciona perfeitamente em mobile e desktop
- 🎨 **Interface moderna** com Tailwind CSS

## 🛠️ Tecnologias

### Frontend
- **Next.js 15.5.6** - Framework React com SSR
- **React 19.1.0** - Biblioteca UI
- **Tailwind CSS 4** - Framework CSS utility-first

### Backend
- **Express 5.1.0** - Framework Node.js
- **MongoDB Atlas** - Base de dados NoSQL
- **Mongoose 8.19.1** - ODM para MongoDB

### Ferramentas de Desenvolvimento
- **Nodemon** - Hot reload durante desenvolvimento
- **ESLint** - Linter para qualidade de código
- **dotenv** - Gestão de variáveis de ambiente

## 📦 Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** ou **yarn**
- **MongoDB Atlas** (conta gratuita disponível)

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/teu-usuario/watchlist.git
cd watchlist
```

2. **Instale as dependências**
```bash
npm install
```

## ⚙️ Configuração

1. **Crie um ficheiro `.env` na raiz do projeto:**
```env
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/watchlist?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

2. **Configure o MongoDB Atlas:**
   - Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crie um novo cluster
   - Configure as credenciais de acesso
   - Copie a connection string para o `.env`

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse a aplicação:**
```
http://localhost:3000
```

## 💡 Como Usar

### Adicionar um Filme
1. Clique no botão **"Adicionar filme"**
2. Preencha os campos:
   - Título do filme
   - Ano de lançamento
   - Género (selecione da lista)
   - Marque "Já assisti" se aplicável
   - Dê uma avaliação de 0-10 estrelas
3. Clique em **"Salvar filme"**

### Filtrar Filmes
Use as abas no topo para filtrar:
- **Todos** - Exibe todos os filmes
- **Assistidos** - Apenas filmes marcados como assistidos
- **Não Assistidos** - Filmes ainda por ver
- **Mais ⭐** - Filmes ordenados por maior avaliação
- **Menos ⭐** - Filmes ordenados por menor avaliação

### Editar um Filme
1. Clique no botão **"Editar"** no card do filme
2. Modifique os campos desejados
3. Clique em **"Salvar alterações"**

### Marcar como Assistido
- Clique no botão **"Marcar como assistido"** ou **"Assistido"** para alternar o estado

### Eliminar um Filme
- Clique no botão **"Deletar"** no card do filme

## 📁 Estrutura do Projeto

```
watchlist/
├── lib/
│   └── mongodb.js          # Configuração da conexão MongoDB
├── models/
│   └── Movie.js            # Schema do modelo Movie
├── public/                 # Assets estáticos
├── src/
│   ├── components/
│   │   ├── AddMovie.jsx    # Modal para adicionar filmes
│   │   ├── AllMovies.jsx   # Lista todos os filmes
│   │   ├── EditMovie.jsx   # Modal para editar filmes
│   │   ├── Footer.jsx      # Rodapé da aplicação
│   │   ├── Header.jsx      # Cabeçalho da aplicação
│   │   ├── MoviesByRating.jsx       # Filmes ordenados por rating
│   │   ├── NotWatchedMovies.jsx     # Filmes não assistidos
│   │   └── WatchedMovies.jsx        # Filmes assistidos
│   ├── pages/
│   │   ├── _app.js         # Configuração global do Next.js
│   │   ├── _document.js    # Estrutura HTML do documento
│   │   └── index.js        # Página principal
│   ├── services/
│   │   └── api.js          # Funções para comunicação com API
│   └── styles/
│       └── globals.css     # Estilos globais (Tailwind)
├── server.js               # Servidor Express + Next.js
├── .env                    # Variáveis de ambiente (criar manualmente)
├── package.json
└── README.md
```

## 🔌 API Endpoints

### `GET /api/movies`
Retorna todos os filmes ordenados por título.

**Resposta:**
```json
[
  {
    "_id": "...",
    "title": "Inception",
    "year": 2010,
    "genre": "Ficção Científica",
    "watched": true,
    "rating": 9,
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
]
```

### `POST /api/movie`
Adiciona um novo filme.

**Body:**
```json
{
  "title": "Inception",
  "year": 2010,
  "genre": "Ficção Científica",
  "watched": false,
  "rating": 0
}
```

### `PUT /api/movie/:id`
Atualiza um filme existente.

**Body:**
```json
{
  "title": "Inception - Updated",
  "year": 2010,
  "genre": "Ficção Científica",
  "watched": true,
  "rating": 9
}
```

### `PATCH /api/movie/:id`
Alterna o estado "watched" de um filme.

**Body:**
```json
{
  "toggleWatched": true
}
```

### `DELETE /api/movie/:id`
Elimina um filme.

## 🎨 Schema do Modelo

```javascript
{
  title: String (obrigatório),
  year: Number (1800-2030),
  genre: String (obrigatório),
  watched: Boolean (default: false),
  rating: Number (0-10),
  createdAt: Date (automático)
}
```

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento com hot reload
npm run build    # Cria build de produção
npm start        # Inicia o servidor em modo produção
npm run lint     # Executa o linter
```

## 🤝 Contribuir

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Guilherme França**

- LinkedIn: [@guilhermesfranca](https://www.linkedin.com/in/guilhermesfranca/)
- GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

⭐ Se este projeto te ajudou, considera dar uma estrela no repositório!

**Desenvolvido com ❤️ usando Next.js e MongoDB**
