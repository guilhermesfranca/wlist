import { carregarFilmesAPI, eliminarFilmesAPI } from "@/services/api";
import { useState, useEffect } from "react";

export default function AllMovies() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const data = await carregarFilmesAPI();
        setFilmes(data);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    }
    fetchFilmes();
  }, []);

  async function deleteFilmes(id) {
    try {
      const data = await eliminarFilmesAPI(id);
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  }

  return (
    <div>
      {filmes.length > 0 ? (
        filmes.map((filme) => (
          <div
            key={filme._id}
            className="w-full bg-red-400 border-2 border-blue-400"
          >
            <h2>{filme.title}</h2>
            <p>{filme.year}</p>
            <button onClick={() => deleteFilmes(filme._id)}>delete</button>
          </div>
        ))
      ) : (
        <p>Carregando filmes...</p>
      )}
    </div>
  );
}
