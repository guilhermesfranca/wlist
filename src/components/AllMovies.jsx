import {
  carregarFilmesAPI,
  eliminarFilmesAPI,
  toggleWatchedAPI,
} from "@/services/api";
import { useState, useEffect } from "react";
import EditMovie from "./EditMovie";

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
      await eliminarFilmesAPI(id);
      setFilmes(filmes.filter((filme) => filme._id !== id));
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  }
  async function marcarFilme(id) {
    try {
      const filmeAtualizado = await toggleWatchedAPI(id);

      // Atualiza o estado local com o filme atualizado
      setFilmes(
        filmes.map((filme) => (filme._id === id ? filmeAtualizado : filme))
      );
    } catch (error) {
      console.error("Erro ao marcar filme:", error);
    }
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {filmes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filmes.map((filme) => (
            <div
              key={filme._id}
              className="bg-white border border-black rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                  {filme.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <span className="font-medium">{filme.year}</span>
                  <span>•</span>
                  <span>{filme.genre}</span>
                  <div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => marcarFilme(filme._id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                          filme.watched
                            ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                            : "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        <span>{filme.watched ? "✓" : "○"}</span>
                        {filme.watched ? "Assistido" : "Marcar como assistido"}
                      </button>
                    </div>
                  </div>
                </div>
                {filme.watched && (
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-black">Avaliação:</span>
                    <div className="flex gap-0.5">
                      {[...Array(10)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < filme.rating ? "text-black" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <EditMovie />
                <button
                  onClick={() => deleteFilmes(filme._id)}
                  className="flex-1 border border-black text-black hover:bg-black hover:text-white font-medium rounded-lg text-sm  transition"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Carregando filmes...</p>
        </div>
      )}
    </div>
  );
}
