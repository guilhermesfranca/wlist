import { useState } from "react";
import AddMovie from "@/components/AddMovie";
import AllMovies from "@/components/AllMovies";
import WatchedMovies from "@/components/WatchedMovies";
import NotWatchedMovies from "@/components/NotWatchedMovies";
import MoviesByRating from "@/components/MoviesByRating";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState("todos");
  const [atualizarLista, setAtualizarLista] = useState(0);

  const recarregarFilmes = () => {
    setAtualizarLista((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Botão Adicionar Filme */}
      <div className="bg-white border-b border-gray-200 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <AddMovie onFilmeAdicionado={recarregarFilmes} />
        </div>
      </div>

      {/* Tabs/Abas */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Mobile: Grid 2 colunas / Desktop: Flex row */}
          <div className="grid grid-cols-2 md:flex  md:flex-row gap-2 py-3 md:py-4">
            <button
              onClick={() => setAbaAtiva("todos")}
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition ${
                abaAtiva === "todos"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setAbaAtiva("assistidos")}
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition ${
                abaAtiva === "assistidos"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              Assistidos
            </button>

            <button
              onClick={() => setAbaAtiva("nao-assistidos")}
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition ${
                abaAtiva === "nao-assistidos"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              Não Assistidos
            </button>

            <button
              onClick={() => setAbaAtiva("mais-estrelas")}
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition ${
                abaAtiva === "mais-estrelas"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              Mais ⭐
            </button>

            <button
              onClick={() => setAbaAtiva("menos-estrelas")}
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition ${
                abaAtiva === "menos-estrelas"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              Menos ⭐
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div>
        {abaAtiva === "todos" && <AllMovies key={`todos-${atualizarLista}`} />}
        {abaAtiva === "assistidos" && (
          <WatchedMovies key={`assistidos-${atualizarLista}`} />
        )}
        {abaAtiva === "nao-assistidos" && (
          <NotWatchedMovies key={`nao-assistidos-${atualizarLista}`} />
        )}
        {abaAtiva === "mais-estrelas" && (
          <MoviesByRating order="desc" key={`mais-${atualizarLista}`} />
        )}
        {abaAtiva === "menos-estrelas" && (
          <MoviesByRating order="asc" key={`menos-${atualizarLista}`} />
        )}{" "}
        <Footer />
      </div>
    </div>
  );
}
