const express = require("express");
const next = require("next");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./lib/mongodb");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());

// Esta constante é relativa às coleções da tua base de dados e deves acrescentar mais se for o caso
const Movie = require("./models/Movie");

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ title: 1 });
    res.json(movies);
  } catch (error) {
    console.error("Erro ao carregar nomes:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

app.post("/api/movie", async (req, res) => {
  try {
    // 1. Recebe os 6 atributos do filme
    const { title, year, genre, watched, rating } = req.body;

    // 2. Validações
    if (!title || !title.trim()) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    if (!year || year < 1800 || year > new Date().getFullYear() + 5) {
      return res.status(400).json({ erro: "Ano inválido" });
    }

    if (!genre || !genre.trim()) {
      return res.status(400).json({ erro: "Gênero é obrigatório" });
    }

    if (typeof watched !== "boolean") {
      return res.status(400).json({ erro: "Watched deve ser true ou false" });
    }

    if (!rating || !rating.trim()) {
      return res.status(400).json({ erro: "Rating é obrigatório" });
    }

    // 3. Cria o novo filme
    const novoFilme = new Nome({
      title: title.trim(),
      year,
      genre: genre.trim(),
      watched,
      rating: rating.trim(),
      createdAt: new Date().toISOString(), // Gera automaticamente
    });

    // 4. Salva no banco
    const filmeSalvo = await novoFilme.save();

    // 5. Responde com sucesso
    res.status(201).json(filmeSalvo);
  } catch (error) {
    // 6. Tratamento de erros
    if (error.code === 11000) {
      return res.status(400).json({ erro: "Este filme já existe" });
    }
    console.error("Erro ao criar filme:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});


app.delete('/api/movie/:id' , async (req, res) => {

  const {id} = req.params;

 const filmeEliminado = await Movie.findByIdAndDelete(id)   
 res.json({mensagem: 'filme eliminado com sucesso', filme: filmeEliminado})
})



app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(
        `Servidor Next.js + Express a correr em http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();
