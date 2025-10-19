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
    const { title, year, genre, watched, rating } = req.body;

    // Validações
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

    if (typeof rating !== "number" || rating < 0 || rating > 10) {
      return res.status(400).json({ erro: "Rating deve ser entre 0 e 10" });
    }

    // Cria o novo filme (createdAt é gerado automaticamente)
    const novoFilme = new Movie({
      title: title.trim(),
      year,
      genre: genre.trim(),
      watched,
      rating,
    });

    const filmeSalvo = await novoFilme.save();
    res.status(201).json(filmeSalvo);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ erro: "Este filme já existe" });
    }
    console.error("Erro ao criar filme:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

app.delete("/api/movie/:id", async (req, res) => {
  const { id } = req.params;

  const filmeEliminado = await Movie.findByIdAndDelete(id);
  res.json({ mensagem: "filme eliminado com sucesso", filme: filmeEliminado });
});

app.put("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, year, genre, watched, rating } = req.body;

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

    if (typeof rating !== "number" || rating < 0 || rating > 10) {
      return res.status(400).json({ erro: "Rating deve ser entre 0 e 10" });
    }
    const filmeAtualizado = await Movie.findByIdAndDelete(
      id,
      {
        title: title.trim(),
        year,
        genre: genre.trim(),
        watched,
        rating,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!filmeAtualizado) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }
    res.json({
      mensagem: "Filme atualizado com sucesso",
      filme: filmeAtualizado,
    });
  } catch (error) {
    console.log("Erro ao atualizar filme:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});



app.patch("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { toggleWatched, watched } = req.body;

    const filme = await Movie.findById(id);
    
    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    // Se toggleWatched = true, alterna o valor
    if (toggleWatched) {
      filme.watched = !filme.watched;
    } 
    // Se watched foi enviado, define o valor específico
    else if (watched !== undefined) {
      filme.watched = watched;
    }

    await filme.save();
    res.json(filme);
  } catch (error) {
    console.error("Erro ao atualizar watched:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

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
